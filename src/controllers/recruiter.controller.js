import {
  Job, Company, Application, User,
  Stage, ApplicationStage, Comment
} from "../models/index.model.js";

function requireRecruiter(req, res) {
  const roles = req.session?.user?.roles || [];
  if (!roles.includes("Recruiter")) {
    req.flash("error", "Accès refusé.");
    res.redirect("/");
    return false;
  }
  return true;
}

export const RecruiterController = {
  async dashboard(req, res) {
    if (!requireRecruiter(req, res)) return;

    const companyId = req.session.user.id_company;
    const jobs = await Job.findAll({
      where: { id_company: companyId },
      include: [{ model: Company }, { model: Application }],
      order: [["posted_at", "DESC"]],
    });

    const view = jobs.map(j => {
      const p = j.get({ plain: true });
      return { ...p, company: p.Company || p.company };
    });

    res.render("recruiter/jobs", { title: "Dashboard recruteur", jobs: view });
  },

  async jobApplications(req, res) {
    if (!requireRecruiter(req, res)) return;

    const job_id = req.params.job_id;

    const job = await Job.findByPk(job_id, { include: [Company] });
    if (!job) return res.status(404).send("Offre introuvable.");

    const applications = await Application.findAll({
      where: { id_job: job_id },
      include: [{ model: User }],
      order: [["applied_at", "DESC"]],
    });

    const jobView = job.get({ plain: true });
    jobView.company = jobView.Company || jobView.company;

    res.render("recruiter/applications", {
      title: `Candidatures - ${jobView.titre}`,
      job: jobView,
      applications: applications.map(a => a.get({ plain: true })),
    });
  },

  async applicationShow(req, res) {
    if (!requireRecruiter(req, res)) return;

    const application_id = req.params.application_id;

    const application = await Application.findByPk(application_id, {
      include: [{ model: User }, { model: Job, include: [Company] }],
    });
    if (!application) return res.status(404).send("Candidature introuvable.");

    const stages = await Stage.findAll({ order: [["order_index", "ASC"]] });

    // current stage (simple approach): take latest ApplicationStage row if you have timestamps;
    // if not, just pick max id. Minimal: pick first relation if exists.
    const rel = await ApplicationStage.findOne({
      where: { application_id },
      order: [["id", "DESC"]],
    });

    const currentStageId = rel ? rel.stage_id : stages[0]?.stage_id ?? null;

    // comments (minimal): if your Comment model has content + id_user
    const comments = await Comment.findAll({
      include: [{ model: User }],
      order: [["comment_id", "DESC"]],
    });

    res.render("recruiter/application_show", {
      title: "Candidature",
      application: application.get({ plain: true }),
      stages: stages.map(s => s.get({ plain: true })),
      currentStageId,
      comments: comments.map(c => c.get({ plain: true })),
    });
  },

  async updateStage(req, res) {
    if (!requireRecruiter(req, res)) return;

    const application_id = req.params.application_id;
    const { stage_id } = req.body;

    await ApplicationStage.create({ application_id, stage_id });

    req.flash("success", "Étape mise à jour.");
    res.redirect(`/recruiter/applications/${application_id}`);
  },

  async addComment(req, res) {
    if (!requireRecruiter(req, res)) return;

    const application_id = req.params.application_id;
    const user_id = req.session.user.user_id;

    const { content } = req.body;
    if (!content || !content.trim()) {
      req.flash("error", "Commentaire vide.");
      return res.redirect(`/recruiter/applications/${application_id}`);
    }

    const comment = await Comment.create({ content, id_user: user_id });

    // If you use HasComment join table, link it here.
    // Example:
    // await HasComment.create({ application_id, id_comment: comment.comment_id });

    req.flash("success", "Commentaire ajouté.");
    res.redirect(`/recruiter/applications/${application_id}`);
  },
};
