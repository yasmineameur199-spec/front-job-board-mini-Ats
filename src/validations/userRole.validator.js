import { body, param } from "express-validator";

//
// 🔹 VALIDATION POUR ATTRIBUER UN RÔLE (CREATE)
//
export const userRoleValidatorCreate = [
    body("user_id")
        .notEmpty().withMessage("user_id est obligatoire")
        .isInt({ min: 1 }).withMessage("user_id doit être un entier positif"),

    // Attention : Dans votre modèle physique, la colonne s'appelle id_role
    body("id_role")
        .notEmpty().withMessage("id_role est obligatoire")
        .isInt({ min: 1 }).withMessage("id_role doit être un entier positif"),
];

//
// 🔹 VALIDATION POUR RETIRER UN RÔLE (DELETE)
//
export const userRoleValidatorDelete = [
    // La route est : DELETE /:user_id/:role_id
    param("user_id")
        .notEmpty().withMessage("user_id est obligatoire dans l'URL")
        .isInt({ min: 1 }).withMessage("user_id doit être un entier positif"),

    param("role_id")
        .notEmpty().withMessage("role_id est obligatoire dans l'URL")
        .isInt({ min: 1 }).withMessage("role_id doit être un entier positif"),
];