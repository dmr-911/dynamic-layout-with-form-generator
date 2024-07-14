export const filteredValues = (values) => {
  console.log("values", values);
  let newValues = {};
  Object.keys(values).forEach((key) => {
    if (Array.isArray(values[key])) {
      console.log("into array");
      newValues[key] = values[key].map((mappedValues) =>
        filteredValues(mappedValues)
      );
    }

    if (values[key] && !Array.isArray(values[key])) {
      newValues[key] = values[key];
    }
  });

  return newValues;
};
