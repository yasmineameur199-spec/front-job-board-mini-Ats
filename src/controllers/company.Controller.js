import Company from "../models/company.model.js";
import User from "../models/user.model.js";
import Job from "../models/job.model.js";

import { getPaginationParams } from "../utils/pagination.js";

export const CompanyController = {

  // CREATE
  async create(req, res) {
    try {
      const company = await Company.create(req.body);
      res.json(company);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  // READ ALL (pagination + variables de query)
  async findAll(req, res) {
    try {
      const { page, limit, offset } = getPaginationParams(req, 10, 50);

      const where = {};

      if (req.query.name) where.company_name = req.query.name;
      if (req.query.city) where.city = req.query.city;

      const { rows, count } = await Company.findAndCountAll({
        where,
        include: [User, Job],
        limit,
        offset,

        // 🔥 CORRECTION ICI :
        order: [["company_id", "DESC"]],
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
      res.status(500).json({ error: err.message });
    }
  },

  // READ ONE
  async findOne(req, res) {
    try {
      const company = await Company.findByPk(req.params.id, {
        include: [User, Job]
      });

      if (!company)
        return res.status(404).json({ error: "Company not found" });

      res.json(company);

    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // UPDATE
  async update(req, res) {
    try {
      await Company.update(req.body, {
        where: { company_id: req.params.id }   // 🔥 correction ici aussi
      });
      res.json({ message: "Company updated" });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  // DELETE
  async delete(req, res) {
    try {
      await Company.destroy({
        where: { company_id: req.params.id }   // 🔥 correction ici aussi
      });
      res.json({ message: "Company deleted" });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
};
