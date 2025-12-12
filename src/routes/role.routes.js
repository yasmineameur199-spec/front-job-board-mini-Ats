import { Router } from "express";
import { RoleController } from "../controllers/role.controller.js";

import {
    roleValidatorCreate,
    roleValidatorUpdate,
    roleValidatorDelete
} from "../validations/role.validator.js";

import { validate } from "../middleware/validator.js";

const router = Router();

router.post("/", roleValidatorCreate, validate, RoleController.create);
router.get("/", RoleController.findAll);
router.get("/:role_id", RoleController.findOne);
router.put("/:role_id", roleValidatorUpdate, validate, RoleController.update);
router.delete("/:role_id", roleValidatorDelete, validate, RoleController.delete);

export default router;
