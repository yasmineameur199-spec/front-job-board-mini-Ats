import { Job, Company, Application } from "../models/index.model.js";

function getSessionUserId(req) {
  const u = req.session?.user;
  return u?.user_id ?? u?.id ?? null;
}

export const JobsController = {
  async list(req, res) {
    const jobs = await Job.findAll({
      where: { is_active: true },
      include: [{ model: Company }],
      order: [["posted_at", "DESC"]],
    });

    const jobsView = jobs.map(j => {
      const p = j.get({ plain: true });
      return { ...p, company: p.Company || p.company };
    });

    res.render("jobs/index", { title: "Offres d’emploi", jobs: jobsView });
  },

  async show(req, res) {
    const job = await Job.findByPk(req.params.job_id, { include: [{ model: Company }] });
    if (!job) return res.status(404).send("Offre introuvable.");

    const p = job.get({ plain: true });
    p.company = p.Company || p.company;

    res.render("jobs/show", { title: p.titre, job: p });
  },

  async applyForm(req, res) {
    const job = await Job.findByPk(req.params.job_id, { include: [{ model: Company }] });
    if (!job) return res.status(404).send("Offre introuvable.");

    const p = job.get({ plain: true });
    p.company = p.Company || p.company;

    res.render("jobs/apply", { title: `Postuler - ${p.titre}`, job: p, errors: [] });
  },

  // expects multer fields: resume, cover_letter (PDFs)
  async applySubmit(req, res) {
    try {
      const user_id = getSessionUserId(req);
      if (!user_id) {
        req.flash("error", "Veuillez vous reconnecter.");
        return res.redirect("/login");
      }

      const job_id = req.params.job_id;

      const resumePath = req.files?.resume?.[0]
        ? `/uploads/${req.files.resume[0].filename}`
        : null;

      const coverPath = req.files?.cover_letter?.[0]
        ? `/uploads/${req.files.cover_letter[0].filename}`
        : null;

      if (!resumePath) {
        const job = await Job.findByPk(job_id, { include: [{ model: Company }] });
        const p = job.get({ plain: true });
        p.company = p.Company || p.company;

        return res.status(400).render("jobs/apply", {
          title: `Postuler - ${p.titre}`,
          job: p,
          errors: ["Le CV (PDF) est obligatoire."],
        });
      }

      await Application.create({
        id_job: job_id,
        user_id,
        applied_at: new Date(),
        resume: resumePath,        // store path in existing TEXT column
        cover_letter: coverPath,   // store path in existing TEXT column
      });

      req.flash("success", "Candidature envoyée !");
      return res.redirect("/jobs");
    } catch (err) {
      console.error(err);
      req.flash("error", err.message || "Erreur lors de l’envoi.");
      return res.redirect(`/jobs/${req.params.job_id}/apply`);
    }
  },
};
