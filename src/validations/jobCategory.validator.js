import { body } from "express-validator";

//
// 🔹 VALIDATION POUR AJOUTER UNE RELATION JOB ↔ CATEGORY
//
export const jobCategoryValidatorCreate = [

    body("job_id")
        .notEmpty().withMessage("job_id est obligatoire")
        .isInt({ min: 1 }).withMessage("job_id doit être un entier positif"),

    body("id_category")
        .notEmpty().withMessage("id_category est obligatoire")
        .isInt({ min: 1 }).withMessage("id_category doit être un entier positif"),
];

//
//  VALIDATION POUR SUPPRIMER UNE RELATION
//
export const jobCategoryValidatorDelete = [

    body("job_id")
        .notEmpty().withMessage("job_id est obligatoire")
        .isInt({ min: 1 }).withMessage("job_id doit être un entier positif"),

    body("id_category")
        .notEmpty().withMessage("id_category est obligatoire")
        .isInt({ min: 1 }).withMessage("id_category doit être un entier positif"),
];
