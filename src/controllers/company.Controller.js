import Company from "../models/company.model.js";

export const CompanyController = {

  // =======================
  // LISTE (VUE)
  // =======================
  async renderCompanyList(req, res) {
    try {
      const companies = await Company.findAll({
        order: [["company_id", "DESC"]],
      });

      res.render("companies/list-company", {
        title: "Liste des entreprises",
        companies,
        query: req.query
      });
    } catch (err) {
      res.status(500).send(err.message);
    }
  },

  // =======================
  // FORM AJOUT (VUE)
  // =======================
  renderAddForm(req, res) {
    res.render("companies/add-company", {
      title: "Ajouter une entreprise",
      query: req.query
    });
  },

  // =======================
  // FORM EDIT (VUE)
  // =======================
  async renderEditForm(req, res) {
    try {
      const company = await Company.findByPk(req.params.company_id);

      if (!company) {
        return res.status(404).send("Entreprise introuvable");
      }

      res.render("companies/edit-company", {
        title: "Modifier l’entreprise",
        company
      });
    } catch (err) {
      res.status(500).send(err.message);
    }
  },

  // =======================
  // CREATE
  // =======================
  async create(req, res) {
    try {
      await Company.create(req.body);
      return res.redirect("/companies/list?success=Entreprise ajoutée");
    } catch (err) {
      return res.redirect(
        "/companies/add?error=" + encodeURIComponent(err.message)
      );
    }
  },

  // =======================
  // UPDATE
  // =======================
  async update(req, res) {
    try {
      const [updated] = await Company.update(req.body, {
        where: { company_id: req.params.company_id }
      });

      if (!updated) {
        return res.redirect("/companies/list?error=Entreprise introuvable");
      }

      return res.redirect("/companies/list?success=Entreprise modifiée");
    } catch (err) {
      return res.redirect(
        "/companies/list?error=" + encodeURIComponent(err.message)
      );
    }
  },

  // =======================
  // DELETE
  // =======================
  async delete(req, res) {
    try {
      const deleted = await Company.destroy({
        where: { company_id: req.params.company_id }
      });

      if (!deleted) {
        return res.redirect("/companies/list?error=Entreprise introuvable");
      }

      return res.redirect("/companies/list?success=Entreprise supprimée");
    } catch (err) {
      return res.redirect(
        "/companies/list?error=" + encodeURIComponent(err.message)
      );
    }
  }
};
