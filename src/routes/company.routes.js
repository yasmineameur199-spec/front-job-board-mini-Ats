import { Router } from "express";
import { CompanyController } from "../controllers/company.controller.js";

const router = Router();

// VUES
router.get("/list", CompanyController.renderCompanyList);
router.get("/add", CompanyController.renderAddForm);
router.get("/edit/:company_id", CompanyController.renderEditForm);

// ACTIONS
router.post("/", CompanyController.create);
router.post("/update/:company_id", CompanyController.update);
router.post("/delete/:company_id", CompanyController.delete);

export default router;
