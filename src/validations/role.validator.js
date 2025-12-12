import { body, param } from "express-validator";

export const roleValidatorCreate = [
  body("name")
    .notEmpty().withMessage("Le nom du rôle est obligatoire")
    .isString().withMessage("Le nom du rôle doit être une chaîne de caractères")
    .isLength({ min: 2 }).withMessage("Le nom du rôle doit contenir au moins 2 caractères"),
];

export const roleValidatorUpdate = [
  param("role_id")
    .notEmpty().withMessage("L'ID du rôle est obligatoire")
    .isInt({ min: 1 }).withMessage("role_id doit être un entier positif"),

  body("name")
    .optional()
    .isString().withMessage("Le nom du rôle doit être une chaîne de caractères")
    .isLength({ min: 2 }).withMessage("Le nom du rôle doit contenir au moins 2 caractères"),
];

export const roleValidatorDelete = [
  param("role_id")
    .notEmpty().withMessage("L'ID du rôle est obligatoire")
    .isInt({ min: 1 }).withMessage("role_id doit être un entier positif"),
];
