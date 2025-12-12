import { Router } from "express";
import { ApplicationStageController } from "../controllers/applicationStage.controller.js";

import {
    applicationStageValidatorCreate,
    applicationStageValidatorDelete
} from "../validations/applicationStage.validator.js";

import { validate } from "../middleware/validator.js";

const router = Router();

router.post("/", applicationStageValidatorCreate, validate, ApplicationStageController.create);
router.get("/", ApplicationStageController.findAll);
router.delete("/", applicationStageValidatorDelete, validate, ApplicationStageController.delete);

export default router;
