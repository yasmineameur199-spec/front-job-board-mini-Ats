import UserRole from "../models/userRole.model.js";
import User from "../models/user.model.js"; // Assurez-vous que ce chemin est correct
import Role from "../models/role.model.js";

export const UserRoleController = {

  // --- RENDER METHODS ---

  // Lister les attributions
  async renderList(req, res) {
    try {
      const userRoles = await UserRole.findAll();
      res.render("userRole/list-userRole", { // Vérifiez que le dossier views s'appelle bien userRole
        title: "Attributions des Rôles",
        userRoles
      });
    } catch (err) {
      res.status(500).send(err.message);
    }
  },

  // Formulaire d'ajout : a besoin de la liste des Users et des Roles
  async renderAddForm(req, res) {
    try {
      const users = await User.findAll();
      const roles = await Role.findAll();
      
      res.render("userRole/add-userRole", {
        title: "Assigner un rôle",
        users,
        roles
      });
    } catch (err) {
      res.status(500).send(err.message);
    }
  },

  // Formulaire d'édition
  async renderEditForm(req, res) {
    const { user_id, role_id } = req.params;
    try {
      // On cherche l'association spécifique
      const oldUserRole = await UserRole.findOne({
        where: { user_id: user_id, id_role: role_id }
      });

      if (!oldUserRole) {
        return res.status(404).send("Association introuvable");
      }

      // On a besoin de la liste des rôles pour le menu déroulant
      const roles = await Role.findAll();

      res.render("userRole/edit-userRole", {
        title: "Modifier l'attribution",
        user_id, // Passé pour l'URL du formulaire
        oldUserRole,
        roles
      });
    } catch (err) {
      res.status(500).send(err.message);
    }
  },

  // --- ACTION METHODS ---

  // Créer (Assigner)
  async create(req, res) {
    try {
      // req.body contient { user_id, id_role }
      await UserRole.create(req.body);
      res.redirect("/user-roles"); // Redirection vers la liste
    } catch (err) {
      res.status(400).send(err.message);
    }
  },

  // Mise à jour (Changer le rôle d'un user)
  async update(req, res) {
    const { user_id, role_id } = req.params; // Anciens identifiants dans l'URL
    const { id_role: newRoleId } = req.body; // Nouveau rôle choisi dans le form

    try {
      await UserRole.update(
        { id_role: newRoleId }, // On met à jour l'ID du rôle
        { 
          where: { 
            user_id: user_id, 
            id_role: role_id 
          } 
        }
      );
      res.redirect("/user-roles");
    } catch (err) {
      res.status(400).send(err.message);
    }
  },

  // Supprimer une attribution
  async delete(req, res) {
    const { user_id, role_id } = req.params;

    try {
      await UserRole.destroy({
        where: { 
          user_id: user_id, 
          id_role: role_id 
        }
      });
      res.redirect("/user-roles");
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

};