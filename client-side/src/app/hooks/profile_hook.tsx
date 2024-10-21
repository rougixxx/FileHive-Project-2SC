import { useState } from "react";

interface FormValues {
  firstName: string;
  lastName: string;
}

const useEditProfileValidation = ({
  initialValues,
}: {
  initialValues: FormValues;
}) => {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormValues>({
    firstName: "",
    lastName: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validate = (valuesToValidate: FormValues) => {
    let valid = true;
    let newErrors = { ...errors };

    // Validate first name
    if (valuesToValidate.firstName.trim() === "") {
      newErrors.firstName = "First name is required";
      valid = false;
    } else {
      newErrors.firstName = "";
    }

    // Validate last name
    if (valuesToValidate.lastName.trim() === "") {
      newErrors.lastName = "Last name is required";
      valid = false;
    } else {
      newErrors.lastName = "";
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

export default useEditProfileValidation;
