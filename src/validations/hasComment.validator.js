import { body } from "express-validator";

// 🔹 CRÉATION (LIAISON)
export const hasCommentValidatorCreate = [
    body("application_id")
        .notEmpty().withMessage("application_id est obligatoire")
        .isInt({ min: 1 }).withMessage("application_id doit être un entier positif"),

    body("id_comment")
        .notEmpty().withMessage("id_comment est obligatoire")
        .isInt({ min: 1 }).withMessage("id_comment doit être un entier positif"),
];

// 🔹 SUPPRESSION (DÉLIAISON)
export const hasCommentValidatorDelete = [
    body("application_id")
        .notEmpty().withMessage("application_id est obligatoire")
        .isInt({ min: 1 }).withMessage("application_id doit être un entier positif"),

    body("id_comment")
        .notEmpty().withMessage("id_comment est obligatoire")
        .isInt({ min: 1 }).withMessage("id_comment doit être un entier positif"),
];