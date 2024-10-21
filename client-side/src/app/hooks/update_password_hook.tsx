import { useState } from "react";

interface FormValues {
  password: string;
  newPassword: string;
}

const useUpdatePasswordFormValidation = (initialValues: FormValues) => {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormValues>({ ...initialValues });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validate = (valuesToValidate: FormValues) => {
    let valid = true;
    let newErrors = { ...errors };

    // Validate password
    if (valuesToValidate.password.trim() === "") {
      newErrors.password = "Current password is required";
      valid = false;
    } else if (valuesToValidate.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      valid = false;
    } else {
      newErrors.password = "";
    }

    // Validate confirm password
    if (valuesToValidate.newPassword.trim() === "") {
      newErrors.newPassword = "This field is required";
      valid = false;
    } else if (valuesToValidate.newPassword.length < 6) {
      newErrors.newPassword = "New password must be at least 6 characters";
      valid = false;
    } else {
      newErrors.newPassword = "";
    }

    setErrors(newErrors);
    setIsSubmitted(true);
    return valid;
  };

  const handleChange = (field: keyof FormValues, value: string) => {
    const newValues = {
      ...values,
      [field]: value,
    };

    setValues(newValues);
    if (isSubmitted) {
      validate(newValues);
    }
  };

  return { handleChange, values, validate, errors };
};

export default useUpdatePasswordFormValidation;
