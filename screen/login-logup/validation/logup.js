import React, {Component} from 'react';
import Validator from 'validator';
import isEmpty from '../../../components/utils/is-empty';

export default function validateLoginInput(data) {
  let errors = {};

  data.email = !isEmpty(data.email) ? data.email : '';
  data.pseudo = !isEmpty(data.pseudo) ? data.pseudo : '';
  data.password = !isEmpty(data.password) ? data.password : '';
  data.password2 = !isEmpty(data.password2) ? data.password2 : '';

  if (Validator.isEmpty(data.email)) {
    errors.email = 'Inserez votre addresse email';
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = "Addresse email invalide";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = 'Inserez un mot de passe';
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = 'Le mot de passe doit avoir au moins 6 caractère';
  }
  
  if (Validator.isEmpty(data.password2)) {
    errors.password2 = 'Inserez votre mot de passe de confirmation';
  }

  if (Validator.isEmpty(data.pseudo)) {
    errors.pseudo = 'Inserez un pseudo';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};