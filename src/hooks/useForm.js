import { useCallback, useEffect, useMemo, useState } from "react";

export const useForm = (
  initialForm = {},
  providedValidations = {}
) => {
  const [formState, setFormState] = useState(initialForm);
  const [formValidations, setFormValidation] = useState(
    providedValidations
  );

  const onInputChange = ({ target }) => {
    const { name, value } = target;
    setFormState({
      ...formState,
      [name]: value,
      [name + "Touched"]: true,
    });
  };

  const formInvalid = useMemo(() => {
    for (const prop of Object.keys(formValidations))
      if (formValidations[prop]?.length) return true;
    return false;
  }, [formValidations]);

  const onResetForm = () => {
    setFormState(initialForm);
  };

  const createValidators = useCallback(() => {
    const formCheckedValues = {};

    for (const formField of Object.keys(providedValidations)) {
      const [validationFn, errorMsg = "This field is required"] =
        providedValidations[formField];

      formCheckedValues[`${formField}Invalid`] = validationFn(
        formState[formField]
      )
        ? errorMsg
        : null;
    }

    setFormValidation(formCheckedValues);
  }, [formState, providedValidations]);

  useEffect(() => {
    if (JSON.stringify(providedValidations) === "{}") return;
    createValidators();
  }, [createValidators, providedValidations]);

  useEffect(() => {
    if (JSON.stringify(initialForm) === "{}")
      return setFormState(initialForm);
  }, [initialForm]);

  return {
    ...formState,
    formState,
    onInputChange,
    onResetForm,
    formValidations,
    ...formValidations,
    formInvalid,
  };
};
