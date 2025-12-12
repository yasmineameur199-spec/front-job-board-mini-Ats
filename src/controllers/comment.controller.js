import Comment from "../models/comment.model.js";
import { getPaginationParams } from "../utils/pagination.js";

export const CommentController = {

  // CREATE (inchangé)
  async create(req, res) {
    try {
      const comment = await Comment.create(req.body);
      return res.status(201).json(comment);              // 201 
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  },

  // READ ALL (pagination + variables de query)
  async findAll(req, res) {
    try {
      // pagination
      const { page, limit, offset } = getPaginationParams(req, 10, 50);

      // filtres dynamiques
      const where = {};

      // /api/comments?id_user=3
      if (req.query.id_user) {
        where.id_user = req.query.id_user;
      }

      // find + pagination
      const { rows, count } = await Comment.findAndCountAll({
        where,
        limit,
        offset,
        order: [["comment_id", "DESC"]],
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

  // READ ONE (inchangé)
  async findOne(req, res) {
    try {
      const comment = await Comment.findByPk(req.params.id);

      if (!comment) {
        return res.status(404).json({ error: "Comment not found" });
      }

      return res.json(comment);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  },

  // UPDATE (inchangé)
  async update(req, res) {
    try {
      const [count] = await Comment.update(req.body, {
        where: { comment_id: req.params.id }
      });

      if (count === 0) {
        return res.status(404).json({ error: "Comment not found" });
      }

      return res.json({ updated: count });               // 200 
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  },

  // DELETE (inchangé)
  async delete(req, res) {
    try {
      const count = await Comment.destroy({
        where: { comment_id: req.params.id }
      });

      if (count === 0) {
        return res.status(404).json({ error: "Comment not found" });
      }

      return res.json({ message: "Comment deleted" });   // 200 
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
};
