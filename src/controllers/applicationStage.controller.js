import ApplicationStage from "../models/applicationStage.model.js";

export const ApplicationStageController = {
  async create(req, res) {
    try {
      const asg = await ApplicationStage.create(req.body);
      return res.status(201).json(asg);           // 201
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  },

  async findAll(req, res) {
    try {
      const all = await ApplicationStage.findAll();
      return res.json(all);                       // 200 by default
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  },

  async delete(req, res) {
    try {
      const { application_id, stage_id } = req.body;

      if (!application_id || !stage_id) {
        return res
          .status(400)
          .json({ error: "application_id and stage_id are required" });
      }

      const count = await ApplicationStage.destroy({
        where: { application_id, stage_id }
      });

      if (count === 0) {
        return res.status(404).json({ error: "Relation not found" });
      }

      return res.json({ message: "Relation removed" });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
};
