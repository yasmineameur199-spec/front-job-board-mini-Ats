import User from "../models/user.model.js";
import Company from "../models/company.model.js";
import { getPaginationParams } from "../utils/pagination.js";
import { query } from "express-validator";

export const UserController = {

  // =======================
  // LISTE (VUE)
  // =======================
  async renderUserList(req, res) {
    try {
      const users = await User.findAll({
        include: [Company],
        order: [["user_id", "DESC"]],
      });

      res.render("users/list-user", {
        title: "Liste des utilisateurs",
        users,
        query: req.query
      });

    } catch (err) {
      res.status(500).send(err.message);
    }
  },

  // =======================
  // FORMULAIRE AJOUT (VUE)
  // =======================
  renderAddForm(req, res) {
    res.render("users/add-user", {
      title: "Ajouter un utilisateur"
    });
  },

  // =======================
  // FORMULAIRE MODIFICATION (VUE)
  // =======================
  async renderEditForm(req, res) {
    try {
      const user = await User.findByPk(req.params.user_id, {
        include: [Company]
      });

      if (!user) return res.status(404).send("Utilisateur introuvable");

      res.render("users/edit-user", {
        title: "Modifier un utilisateur",
        user
      });

    } catch (err) {
      res.status(500).send(err.message);
    }
  },

  // =======================
  // CREATE
  // =======================
  async create(req, res) {
  try {
    // corriger FK vide
    if (!req.body.id_company) {
      req.body.id_company = null;
    }

    await User.create(req.body);

    // message succès
    return res.redirect("/users/list?success=Utilisateur ajouté avec succès");

  } catch (err) {
    // message erreur
    return res.redirect("/users/add?error=" + encodeURIComponent(err.message));
  }
},

  // =======================
  // UPDATE
  // =======================
  async update(req, res) {
    try {
      const [updated] = await User.update(req.body, {
        where: { user_id: req.params.user_id },
      });

      if (!updated) return res.status(404).send("Utilisateur introuvable");

      return res.redirect("/users/list");

    } catch (err) {
      return res.status(400).send(err.message);
    }
  },

  // =======================
  // DELETE
  // =======================
  async delete(req, res) {
    try {
      const deleted = await User.destroy({
        where: { user_id: req.params.user_id },
      });

      if (!deleted) return res.status(404).json({ error: "User not found" });

      return res.redirect("/users/list");

    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  },

  // =======================
  // API LIST (JSON)
  // =======================
  async findAll(req, res) {
    try {
      const { page, limit, offset } = getPaginationParams(req, 10, 100);

      const { rows, count } = await User.findAndCountAll({
        include: [Company],
        limit,
        offset,
        order: [["user_id", "DESC"]],
      });

      return res.json({
        data: rows,
        pagination: {
          total: count,
          page,
          limit,
          pageCount: Math.ceil(count / limit),
        },
      });

    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  },

  // =======================
  // FIND ONE (JSON)
  // =======================
  async findOne(req, res) {
    try {
      const user = await User.findByPk(req.params.user_id, {
        include: [Company]
      });

      if (!user) return res.status(404).json({ error: "User not found" });

      return res.json(user);

    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
};
