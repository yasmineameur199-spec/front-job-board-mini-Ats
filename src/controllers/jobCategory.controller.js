import JobCategory from "../models/jobCategory.model.js";
import Category from "../models/category.model.js";
import Job from "../models/job.model.js";

export const JobCategoryController = {

  // RENDER LISTE
  async renderList(req, res) {
    const jobCategories = await JobCategory.findAll();
    res.render("jobCategories/list-jobCategory", {
      title: "Relations Job ↔ Catégories",
      jobCategories
    });
  },

  // RENDER AJOUT
  async renderAddForm(req, res) {
    const job_id = req.params.job_id;
    const categories = await Category.findAll();
    res.render("jobCategories/add-jobCategory", {
      title: "Ajouter une catégorie au job",
      job_id,
      categories
    });
  },

  // RENDER ÉDITION
  async renderEditForm(req, res) {
    const { job_id, id_category } = req.params;

    const oldCategory = await JobCategory.findOne({
      where: { job_id, id_category }
    });

    if (!oldCategory) {
      return res.status(404).send("Relation introuvable");
    }

    const categories = await Category.findAll();

    res.render("jobCategories/edit-jobCategory", {
      title: "Modifier la catégorie associée",
      job_id,
      oldCategory,
      categories
    });
  },

  // CREATE
  async create(req, res) {
    const { job_id, id_category } = req.body;

    await JobCategory.create({ job_id, id_category });

    return res.redirect(`/job-categories/list`);
  },

  // FIND ALL (API JSON)
  async findAll(req, res) {
    const relations = await JobCategory.findAll();
    return res.json(relations);
  },

  // UPDATE
  async update(req, res) {
    const { job_id, id_category } = req.params;
    const { id_category: newCategory } = req.body;

    await JobCategory.update(
      { job_id, id_category: newCategory },
      { where: { job_id, id_category } }
    );

    return res.redirect(`/job-categories/list`);
  },

  // DELETE
  async delete(req, res) {
    const { job_id, id_category } = req.params;

    await JobCategory.destroy({
      where: { job_id, id_category }
    });

    return res.redirect(`/job-categories/list`);
  }
};
