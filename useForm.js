import React from 'react';

export default function useForm(initForm) {
  const [formData, setFormData] = React.useState(initForm);
  const updateForm = React.useCallback((value) => {
    setFormData((prevState) => ({ ...prevState, ...value }));
  }, []);
  return [formData, updateForm, setFormData];
};
