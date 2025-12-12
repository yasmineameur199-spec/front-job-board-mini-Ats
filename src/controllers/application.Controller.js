import Application from "../models/application.model.js";
import User from "../models/user.model.js";
import Job from "../models/job.model.js";
import { getPaginationParams } from "../utils/pagination.js";

export const ApplicationController = {

  async create(req, res) {
    try {
      const app = await Application.create(req.body);
      return res.status(201).json(app);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  },

  async findAll(req, res) {
    try {
      const { page, limit, offset } = getPaginationParams(req, 10, 50);

      const where = {};

      if (req.query.id_user) where.user_id = req.query.id_user;
      if (req.query.id_job) where.id_job = req.query.id_job;
      if (req.query.status) where.status = req.query.status;

      const { rows, count } = await Application.findAndCountAll({
        where,
        include: [User, Job],
        limit,
        offset,
        order: [["application_id", "DESC"]],   // ✔ correction importante
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

  async findOne(req, res) {
    try {
      const app = await Application.findByPk(req.params.id, {
        include: [User, Job]
      });

      if (!app) return res.status(404).json({ error: "Application not found" });

      return res.json(app);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  },

  async update(req, res) {
    try {
      const [count] = await Application.update(req.body, {
        where: { application_id: req.params.id } // ✔ correction
      });

      if (count === 0) {
        return res.status(404).json({ error: "Application not found" });
      }

      return res.json({ message: "Application updated" });

    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  },

  async delete(req, res) {
    try {
      const count = await Application.destroy({
        where: { application_id: req.params.id }
      });

      if (count === 0) {
        return res.status(404).json({ error: "Application not found" });
      }

      return res.json({ message: "Application deleted" });

    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
};
