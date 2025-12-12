import { Router } from "express";
import { UserController } from "../controllers/user.controller.js";

const router = Router();

// =======================
// VUES
// =======================
router.get("/list", UserController.renderUserList);
router.get("/add", UserController.renderAddForm);
router.get("/edit/:user_id", UserController.renderEditForm);

// =======================
// ACTIONS (formulaires HTML)
// =======================
router.post("/", UserController.create);
router.post("/update/:user_id", UserController.update);
router.post("/delete/:user_id", UserController.delete);

// =======================
// API (JSON)
// =======================
router.get("/", UserController.findAll);
router.get("/:user_id", UserController.findOne);

export default router;
