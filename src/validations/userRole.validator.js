import { body } from "express-validator";

//
// 🔹 VALIDATION POUR ASSIGNER UN RÔLE À UN UTILISATEUR (CRÉATION)
//
export const userRoleValidatorCreate = [

    body("user_id")
        .notEmpty().withMessage("user_id est obligatoire")
        .isInt({ min: 1 }).withMessage("user_id doit être un entier positif"),

    body("id_role")
        .notEmpty().withMessage("id_role est obligatoire")
        .isInt({ min: 1 }).withMessage("id_role doit être un entier positif"),
];

//
// 🔹 VALIDATION POUR RETIRER UN RÔLE À UN UTILISATEUR (SUPPRESSION)
//
export const userRoleValidatorDelete = [

    body("user_id")
        .notEmpty().withMessage("user_id est obligatoire")
        .isInt({ min: 1 }).withMessage("user_id doit être un entier positif"),

    body("id_role")
        .notEmpty().withMessage("id_role est obligatoire")
        .isInt({ min: 1 }).withMessage("id_role doit être un entier positif"),
];