import Validator from 'validator'
import isEmpty from '../../../components/utils/is-empty';

export default function validateLoginInput(data) {
  let errors = {};

  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';


  if (Validator.isEmpty(data.email)) {
    errors.email = 'Inserez votre addresse email';
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = "Addresse email invalide";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = 'Inserez votre mot de passe';
  }

  
  return {
    errors,
    isValid: isEmpty(errors)
  };
};