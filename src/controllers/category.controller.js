import Category from "../models/category.model.js";
import { getPaginationParams } from "../utils/pagination.js";

export const CategoryController = {

  // LISTE
  async renderCategoryList(req, res) {
    try {
      const categories = await Category.findAll({
        order: [["category_id", "DESC"]],
      });

      res.render("categories/list-category", {
        title: "Liste des catégories",
        categories
      });

    } catch (err) {
      res.status(500).send(err.message);
    }
  },

  // FORMULAIRE AJOUT
  renderAddForm(req, res) {
    res.render("categories/add-category", {
      title: "Ajouter une catégorie"
    });
  },

  // FORMULAIRE MODIFICATION
  async renderEditForm(req, res) {
    try {
      const category = await Category.findByPk(req.params.category_id);
      if (!category) return res.status(404).send("Catégorie introuvable");

      res.render("categories/edit-category", {
        title: "Modifier une catégorie",
        category
      });

    } catch (err) {
      res.status(500).send(err.message);
    }
  },

  // CREATE
  async create(req, res) {
    try {
      await Category.create(req.body);
      return res.redirect("/categories/list");
    } catch (err) {
      return res.status(400).send(err.message);
    }
  },

  // UPDATE
  async update(req, res) {
    try {
      const [updated] = await Category.update(req.body, {
        where: { category_id: req.params.category_id },
      });

      if (!updated) return res.status(404).send("Catégorie introuvable");

      return res.redirect("/categories/list");

    } catch (err) {
      return res.status(400).send(err.message);
    }
  },

  // DELETE
  async delete(req, res) {
    try {
      const deleted = await Category.destroy({
        where: { category_id: req.params.category_id },
      });

      if (!deleted) return res.status(404).json({ error: "Category not found" });

      return res.redirect("/categories/list");

    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  },

  // API LIST
  async findAll(req, res) {
    try {
      const { page, limit, offset } = getPaginationParams(req, 10, 100);

      const { rows, count } = await Category.findAndCountAll({
        limit,
        offset,
        order: [["category_id", "DESC"]],
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
      const category = await Category.findByPk(req.params.category_id);
      if (!category) return res.status(404).json({ error: "Category not found" });

      return res.json(category);

    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
};
