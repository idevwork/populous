export const validateLogin = values => {
  const errors = {};
  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }
  if(!values.password) {
    errors.password = 'Required';
  }
  return errors;
};

export const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email address'
    : undefined;

export const currencyToken = values => {
  const errors = {};
  if (!values.currency || values.currency === "") {
    errors.currency = 'Required';
  }
  if (!values.amount) {
    errors.amount = 'Required';
  }
  if (values.amount <= 0) {
    errors.amount = 'Please enter an amount greater than 0.';
  }
  return errors;
};

export const validateResetPassword = values => {
  const errors = {};
  if (!values.password) {
    errors.password = 'Required';
  }
  if(values.password){
    const regularExpression  = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}/;

    if(!regularExpression.test(values.password)){
      errors.password = 'Too weak';
    }
  }
  if (values.passwordConfirm !== values.password) {
    errors.passwordConfirm = 'Password doesn\'t match';
  }
  if (!values.passwordConfirm) {
    errors.passwordConfirm = 'Required';
  }
  return errors;
};

export const validateCreateCurrency = values => {
  const errors = {};
  if (!values.symbol || values.symbol.trim() === "") {
    errors.symbol = 'Required';
  }
  if (!values.title || values.title.trim() === "") {
    errors.title = 'Required';
  }

  if (values.symbol === "PPT" || values.symbol === "PPTp") {
    errors.symbol = 'Invalid value';
  }

  if (values.title === "PPT" || values.title === "PPTp") {
    errors.title = 'Invalid value';
  }

  return errors;
};

export const validateTransferToken = values => {
  const errors = {};
  if (!values.currency || values.currency === "") {
    errors.currency = 'Required';
  }
  if (!values.amount) {
    errors.amount = 'Required';
  }
  if (values.amount <= 0) {
    errors.amount = 'Please enter an amount greater than 0.';
  }
  if (!values.fromAccount) {
    errors.fromAccount = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.fromAccount)) {
    errors.fromAccount = 'Invalid email address';
  }
  if (!values.toAccount) {
    errors.toAccount = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.toAccount)) {
    errors.toAccount = 'Invalid email address';
  }
  return errors;
};

export const validateDebtorForm = values => {
  const errors = {};
  if (!values.debtorName) {
    errors.debtorName = 'Required';
  }
  if(!values.country) {
    errors.country = 'Required';
  }
  if(!values.companyNumber) {
    errors.companyNumber = 'Required';
  }
  return errors;
};
