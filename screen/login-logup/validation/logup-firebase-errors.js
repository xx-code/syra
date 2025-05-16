import React, {Component} from 'react';

export default function(err){
    const errors = {};

    switch(err){
        case "auth/email-already-in-use":
            errors.email = "email existe deja";
            break;
        case "auth/invalid-email":
            errors.email = "email est invalide";
            break;
        case "auth/weak-password":
            errors.password = "mot de passe incorrect";
            break;
        case "auth/user-not-found":
            errors.email = "cet utilisateur n'existe pas";
        default:
            break;
    }
    return errors;
}