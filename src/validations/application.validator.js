import { body, param } from "express-validator";

// 🔹 CRÉATION
export const applicationValidatorCreate = [
    body("resume")
        .notEmpty().withMessage("Le CV (resume) est obligatoire")
        .isString().withMessage("Le CV doit être une chaîne de caractères"),

    body("cover_letter")
        .optional()
        .isString().withMessage("La lettre de motivation doit être une chaîne de caractères"),

    body("id_job")
        .notEmpty().withMessage("L'ID du job est obligatoire")
        .isInt({ min: 1 }).withMessage("id_job doit être un entier positif"),
    
    // 'applied_at' est souvent géré automatiquement par la BDD (defaultValue: NOW)
];

// 🔹 MISE À JOUR
export const applicationValidatorUpdate = [
    param("id")
        .notEmpty().withMessage("L'ID de la candidature est obligatoire")
        .isInt({ min: 1 }).withMessage("L'ID doit être un entier positif"),

    body("resume")
        .optional()
        .isString().withMessage("Le CV doit être une chaîne de caractères"),

    body("cover_letter")
        .optional()
        .isString().withMessage("La lettre de motivation doit être une chaîne de caractères"),
    
    body("id_job")
        .optional()
        .isInt({ min: 1 }).withMessage("id_job doit être un entier positif"),
];

// 🔹 SUPPRESSION
export const applicationValidatorDelete = [
    param("id")
        .notEmpty().withMessage("L'ID de la candidature est obligatoire")
        .isInt({ min: 1 }).withMessage("L'ID doit être un entier positif"),
];