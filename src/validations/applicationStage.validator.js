import { body } from "express-validator";

// 🔹 AJOUTER UNE ÉTAPE À UNE CANDIDATURE
export const applicationStageValidatorCreate = [
    body("application_id")
        .notEmpty().withMessage("application_id est obligatoire")
        .isInt({ min: 1 }).withMessage("application_id doit être un entier positif"),

    body("stage_id")
        .notEmpty().withMessage("stage_id est obligatoire")
        .isInt({ min: 1 }).withMessage("stage_id doit être un entier positif"),
];

// 🔹 SUPPRIMER UNE ÉTAPE D'UNE CANDIDATURE
export const applicationStageValidatorDelete = [
    body("application_id")
        .notEmpty().withMessage("application_id est obligatoire")
        .isInt({ min: 1 }).withMessage("application_id doit être un entier positif"),

    body("stage_id")
        .notEmpty().withMessage("stage_id est obligatoire")
        .isInt({ min: 1 }).withMessage("stage_id doit être un entier positif"),
];