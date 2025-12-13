import { User, Role, Company } from "../models/index.model.js";

export const AuthController = {
  renderLogin(req, res) {
    res.render("auth/login", { title: "Connexion", error: null });
  },

  async login(req, res) {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({
        where: { email },
        include: [
          { model: Role },   // for roles
          { model: Company } // optional
        ],
      });

      if (!user) {
        return res.status(401).render("auth/login", {
          title: "Connexion",
          error: "Email ou mot de passe invalide.",
        });
      }

      // ⚠️ Demo/simple: plaintext compare.
      // If you have hashed passwords, replace with bcrypt.compare().
      const ok = user.password === password;
      if (!ok) {
        return res.status(401).render("auth/login", {
          title: "Connexion",
          error: "Email ou mot de passe invalide.",
        });
      }

      const plain = user.get({ plain: true });

      // Normalize roles into ["Recruiter", "Candidate", ...]
      const roles = (plain.Roles || plain.roles || []).map(r => r.name || r.name_role || r.role_name).filter(Boolean);

      req.session.user = {
        user_id: plain.user_id ?? plain.id,
        email: plain.email,
        id_company: plain.id_company ?? plain.Company?.company_id ?? plain.company?.company_id ?? null,
        roles,
      };

      req.flash("success", "Connexion réussie.");
      return res.redirect("/");
    } catch (err) {
      console.error(err);
      return res.status(500).render("auth/login", {
        title: "Connexion",
        error: "Erreur serveur.",
      });
    }
  },

  logout(req, res) {
    req.session.destroy(() => {
      res.redirect("/login");
    });
  },
};
