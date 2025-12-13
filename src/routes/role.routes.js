import { Router } from "express";
import { RoleController } from "../controllers/role.controller.js";

// On garde les validateurs si vous souhaitez protéger les actions
import {
    roleValidatorCreate,
    roleValidatorUpdate,
    roleValidatorDelete
} from "../validations/role.validator.js";
import { validate } from "../middleware/validator.js";

const router = Router();

// --- VUES (Pages HTML) ---
router.get("/list", RoleController.renderList);           // Affiche le tableau
router.get("/add", RoleController.renderAddForm);         // Affiche le formulaire de création
router.get("/edit/:role_id", RoleController.renderEditForm); // Affiche le formulaire d'édition

// --- ACTIONS (Traitement des formulaires) ---
// Note : Le middleware 'validate' peut renvoyer du JSON en cas d'erreur. 
// Pour un full EJS, on gère souvent les erreurs dans le contrôleur, 
// mais on les laisse ici pour la sécurité.

// Créer
router.post("/", roleValidatorCreate, validate, RoleController.create);

// Modifier (via method-override: ?_method=PUT)
router.put("/:role_id", roleValidatorUpdate, validate, RoleController.update);

// Supprimer (via method-override: ?_method=DELETE)
router.delete("/:role_id", roleValidatorDelete, validate, RoleController.delete);

export default router;