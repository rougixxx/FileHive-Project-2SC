import { useState } from "react";

interface FormValues {
  email: string;
}

const useForgotEmailFormValidation = (initialValues: FormValues) => {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormValues>({ ...initialValues });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validate = (valuesToValidate: FormValues) => {
    let valid = true;
    let newErrors = { ...errors };

    // Validate email
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(valuesToValidate.email)) {
      newErrors.email = "Invalid email";
      valid = false;
    } else {
      newErrors.email = "";
    }


    setErrors(newErrors);
    setIsSubmitted(true)
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

export default useForgotEmailFormValidation;
