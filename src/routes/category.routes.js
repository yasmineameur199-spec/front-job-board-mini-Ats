import { Router } from "express";
import { CategoryController } from "../controllers/category.controller.js";

const router = Router();

// VUES
router.get("/list", CategoryController.renderCategoryList);
router.get("/add", CategoryController.renderAddForm);
router.get("/edit/:category_id", CategoryController.renderEditForm);

// ACTIONS
router.post("/", CategoryController.create);
router.post("/update/:category_id", CategoryController.update);
router.post("/delete/:category_id", CategoryController.delete);

// API
router.get("/", CategoryController.findAll);
router.get("/:category_id", CategoryController.findOne);

export default router;
