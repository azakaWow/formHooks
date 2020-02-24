import React from 'react';

export default function useFormErrors(initFormErrors, initFormData, formData, makeFieldValidator) {
  const [formErrors, setFormErrors] = React.useState(() => initFormErrors(initFormData));

  const fieldValidator = React.useMemo(() => makeFieldValidator(initFormData), [initFormData, makeFieldValidator]);

  const updateFormErrors = React.useCallback((fieldName, fieldValue) => {
    setFormErrors((prevState) => ({ ...prevState, ...{ [fieldName]: fieldValidator(fieldName, fieldValue) } }));
  }, [fieldValidator]);

  const remakeForm = React.useCallback((newInitFormData) => {
    setFormErrors(initFormErrors(newInitFormData));
  }, [initFormErrors]);

  const checkForm = React.useCallback(() => {
    let isFormValid = true;
    let newFormErrors = {};
    for (let fieldName in formErrors) {
      if (formErrors.hasOwnProperty(fieldName)) {
        let fieldValue = formData[fieldName];
        let checkResult = fieldValidator(fieldName, fieldValue);
        newFormErrors[fieldName] = {
          isValid: checkResult.isValid,
          errorMessage: checkResult.errorMessage,
        };
        if (!checkResult.isValid) {
          isFormValid = false;
        }
      }
    }
    setFormErrors(newFormErrors);
    return isFormValid;
  }, [formErrors, fieldValidator, formData]);

  return [
    formErrors,
    updateFormErrors,
    setFormErrors,
    checkForm,
    remakeForm,
  ];
};
