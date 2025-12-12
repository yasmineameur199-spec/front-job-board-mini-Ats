import { body, param } from "express-validator";

//
// 🔹 VALIDATION POUR CRÉER UN RÔLE
//
export const roleValidatorCreate = [
    body("role_name")
        .notEmpty().withMessage("Le nom du rôle est obligatoire")
        .isString().withMessage("Le nom du rôle doit être une chaîne de caractères")
        .isLength({ min: 2 }).withMessage("Le nom du rôle doit contenir au moins 2 caractères"),
];

//
// 🔹 VALIDATION POUR METTRE À JOUR UN RÔLE
//
export const roleValidatorUpdate = [
    // Vérification de l'ID dans l'URL
    param("role_id")
        .notEmpty().withMessage("L'ID du rôle est obligatoire")
        .isInt({ min: 1 }).withMessage("role_id doit être un entier positif"),

    // Vérification du nom dans le corps (optionnel si on ne le change pas)
    body("role_name")
        .optional()
        .isString().withMessage("Le nom du rôle doit être une chaîne de caractères")
        .isLength({ min: 2 }).withMessage("Le nom du rôle doit contenir au moins 2 caractères"),
];

//
// 🔹 VALIDATION POUR SUPPRIMER UN RÔLE
//
export const roleValidatorDelete = [
    param("role_id")
        .notEmpty().withMessage("L'ID du rôle est obligatoire")
        .isInt({ min: 1 }).withMessage("role_id doit être un entier positif"),
];