import { body, param } from "express-validator";

//
// 🔹 VALIDATION POUR CRÉER UN JOB
//
export const jobValidatorCreate = [

    body("titre")
        .notEmpty().withMessage("Le titre est obligatoire")
        .isString().withMessage("Le titre doit être une chaîne de caractères")
        .isLength({ min: 3 }).withMessage("Le titre doit contenir au moins 3 caractères"),

    body("location")
        .notEmpty().withMessage("La localisation est obligatoire")
        .isString().withMessage("La localisation doit être une chaîne de caractères"),

    body("employment_type")
        .notEmpty().withMessage("Le type d'emploi est obligatoire")
        .isString().withMessage("Le type d'emploi doit être une chaîne de caractères")
        .isIn(["full-time", "part-time", "contract"]).withMessage("Le type d'emploi doit être full-time, part-time ou contract"),

    body("is_active")
        .notEmpty().withMessage("is_active est obligatoire")
        .isBoolean().withMessage("is_active doit être un booléen"),

    body("posted_at")
        .notEmpty().withMessage("La date de publication est obligatoire")
        .isISO8601().withMessage("La date doit être au format YYYY-MM-DD"),

    body("id_company")
        .notEmpty().withMessage("id_company est obligatoire")
        .isInt({ min: 1 }).withMessage("id_company doit être un entier positif"),
];

//
// 🔹 VALIDATION POUR METTRE À JOUR UN JOB
//
export const jobValidatorUpdate = [

    param("job_id")
        .notEmpty().withMessage("job_id est obligatoire")
        .isInt({ min: 1 }).withMessage("job_id doit être un entier positif"),

    body("titre")
        .optional()
        .isString().withMessage("Le titre doit être une chaîne de caractères")
        .isLength({ min: 3 }).withMessage("Le titre doit contenir au moins 3 caractères"),

    body("location")
        .optional()
        .isString().withMessage("La localisation doit être une chaîne de caractères"),

    body("employment_type")
        .optional()
        .isString().withMessage("Le type d'emploi doit être une chaîne de caractères")
        .isIn(["full-time", "part-time", "contract"]).withMessage("Valeur non valide pour employment_type"),

    body("is_active")
        .optional()
        .isBoolean().withMessage("is_active doit être un booléen"),

    body("posted_at")
        .optional()
        .isISO8601().withMessage("La date doit être au format YYYY-MM-DD"),

    body("id_company")
        .optional()
        .isInt({ min: 1 }).withMessage("id_company doit être un entier positif"),
];

//
// 🔹 VALIDATION POUR SUPPRIMER UN JOB
//
export const jobValidatorDelete = [

    param("job_id")
        .notEmpty().withMessage("job_id est obligatoire")
        .isInt({ min: 1 }).withMessage("job_id doit être un entier positif"),
];
