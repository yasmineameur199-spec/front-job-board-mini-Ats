import Job from "../models/job.model.js";

export const JobController = {

  // RENDER : liste des jobs
  async renderJobList(req, res) {
    try {
      const jobs = await Job.findAll({
        order: [["job_id", "DESC"]],
      });

      res.render("jobs/list-job", {
        title: "Liste des jobs",
        jobs
      });

    } catch (err) {
      res.status(500).send(err.message);
    }
  },

  // RENDER : formulaire d’ajout
  renderAddForm(req, res) {
    try {
      res.render("jobs/add-job", {
        title: "Ajouter un job"
      });
    } catch (err) {
      res.status(500).send(err.message);
    }
  },

  // RENDER : formulaire d’édition
  async renderEditForm(req, res) {
    try {
      const job = await Job.findByPk(req.params.job_id);

      if (!job) {
        return res.status(404).send("Job introuvable");
      }

      res.render("jobs/edit-job", {
        title: "Modifier un job",
        job
      });

    } catch (err) {
      res.status(500).send(err.message);
    }
  },

  // CREATE (POST)
  async create(req, res) {
    try {
      await Job.create(req.body);
      return res.redirect("/jobs/job-list"); // après création → retour liste
    } catch (err) {
      return res.status(400).send(err.message);
    }
  },

  // API JSON — trouver tous les jobs
  async findAll(req, res) {
    try {
      const jobs = await Job.findAll({
        order: [["job_id", "DESC"]],
      });

      return res.json(jobs);

    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  },

  // API JSON — trouver un job
  async findOne(req, res) {
    try {
      const job = await Job.findByPk(req.params.job_id);

      if (!job) {
        return res.status(404).json({ error: "Job not found" });
      }

      return res.json(job);

    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  },

  // UPDATE
  async update(req, res) {
    try {
      const [updated] = await Job.update(req.body, {
        where: { job_id: req.params.job_id }
      });

      if (updated === 0) {
        return res.status(404).send("Job introuvable");
      }

      return res.redirect("/jobs/job-list");

    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  },

  // DELETE
  async delete(req, res) {
    try {
      const deleted = await Job.destroy({
        where: { job_id: req.params.job_id }
      });

      if (deleted === 0) {
        return res.status(404).json({ error: "Job not found" });
      }

      return res.json({ message: "Job deleted" });

    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
};
