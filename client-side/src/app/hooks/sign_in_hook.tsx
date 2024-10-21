import { useState } from "react";

interface FormValues {
  email: string;
  password: string;
}

const useSignInFormValidation = (initialValues: FormValues) => {
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


    // Validate password
    if (valuesToValidate.password.trim() === "") {
      newErrors.password = "Password is required";
      valid = false;
    } else if (valuesToValidate.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      valid = false;
    } else {
      newErrors.password = "";
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

export default useSignInFormValidation;
