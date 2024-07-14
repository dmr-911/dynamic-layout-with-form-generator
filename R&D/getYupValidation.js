import * as Yup from "yup";

export const getYupValidation = (schemaType, validation) => {
  let validator;

  switch (schemaType) {
    case "string":
      validator = Yup.string();
      break;
    case "number":
      validator = Yup.number();
      break;
    case "array":
      validator = Yup.array();
      break;
    case "object":
      validator = Yup.object();
      break;
    case "boolean":
      validator = Yup.boolean();
      break;
    default:
      validator = Yup.string();
      break;
  }

  Object.entries(validation).forEach(([rule, value]) => {
    switch (rule) {
      case "required":
        validator = validator.required(value.message || "Field is required");
        break;
      case "minLength":
        validator = validator.min(value.value, value.message);
        break;
      case "maxLength":
        validator = validator.max(value.value, value.message);
        break;
      case "oneOf":
        validator = validator.oneOf(value, value.message || "Invalid value");
        break;
      case "email":
        validator = validator.email(value.message || "Invalid email address");
        break;
      case "matches":
        validator = validator.matches(
          value.regex,
          value.message || "Invalid format"
        );
        break;
      case "length":
        validator = validator.length(value.value, value.message);
        break;
      case "min":
        validator = validator.min(value.value, value.message);
        break;
      case "max":
        validator = validator.max(value.value, value.message);
        break;
      case "lessThan":
        validator = validator.lessThan(value.value, value.message);
        break;
      case "moreThan":
        validator = validator.moreThan(value.value, value.message);
        break;
      case "positive":
        validator = validator.positive(
          value.message || "Must be a positive number"
        );
        break;
      case "negative":
        validator = validator.negative(
          value.message || "Must be a negative number"
        );
        break;
      default:
        break;
    }
  });

  return validator;
};
