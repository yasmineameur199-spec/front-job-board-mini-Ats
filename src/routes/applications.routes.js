import { Router } from "express";
import { ApplicationsController } from "../controllers/applications.controller.js";

const router = Router();

function isAuthenticated(req, res, next) {
  if (req.session?.user) return next();
  req.flash("error", "Connectez-vous d’abord.");
  res.redirect("/login");
}

router.get("/my-applications", isAuthenticated, ApplicationsController.myApplications);

export default router;
