import { ValidationError } from 'yup';

interface Errors {
  [key: string]: string;
}

export default function getValidadeErros(errors: ValidationError): Errors {
  const validateErrors: Errors = {};

  errors.inner.forEach(err => {
    validateErrors[err.path] = err.message;
  });

  return validateErrors;
}
