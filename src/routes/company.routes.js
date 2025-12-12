import { Router } from "express";
import { CompanyController } from "../controllers/company.controller.js";

import {
    companyValidatorCreate,
    companyValidatorUpdate,
    companyValidatorDelete
} from "../validations/company.validator.js";

import { validate } from "../middleware/validator.js";

const router = Router();

router.post("/", companyValidatorCreate, validate, CompanyController.create);
router.get("/", CompanyController.findAll);
router.get("/:id", CompanyController.findOne);
router.put("/:id", companyValidatorUpdate, validate, CompanyController.update);
router.delete("/:id", companyValidatorDelete, validate, CompanyController.delete);

export default router;
