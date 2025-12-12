import { body, param } from "express-validator";

// 🔹 CREATE USER
export const userValidatorCreate = [

  body("first_name")
    .notEmpty().withMessage("Le prénom est obligatoire")
    .isString().withMessage("Le prénom doit être une chaîne de caractères")
    .isLength({ min: 2 }).withMessage("Le prénom doit contenir au moins 2 caractères"),

  body("email")
    .notEmpty().withMessage("L'email est obligatoire")
    .isEmail().withMessage("Email invalide")
    .normalizeEmail(),

  body("password")
    .notEmpty().withMessage("Le mot de passe est obligatoire")
    .isLength({ min: 8 }).withMessage("Le mot de passe doit contenir au moins 8 caractères")
    .matches(/[A-Z]/).withMessage("Doit contenir au moins une majuscule")
    .matches(/[a-z]/).withMessage("Doit contenir au moins une minuscule")
    .matches(/[0-9]/).withMessage("Doit contenir au moins un chiffre")
    .matches(/[^A-Za-z0-9]/).withMessage("Doit contenir au moins un caractère spécial"),

  body("status")
    .optional()
    .isString().withMessage("Le statut doit être une chaîne de caractères"),

  body("id_company")
    .optional()
    .isInt({ min: 1 }).withMessage("id_company doit être un entier positif"),
];


// 🔹 UPDATE USER
export const userValidatorUpdate = [

  param("id")
    .notEmpty().withMessage("L'ID est obligatoire")
    .isInt({ min: 1 }).withMessage("L'ID doit être un entier positif"),

  body("first_name")
    .optional()
    .isString().withMessage("Le prénom doit être une chaîne de caractères")
    .isLength({ min: 2 }).withMessage("Le prénom doit contenir au moins 2 caractères"),

  body("email")
    .optional()
    .isEmail().withMessage("Email invalide"),

  body("status")
    .optional()
    .isString().withMessage("Le statut doit être une chaîne de caractères"),

  body("id_company")
    .optional()
    .isInt({ min: 1 }).withMessage("id_company doit être un entier positif"),
];


// 🔹 DELETE USER
export const userValidatorDelete = [

  param("id")
    .notEmpty().withMessage("L'ID est obligatoire")
    .isInt({ min: 1 }).withMessage("L'ID doit être un entier positif"),
];
