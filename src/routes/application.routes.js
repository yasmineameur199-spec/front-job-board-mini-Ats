import { Router } from "express";
import { ApplicationController } from "../controllers/application.controller.js";

import {
    applicationValidatorCreate,
    applicationValidatorUpdate,
    applicationValidatorDelete
} from "../validations/application.validator.js";

import { validate } from "../middleware/validator.js";

const router = Router();

router.post("/", applicationValidatorCreate, validate, ApplicationController.create);
router.get("/", ApplicationController.findAll);
router.get("/:id", ApplicationController.findOne);
router.put("/:id", applicationValidatorUpdate, validate, ApplicationController.update);
router.delete("/:id", applicationValidatorDelete, validate, ApplicationController.delete);

export default router;
