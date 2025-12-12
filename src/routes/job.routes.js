import { Router } from "express";
import { JobController } from "../controllers/job.controller.js";

import {
  jobValidatorCreate,
  jobValidatorUpdate,
  jobValidatorDelete
} from "../validations/job.validator.js";

import { validate } from "../middleware/validator.js";

const jobRoute = Router();

// Toutes les routes pour les jobs
jobRoute

  // FORMULAIRE D’AJOUT
  .get("/add-job-form", (req, res) => {
    res.render("jobs/add-job-form", { title: "Ajouter un job" });
  })

  // FORMULAIRE D’ÉDITION
  .get("/edit-job-form/:job_id", JobController.renderEditForm)

  // CREATE JOB
  .post("/", jobValidatorCreate, validate, JobController.create)

  // LISTE (avec rendu HTML)
  .get("/job-list", JobController.renderJobList)

  // GET ONE (API)
  .get("/:job_id", JobController.findOne)

  // UPDATE
  .put("/:job_id", jobValidatorUpdate, validate, JobController.update)

  // DELETE
  .delete("/:job_id", jobValidatorDelete, validate, JobController.delete);

export default jobRoute;
