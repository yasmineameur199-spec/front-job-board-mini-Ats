import { Router } from "express";
import { JobsController } from "../controllers/jobs.controller.js";
import { uploadPdf } from "../middleware/uploadPdf.js";
import { Job, Company, Application } from "../models/index.model.js";

const router = Router();

/* -------------------- Helpers -------------------- */
function isAuthenticated(req, res, next) {
  if (req.session && req.session.user) return next();
  req.flash("error", "Vous devez être connecté pour postuler.");
  return res.redirect("/login");
}

// Safely get user_id from session (handles different shapes)
function getSessionUserId(req) {
  const u = req.session?.user;
  return u?.user_id ?? u?.id ?? null;
}

/* -------------------- Routes -------------------- */

// GET /jobs -> list jobs
router.get("/", async (req, res) => {
  try {
    const jobs = await Job.findAll({
      where: { is_active: true },
      include: [{ model: Company }],
      order: [["posted_at", "DESC"]],
    });

    //  EJS uses job.company?.name, so we map Company -> company
    const jobsView = jobs.map((j) => {
      const plain = j.get({ plain: true });
      return { ...plain, company: plain.company || plain.Company || plain.company };
    });

    res.render("jobs/index", { title: "Offres d’emploi", jobs: jobsView });
  } catch (err) {
    console.error(err);
    res.status(500).send("Erreur serveur (jobs list).");
  }
});

// GET /jobs/:job_id -> job detail
router.get("/:job_id", async (req, res) => {
  try {
    const job = await Job.findByPk(req.params.job_id, {
      include: [{ model: Company }],
    });

    if (!job) return res.status(404).send("Offre introuvable.");

    const jobView = job.get({ plain: true });
    jobView.company = jobView.company || jobView.Company || jobView.company;

    res.render("jobs/show", { title: jobView.titre, job: jobView });
  } catch (err) {
    console.error(err);
    res.status(500).send("Erreur serveur (job detail).");
  }
});

// GET /jobs/:job_id/apply -> apply form
router.get("/:job_id/apply", isAuthenticated, async (req, res) => {
  try {
    const job = await Job.findByPk(req.params.job_id, {
      include: [{ model: Company }],
    });

    if (!job) return res.status(404).send("Offre introuvable.");

    const jobView = job.get({ plain: true });
    jobView.company = jobView.company || jobView.Company || jobView.company;

    res.render("jobs/apply", {
      title: `Postuler - ${jobView.titre}`,
      job: jobView,
      errors: [],
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Erreur serveur (apply form).");
  }
});

// POST /jobs/:job_id/apply -> create application + upload PDFs
router.post(
  "/:job_id/apply",
  isAuthenticated,
  uploadPdf.fields([
    { name: "resume_pdf", maxCount: 1 },
    { name: "cover_pdf", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const job_id = req.params.job_id;
      const user_id = getSessionUserId(req);

      if (!user_id) {
        req.flash("error", "Session invalide. Reconnectez-vous.");
        return res.redirect("/login");
      }

      // optional: verify job exists
      const job = await Job.findByPk(job_id);
      if (!job) return res.status(404).send("Offre introuvable.");

      const resumePath = req.files?.resume_pdf?.[0]
        ? `/uploads/${req.files.resume_pdf[0].filename}`
        : null;

      const coverPath = req.files?.cover_pdf?.[0]
        ? `/uploads/${req.files.cover_pdf[0].filename}`
        : null;

      if (!resumePath) {
        const job2 = await Job.findByPk(job_id, { include: [{ model: Company }] });
        const jobView = job2.get({ plain: true });
        jobView.company = jobView.company || jobView.Company || jobView.company;

        return res.status(400).render("jobs/apply", {
          title: `Postuler - ${jobView.titre}`,
          job: jobView,
          errors: ["Le CV (PDF) est obligatoire."],
        });
      }

      await Application.create({
        id_job: job_id,
        user_id,
        applied_at: new Date(),
        resume: resumePath,          //  store file path in existing TEXT column
        cover_letter: coverPath,     // store file path in existing TEXT column
      });

      req.flash("success", "Candidature envoyée !");
      return res.redirect("/jobs");
    } catch (err) {
      console.error(err);

      // Multer PDF-only error or other errors
      const msg = err?.message || "Erreur lors de l’envoi.";

      try {
        const job = await Job.findByPk(req.params.job_id, { include: [{ model: Company }] });
        if (!job) return res.status(500).send(msg);

        const jobView = job.get({ plain: true });
        jobView.company = jobView.company || jobView.Company || jobView.company;

        return res.status(400).render("jobs/apply", {
          title: `Postuler - ${jobView.titre}`,
          job: jobView,
          errors: [msg],
        });
      } catch (e2) {
        return res.status(500).send(msg);
      }
    }
  }
);

export default router;
