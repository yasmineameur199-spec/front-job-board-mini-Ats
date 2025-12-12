import { body, param } from "express-validator";

// 🔹 CRÉATION
export const companyValidatorCreate = [
    body("company_name")
        .notEmpty().withMessage("Le nom de l'entreprise est obligatoire")
        .isString().withMessage("Le nom doit être une chaîne de caractères")
        .isLength({ min: 2 }).withMessage("Le nom doit contenir au moins 2 caractères"),

    body("website")
        .optional()
        .isURL().withMessage("Le site web doit être une URL valide"),

    body("description")
        .optional()
        .isString().withMessage("La description doit être du texte"),
];

// 🔹 MISE À JOUR
export const companyValidatorUpdate = [
    param("id")
        .notEmpty().withMessage("L'ID de l'entreprise est obligatoire")
        .isInt({ min: 1 }).withMessage("L'ID doit être un entier positif"),

    body("company_name")
        .optional()
        .isString().withMessage("Le nom doit être une chaîne de caractères"),

    body("website")
        .optional()
        .isURL().withMessage("Le site web doit être une URL valide"),

    body("description")
        .optional()
        .isString().withMessage("La description doit être du texte"),
];

// 🔹 SUPPRESSION
export const companyValidatorDelete = [
    param("id")
        .notEmpty().withMessage("L'ID de l'entreprise est obligatoire")
        .isInt({ min: 1 }).withMessage("L'ID doit être un entier positif"),
];