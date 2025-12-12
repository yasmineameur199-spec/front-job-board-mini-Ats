import { Router } from "express";
import { JobCategoryController } from "../controllers/jobCategory.controller.js";

const router = Router();

// LISTE HTML
router.get("/list", JobCategoryController.renderList);

// FORM AJOUT
router.get("/add/:job_id", JobCategoryController.renderAddForm);

// FORM EDIT
router.get("/edit/:job_id/:id_category", JobCategoryController.renderEditForm);

// CREATE
router.post("/", JobCategoryController.create);

// UPDATE (PUT via methodOverride)
router.post("/:job_id/:id_category", JobCategoryController.update);

// DELETE (DELETE via methodOverride)
router.post("/:job_id/:id_category/delete", JobCategoryController.delete);

export default router;
