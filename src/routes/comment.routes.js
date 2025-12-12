import { Router } from "express";
import { CommentController } from "../controllers/comment.controller.js";

import {
    commentValidatorCreate,
    commentValidatorUpdate,
    commentValidatorDelete
} from "../validations/comment.validator.js";

import { validate } from "../middleware/validator.js";

const router = Router();

router.post("/", commentValidatorCreate, validate, CommentController.create);
router.get("/", CommentController.findAll);
router.get("/:id", CommentController.findOne);
router.put("/:id", commentValidatorUpdate, validate, CommentController.update);
router.delete("/:id", commentValidatorDelete, validate, CommentController.delete);

export default router;
