import Role from "../models/role.model.js";
import { getPaginationParams } from "../utils/pagination.js";

export const RoleController = {

  // CREATE
  async create(req, res) {
    try {
      const role = await Role.create(req.body);
      return res.status(201).json(role);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  },

  // FIND ALL (pagination + filtres)
  async findAll(req, res) {
    try {
      const { page, limit, offset } = getPaginationParams(req, 10, 50);

      const where = {};

      // /api/roles?name=Admin
      if (req.query.name) {
        where.name = req.query.name;
      }

      const { rows, count } = await Role.findAndCountAll({
        where,
        limit,
        offset,
        order: [["role_id", "DESC"]],
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

  // FIND ONE
  async findOne(req, res) {
    try {
      const role = await Role.findByPk(req.params.role_id);

      if (!role) {
        return res.status(404).json({ error: "Role not found" });
      }

      return res.json(role);

    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  },

  // UPDATE
  async update(req, res) {
    try {
      const [updated] = await Role.update(req.body, {
        where: { role_id: req.params.role_id }
      });

      if (updated === 0) {
        return res.status(404).json({ error: "Role not found" });
      }

      const role = await Role.findByPk(req.params.role_id);
      return res.json(role);

    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  },

  // DELETE
  async delete(req, res) {
    try {
      const deleted = await Role.destroy({
        where: { role_id: req.params.role_id }
      });

      if (deleted === 0) {
        return res.status(404).json({ error: "Role not found" });
      }

      return res.json({ message: "Role deleted" });

    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
};
