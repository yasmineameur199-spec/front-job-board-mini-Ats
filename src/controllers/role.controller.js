import Role from "../models/role.model.js";

export const RoleController = {

  // --- RENDER METHODS (Pour EJS) ---

  // Affiche la liste des rôles
  async renderList(req, res) {
    try {
      const roles = await Role.findAll({
        order: [["role_id", "DESC"]] // Trié par ID décroissant
      });
      res.render("role/list-role", { // Attention au nom du dossier 'role' (singulier ou pluriel selon votre dossier views)
        title: "Gestion des Rôles",
        roles
      });
    } catch (err) {
      res.status(500).send(err.message);
    }
  },

  // Affiche le formulaire d'ajout
  renderAddForm(req, res) {
    res.render("role/add-role", {
      title: "Créer un nouveau rôle"
    });
  },

  // Affiche le formulaire d'édition
  async renderEditForm(req, res) {
    try {
      const role = await Role.findByPk(req.params.role_id);
      if (!role) {
        return res.status(404).send("Rôle introuvable");
      }
      res.render("role/edit-role", {
        title: "Modifier le rôle",
        role
      });
    } catch (err) {
      res.status(500).send(err.message);
    }
  },

  // --- ACTION METHODS (Redirections) ---

  // Créer un rôle (POST)
  async create(req, res) {
    try {
      await Role.create(req.body);
      return res.redirect("/roles"); // Redirection vers la liste
    } catch (err) {
      return res.status(400).send(err.message);
    }
  },

  // Mettre à jour un rôle (PUT)
  async update(req, res) {
    try {
      const [updated] = await Role.update(req.body, {
        where: { role_id: req.params.role_id }
      });

      if (updated === 0) {
        return res.status(404).send("Rôle introuvable");
      }

      return res.redirect("/roles");
    } catch (err) {
      return res.status(400).send(err.message);
    }
  },

  // Supprimer un rôle (DELETE)
  async delete(req, res) {
    try {
      await Role.destroy({
        where: { role_id: req.params.role_id }
      });
      return res.redirect("/roles");
    } catch (err) {
      return res.status(500).send(err.message);
    }
  },

  // --- API JSON (Optionnel, si besoin pour le futur) ---
  async findAllJson(req, res) {
    const roles = await Role.findAll();
    res.json(roles);
  }
};