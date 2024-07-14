import { getYupValidation } from "./getYupValidation";
import * as Yup from "yup";

export const generateValidationSchema = (items, values) => {
  const buildSchema = (items, values) => {
    return items.reduce((schema, item) => {
      let validator = getYupValidation(
        item?.validation?.type || "string",
        item?.validation?.validations || {}
      );

      if (item.required) {
        validator = validator.required(`${item.label} is required`);
      }
      if (item.depends) {
        const { name, operator, value } = item.depends;
        if (operator === "eq" && values[name] !== value) {
          return schema;
        }
        if (operator === "eq" && values[name] === value && item.required) {
          validator = validator.required(`${item.label} is required`);
        }
      }

      if (item.tag === "repeater" && item.form.items) {
        const nestedSchema = buildSchema(
          item?.form?.items,
          values[item.name] || []
        );
        validator = validator.of(Yup.object().shape(nestedSchema));
      }

      schema[item.name] = validator;
      return schema;
    }, {});
  };

  return buildSchema(items, values);
};
