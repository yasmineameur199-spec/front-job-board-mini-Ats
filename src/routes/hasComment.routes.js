import { Router } from "express";
import { HasCommentController } from "../controllers/hasComment.controller.js";

const router = Router();

// POST /api/has-comments
router.post("/", HasCommentController.create);

// GET /api/has-comments
router.get("/", HasCommentController.getAll);

// DELETE /api/has-comments
router.delete("/", HasCommentController.delete);

export default router;
