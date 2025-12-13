import { Application, Job, Company, Stage } from "../models/index.model.js";

function getSessionUserId(req) {
  const u = req.session?.user;
  return u?.user_id ?? u?.id ?? null;
}

export const ApplicationsController = {
  async myApplications(req, res) {
    const user_id = getSessionUserId(req);
    if (!user_id) {
      req.flash("error", "Veuillez vous reconnecter.");
      return res.redirect("/login");
    }

    // Minimal version: list applications + job + company
    const applications = await Application.findAll({
      where: { user_id },
      include: [
        { model: Job, include: [Company] },
        // currentStage is optional; you can compute later from ApplicationStage
      ],
      order: [["applied_at", "DESC"]],
    });

    const view = applications.map(a => {
      const p = a.get({ plain: true });
      // normalize nested company access
      if (p.job?.Company && !p.job.company) p.job.company = p.job.Company;
      return p;
    });

    res.render("applications/index", { title: "Mes candidatures", applications: view });
  },
};
