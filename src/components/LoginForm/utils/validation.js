export const validationProps = (fieldName, errors, touched) => {
  const isTouched = touched[fieldName];
  const fieldErrors = errors[fieldName];

  if (fieldErrors && isTouched) {
    return {
      hasFeedback: true,
      help: fieldErrors,
      validateStatus: 'error',
    };
  }

  if (isTouched) {
    return {
      hasFeedback: true,
      validateStatus: 'success',
    };
  }

  return null;
};

export const validateForm = values => {
  const errors = {};

  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  if (!values.password) {
    errors.password = 'Required';
  } else if (values.password.length < 6) {
    errors.password = 'Minimum password size is 6';
  }

  return errors;
};
