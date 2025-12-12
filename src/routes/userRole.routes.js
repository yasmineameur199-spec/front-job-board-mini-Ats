import { Router } from "express";
import { UserRoleController } from "../controllers/userRole.controller.js";

import {
    userRoleValidatorCreate,
    userRoleValidatorDelete
} from "../validations/userRole.validator.js";

import { validate } from "../middleware/validator.js";

const router = Router();

router.post("/", userRoleValidatorCreate, validate, UserRoleController.create);
router.get("/", UserRoleController.findAll);
router.get("/:id", UserRoleController.findOne);
router.put("/:id", userRoleValidatorCreate, validate, UserRoleController.update);
router.delete("/", userRoleValidatorDelete, validate, UserRoleController.delete);

export default router;
