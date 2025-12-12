import { Router } from "express";
import { UserRoleController } from "../controllers/userRole.controller.js";

import {
    userRoleValidatorCreate,
    userRoleValidatorDelete
} from "../validations/userRole.validator.js";
import { validate } from "../middleware/validator.js";

const router = Router();

// --- VUES ---
router.get("/list", UserRoleController.renderList);

// Afficher le formulaire d'ajout
router.get("/add", UserRoleController.renderAddForm);

// Afficher le formulaire d'édition 
// ATTENTION : Clé composite nécessaire pour identifier la ligne unique
router.get("/edit/:user_id/:role_id", UserRoleController.renderEditForm);

// --- ACTIONS ---

// Créer (POST)
router.post("/", userRoleValidatorCreate, validate, UserRoleController.create);

// Modifier (PUT) - On a besoin des deux IDs pour cibler la ligne à modifier
router.put("/:user_id/:role_id", userRoleValidatorCreate, validate, UserRoleController.update);

// Supprimer (DELETE) - Idem, on cible par la paire d'IDs
router.delete("/:user_id/:role_id", userRoleValidatorDelete, validate, UserRoleController.delete);

export default router;