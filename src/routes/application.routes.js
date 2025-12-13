import { Router } from "express";
import { ApplicationController } from "../controllers/application.controller.js";
import { uploadApplication } from "../middleware/uploadApplication.js";

const router = Router();

// VUES
router.get("/list", ApplicationController.renderApplicationList);
router.get("/add", ApplicationController.renderAddForm);
router.get("/edit/:application_id", ApplicationController.renderEditForm);

// ACTIONS (UPLOAD)
router.post(
  "/",
  uploadApplication.fields([
    { name: "resume", maxCount: 1 },
    { name: "cover_letter", maxCount: 1 }
  ]),
  ApplicationController.create
);

router.post(
  "/update/:application_id",
  uploadApplication.fields([
    { name: "resume", maxCount: 1 },
    { name: "cover_letter", maxCount: 1 }
  ]),
  ApplicationController.update
);

router.post("/delete/:application_id", ApplicationController.delete);

export default router;
