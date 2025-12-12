import { body, param } from "express-validator";

//
// 🔹 VALIDATION POUR CRÉER UNE CATÉGORIE
//
export const categoryValidatorCreate = [

    body("name_category")
        .notEmpty().withMessage("Le nom de la catégorie est obligatoire")
        .isString().withMessage("Le nom de la catégorie doit être une chaîne de caractères")
        .isLength({ min: 2 }).withMessage("Le nom de la catégorie doit contenir au moins 2 caractères"),
];

//
// 🔹 VALIDATION POUR METTRE À JOUR UNE CATÉGORIE
//
export const categoryValidatorUpdate = [

    param("category_id")
        .notEmpty().withMessage("L'ID de la catégorie est obligatoire")
        .isInt({ min: 1 }).withMessage("category_id doit être un entier positif"),

    body("name_category")
        .optional()
        .isString().withMessage("Le nom de la catégorie doit être une chaîne de caractères")
        .isLength({ min: 2 }).withMessage("Le nom de la catégorie doit contenir au moins 2 caractères"),
];

//
// 🔹 VALIDATION POUR SUPPRIMER UNE CATÉGORIE
//
export const categoryValidatorDelete = [

    param("category_id")
        .notEmpty().withMessage("L'ID de la catégorie est obligatoire")
        .isInt({ min: 1 }).withMessage("category_id doit être un entier positif"),
];
