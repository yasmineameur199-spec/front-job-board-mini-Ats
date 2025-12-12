import Stage from "../models/stage.model.js";
import { getPaginationParams } from "../utils/pagination.js";

export const StageController = {

  // CREATE (inchangé)
  async create(req, res) {
    try {
      const stage = await Stage.create(req.body);
      return res.status(201).json(stage); 
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  },

  // FIND ALL (MODIFIÉ : pagination + filtres)
  async findAll(req, res) {
    try {
      // pagination
      const { page, limit, offset } = getPaginationParams(req, 10, 50);

      // filtres dynamiques
      const where = {};

      // ex : /api/stages?name=Screening
      if (req.query.name) {
        where.name = req.query.name;
      }

      const { rows, count } = await Stage.findAndCountAll({
        where,
        limit,
        offset,
        order: [["stage_id", "DESC"]],
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

  // FIND ONE (inchangé)
  async findOne(req, res) {
    try {
      const stage = await Stage.findByPk(req.params.id);
      if (!stage) {
        return res.status(404).json({ error: "Stage not found" });
      }
      return res.json(stage);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  },

  // UPDATE (inchangé)
  async update(req, res) {
    try {
      const [count] = await Stage.update(req.body, {
        where: { stage_id: req.params.id }
      });

      if (count === 0) {
        return res.status(404).json({ error: "Stage not found" });
      }

      return res.json({ updated: count });
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  },

  // DELETE (inchangé)
  async delete(req, res) {
    try {
      const count = await Stage.destroy({
        where: { stage_id: req.params.id }
      });

      if (count === 0) {
        return res.status(404).json({ error: "Stage not found" });
      }

      return res.json({ message: "Stage deleted" });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
};
