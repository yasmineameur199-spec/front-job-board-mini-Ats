import { body, param } from "express-validator";

// 🔹 CRÉATION
export const stageValidatorCreate = [
    body("name_stage")
        .notEmpty().withMessage("Le nom de l'étape est obligatoire")
        .isString().withMessage("Le nom doit être une chaîne de caractères"),

    body("order_index")
        .notEmpty().withMessage("L'ordre (index) est obligatoire")
        .isInt({ min: 0 }).withMessage("L'ordre doit être un entier positif ou zéro"),
];

// 🔹 MISE À JOUR
export const stageValidatorUpdate = [
    param("id")
        .notEmpty().withMessage("L'ID de l'étape est obligatoire")
        .isInt({ min: 1 }).withMessage("L'ID doit être un entier positif"),

    body("name_stage")
        .optional()
        .isString().withMessage("Le nom doit être une chaîne de caractères"),

    body("order_index")
        .optional()
        .isInt({ min: 0 }).withMessage("L'ordre doit être un entier positif ou zéro"),
];

// 🔹 SUPPRESSION
export const stageValidatorDelete = [
    param("id")
        .notEmpty().withMessage("L'ID de l'étape est obligatoire")
        .isInt({ min: 1 }).withMessage("L'ID doit être un entier positif"),
];