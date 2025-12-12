import User from "../models/user.model.js";
import Company from "../models/company.model.js";
import Role from "../models/role.model.js";
import { getPaginationParams } from "../utils/pagination.js";

export const UserController = {

  // CREATE (inchangé)
  async create(req, res) {
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  // READ ALL (MODIFIÉ : pagination + variables de query)
  async findAll(req, res) {
    try {
      // lire pagination depuis req.query
      const { page, limit, offset } = getPaginationParams(req, 10, 50);

      // filtres dynamiques
      const where = {};

      // /api/users?id_company=2
      if (req.query.id_company) {
        where.id_company = req.query.id_company;
      }

      // /api/users?email=example@mail.com
      if (req.query.email) {
        where.email = req.query.email;
      }

      // requête avec pagination et include
      const { rows, count } = await User.findAndCountAll({
        where,
        include: [Company, Role],
        limit,
        offset,
        order: [["user_id", "DESC"]],
      });

      // retour data + pagination
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

  // READ ONE (inchangé)
  async findOne(req, res) {
    try {
      const user = await User.findByPk(req.params.id, {
        include: [Company, Role]
      });

      if (!user)
        return res.status(404).json({ error: "User not found" });

      res.json(user);

    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // UPDATE (inchangé)
  async update(req, res) {
    try {
      await User.update(req.body, {
        where: { user_id: req.params.id }
      });
      res.json({ message: "User updated" });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  // DELETE (inchangé)
  async delete(req, res) {
    try {
      await User.destroy({
        where: { user_id: req.params.id }
      });
      res.json({ message: "User deleted" });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
};
