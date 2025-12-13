import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.render("home/index", {
    title: "Job Board / Mini ATS",
  });
});

export default router;
