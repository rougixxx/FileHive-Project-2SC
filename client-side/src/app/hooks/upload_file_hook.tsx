import { useState } from "react";

interface FormValues {
  title: string;
  file: any;
}

const useUploadFile = (initialValues: FormValues) => {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormValues>({ ...initialValues });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validate = (valuesToValidate: FormValues) => {
    let valid = true;
    let newErrors = { ...errors };

    // Validate password
    if (valuesToValidate.title.trim() === "") {
      newErrors.title = "Title is required";
      valid = false;
    } else if (valuesToValidate.title.length < 3) {
      newErrors.title = "Title too short";
      valid = false;
    } else {
      newErrors.title = "";
    }
    // Validate password
    if (valuesToValidate.file === null) {
      newErrors.file = "File is required";
      valid = false;
    } else {
      newErrors.file = null;
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

export default useUploadFile;
