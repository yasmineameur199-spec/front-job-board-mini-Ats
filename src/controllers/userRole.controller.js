import UserRole from "../models/userRole.model.js";

export const UserRoleController = {

  async create(req, res) {
    try {
      const userRole = await UserRole.create(req.body);
      res.json(userRole);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  async findAll(req, res) {
    try {
      const userRoles = await UserRole.findAll();
      res.json(userRoles);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async findOne(req, res) {
    try {
      const userRole = await UserRole.findByPk(req.params.id);

      return userRole
        ? res.json(userRole)
        : res.status(404).json({ error: "UserRole not found" });

    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async update(req, res) {
    try {
      const [updated] = await UserRole.update(req.body, {
        where: { id: req.params.id }
      });

      if (updated === 0) {
        return res.status(404).json({ error: "UserRole not found" });
      }

      res.json({ updated });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  async delete(req, res) {
    try {
      const deleted = await UserRole.destroy({
        where: { id: req.params.id }
      });

      if (!deleted) {
        return res.status(404).json({ error: "UserRole not found" });
      }

      res.json({ message: "UserRole deleted" });

    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

};
