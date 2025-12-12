import HasComment from "../models/hasComment.model.js";

export const HasCommentController = {
  async create(req, res) {
    try {
      const link = await HasComment.create(req.body);
      res.json(link);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  },

  async getAll(req, res) {
    try {
      const links = await HasComment.findAll();
      res.json(links);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  },

  async delete(req, res) {
    try {
      await HasComment.destroy({
        where: {
          application_id: req.body.application_id,
          id_comment: req.body.id_comment
        }
      });
      res.json({ message: "Link deleted" });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }
};
