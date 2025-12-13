// src/routes/recruiter.routes.js
import { Router } from "express";
import {
  Job,
  Company,
  Application,
  User,
  Stage,
  Comment,
  ApplicationStage,
  HasComment,
} from "../models/index.model.js";
import { isAuthenticated, hasRole } from "../middleware/auth.js";

const router = Router();

// All routes here require recruiter
router.use(isAuthenticated, hasRole("Recruiter"));

/**
 * GET /recruiter/jobs
 * Recruiter dashboard: list jobs + (optional) applications count
 */
router.get("/jobs", async (req, res) => {
  try {
    const jobs = await Job.findAll({
      include: [
        { model: Company },
        { model: Application, required: false },
      ],
      order: [["posted_at", "DESC"]],
    });

    // Normalize Company -> company for EJS: job.company?.name
    const jobsView = jobs.map((j) => {
      const p = j.get({ plain: true });
      return { ...p, company: p.Company || p.company };
    });

    res.render("recruiter/jobs", {
      title: "Tableau de bord recruteur",
      jobs: jobsView,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message);
  }
});

/**
 * GET /recruiter/jobs/:job_id/applications
 * "Voir candidatures"
 */
router.get("/jobs/:job_id/applications", async (req, res) => {
  try {
    const job = await Job.findByPk(req.params.job_id, {
      include: [
        { model: Company },
        {
          model: Application,
          required: false,
          include: [{ model: User }], // ✅ safe include (no alias strings)
        },
      ],
    });

    if (!job) return res.status(404).send("Offre introuvable");

    const jobView = job.get({ plain: true });
    jobView.company = jobView.Company || jobView.company;

    const applications = jobView.applications || jobView.Applications || [];

    res.render("recruiter/applications", {
      title: `Candidatures pour ${jobView.titre}`,
      job: jobView,
      applications,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message);
  }
});

/**
 * GET /recruiter/applications/:application_id
 * Application detail page (includes currentStageId)
 */
router.get("/applications/:application_id", async (req, res) => {
  try {
    const application_id = req.params.application_id;

    const application = await Application.findByPk(application_id, {
      include: [
        { model: Job, include: [{ model: Company }] },
        { model: User },
      ],
    });

    if (!application) return res.status(404).send("Candidature introuvable");

    const stages = await Stage.findAll({ order: [["order_index", "ASC"]] });

    // ✅ CURRENT STAGE: since we enforce ONE row per application_id, just fetch it
    const current = await ApplicationStage.findOne({ where: { application_id } });
    const currentStageId = current?.stage_id ?? null;

    // (Optional) load comments linked to application (safe)
    let comments = [];
    try {
      const links = await HasComment.findAll({ where: { application_id } });
      const ids = links.map((l) => l.id_comment).filter(Boolean);

      if (ids.length) {
        const rows = await Comment.findAll({
          where: { id_comment: ids },
          include: [{ model: User }],
          order: [["id_comment", "DESC"]],
        });
        comments = rows.map((c) => c.get({ plain: true }));
      }
    } catch {
      comments = [];
    }

    res.render("recruiter/application_show", {
      title: "Détail candidature",
      application: application.get({ plain: true }),
      stages: stages.map((s) => s.get({ plain: true })),
      currentStageId,
      comments,
      errors: null,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message);
  }
});

/**
 * POST /recruiter/applications/:application_id/stage
 * ✅ FIXED: make stage actually update by enforcing ONE current stage
 */
router.post("/applications/:application_id/stage", async (req, res) => {
  try {
    const application_id = req.params.application_id;
    const stage_id = Number(req.body.stage_id);

    if (!stage_id) {
      req.flash("error", "Stage invalide.");
      return res.redirect(`/recruiter/applications/${application_id}`);
    }

    // ✅ Ensure only one current stage
    await ApplicationStage.destroy({ where: { application_id } });
    await ApplicationStage.create({ application_id, stage_id });

    req.flash("success", "Étape mise à jour.");
    return res.redirect(`/recruiter/applications/${application_id}`);
  } catch (err) {
    console.error(err);
    req.flash("error", err.message);
    return res.redirect(`/recruiter/applications/${req.params.application_id}`);
  }
});

/**
 * POST /recruiter/applications/:application_id/comments
 * (Left here so the file stays consistent; uses Comment.body)
 */
router.post("/applications/:application_id/comments", async (req, res) => {
  try {
    const application_id = req.params.application_id;
    const { body } = req.body;

    if (!body || !body.trim()) {
      req.flash("error", "Commentaire vide.");
      return res.redirect(`/recruiter/applications/${application_id}`);
    }

    const user_id = req.session.user.user_id ?? req.session.user.id;

    const comment = await Comment.create({
      body,
      id_user: user_id,
    });

    await HasComment.create({
      application_id,
      id_comment: comment.comment_id ?? comment.id_comment,
    });

    req.flash("success", "Commentaire ajouté.");
    return res.redirect(`/recruiter/applications/${application_id}`);
  } catch (err) {
    console.error(err);
    req.flash("error", err.message);
    return res.redirect(`/recruiter/applications/${req.params.application_id}`);
  }
});

export default router;
