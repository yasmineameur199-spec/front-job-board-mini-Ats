import { Router } from "express";
import { StageController } from "../controllers/stage.controller.js";

import {
    stageValidatorCreate,
    stageValidatorUpdate,
    stageValidatorDelete
} from "../validations/stage.validator.js";

import { validate } from "../middleware/validator.js";

const router = Router();

router.post("/", stageValidatorCreate, validate, StageController.create);
router.get("/", StageController.findAll);
router.get("/:id", StageController.findOne);
router.put("/:id", stageValidatorUpdate, validate, StageController.update);
router.delete("/:id", stageValidatorDelete, validate, StageController.delete);

export default router;
