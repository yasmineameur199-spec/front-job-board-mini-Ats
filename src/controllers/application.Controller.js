import Application from "../models/application.model.js";
import User from "../models/user.model.js";
import Job from "../models/job.model.js";

export const ApplicationController = {

  // =======================
  // LISTE
  // =======================
  async renderApplicationList(req, res) {
    try {
      const applications = await Application.findAll({
        include: [User, Job],
        order: [["application_id", "DESC"]],
      });

      res.render("applications/list-application", {
        title: "Liste des candidatures",
        applications,
        query: req.query
      });
    } catch (err) {
      res.status(500).send(err.message);
    }
  },

  // =======================
  // FORM AJOUT
  // =======================
  async renderAddForm(req, res) {
  try {
    const users = await User.findAll({
      order: [["user_id", "ASC"]],
    });

    const jobs = await Job.findAll({
      order: [["job_id", "ASC"]],
    });

    res.render("applications/add-application", {
      title: "Nouvelle candidature",
      users,
      jobs,
      query: req.query
    });

  } catch (err) {
    res.status(500).send(err.message);
  }
},

  // =======================
  // FORM EDIT
  // =======================
  async renderEditForm(req, res) {
    try {
      const application = await Application.findByPk(
        req.params.application_id,
        { include: [User, Job] }
      );

      if (!application) {
        return res.status(404).send("Candidature introuvable");
      }

      res.render("applications/edit-application", {
        title: "Modifier la candidature",
        application
      });
    } catch (err) {
      res.status(500).send(err.message);
    }
  },

  // =======================
  // CREATE (UPLOAD)
  // =======================
  async create(req, res) {
  try {
    console.log("BODY:", req.body);
    console.log("FILES:", req.files);

    const data = req.body;

    if (req.files?.resume) {
      data.resume = req.files.resume[0].filename;
    }

    if (req.files?.cover_letter) {
      data.cover_letter = req.files.cover_letter[0].filename;
    }

    const app = await Application.create(data);

    console.log("APPLICATION CREATED:", app.toJSON());

    return res.redirect("/applications/list?success=Candidature envoyée");

  } catch (err) {
    console.error("CREATE APPLICATION ERROR:", err);
    return res.status(500).send(err.message);
  }
},

  // =======================
  // UPDATE
  // =======================
  async update(req, res) {
    try {
      const data = req.body;

      if (req.files?.resume) {
        data.resume = req.files.resume[0].filename;
      } else {
        delete data.resume;
      }

      if (req.files?.cover_letter) {
        data.cover_letter = req.files.cover_letter[0].filename;
      } else {
        delete data.cover_letter;
      }

      await Application.update(data, {
        where: { application_id: req.params.application_id }
      });

      return res.redirect("/applications/list?success=Candidature modifiée");
    } catch (err) {
      return res.redirect(
        "/applications/list?error=" + encodeURIComponent(err.message)
      );
    }
  },

  // =======================
  // DELETE
  // =======================
  async delete(req, res) {
    try {
      await Application.destroy({
        where: { application_id: req.params.application_id }
      });

      return res.redirect("/applications/list?success=Candidature supprimée");
    } catch (err) {
      return res.redirect(
        "/applications/list?error=" + encodeURIComponent(err.message)
      );
    }
  }

};
