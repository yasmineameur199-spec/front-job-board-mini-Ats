import { Router } from "express";
import { UserController } from "../controllers/user.controller.js";

import {
    userValidatorCreate,
    userValidatorUpdate,
    userValidatorDelete
} from "../validations/user.validator.js";

import { validate } from "../middleware/validator.js";

const router = Router();

router.post("/", userValidatorCreate, validate, UserController.create);
router.get("/", UserController.findAll);
router.get("/:id", UserController.findOne);
router.put("/:id", userValidatorUpdate, validate, UserController.update);
router.delete("/:id", userValidatorDelete, validate, UserController.delete);

export default router;
