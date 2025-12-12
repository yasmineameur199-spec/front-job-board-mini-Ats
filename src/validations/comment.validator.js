import { body, param } from "express-validator";

//
// 🔹 VALIDATION POUR CRÉER UN COMMENTAIRE
//
export const commentValidatorCreate = [

    body("body") // ou "text" selon votre modèle
        .notEmpty().withMessage("Le contenu du commentaire est obligatoire")
        .isString().withMessage("Le contenu doit être une chaîne de caractères"),

    body("id_user") // L'auteur du commentaire
        .notEmpty().withMessage("id_user est obligatoire")
        .isInt({ min: 1 }).withMessage("id_user doit être un entier positif"),
    
    // 'commented_at' est souvent géré automatiquement par la BDD, 
    // mais si vous l'envoyez manuellement, ajoutez la validation ici.
];

//
// 🔹 VALIDATION POUR METTRE À JOUR UN COMMENTAIRE
//
export const commentValidatorUpdate = [

    param("id")
        .notEmpty().withMessage("L'ID du commentaire est obligatoire")
        .isInt({ min: 1 }).withMessage("L'ID doit être un entier positif"),

    body("body")
        .optional()
        .isString().withMessage("Le contenu doit être une chaîne de caractères")
        .isLength({ min: 1 }).withMessage("Le commentaire ne peut pas être vide"),
];

//
// 🔹 VALIDATION POUR SUPPRIMER UN COMMENTAIRE
//
export const commentValidatorDelete = [

    param("id")
        .notEmpty().withMessage("L'ID du commentaire est obligatoire")
        .isInt({ min: 1 }).withMessage("L'ID doit être un entier positif"),
];