import { Router } from "express";
import { User, Role } from "../models/index.model.js";
import { AuthController } from "../controllers/auth.controller.js";

const router = Router();

router.get("/login", (req, res) => {
  res.render("auth/login", {
    title: "Connexion",
    error: res.locals.flash.error?.[0] || null,
  });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({
      where: { email },
      include: Role,
    });

    if (!user || user.password !== password) {
      req.flash("error", "Identifiants invalides");
      return res.redirect("/login");
    }

    const roles = user.roles?.map((r) => r.name) || [];

    req.session.user = {
      id: user.id || user.user_id,
      email: user.email,
      roles,
      id_company: user.id_company,
    };

    res.redirect("/");
  } catch (err) {
    console.error(err);
    req.flash("error", "Erreur de connexion");
    res.redirect("/login");
  }
});

router.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/login");
  });
});

export default router;
