"use client";

import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { generateValidationSchema } from "./generateValidationSchema";
import { filteredValues } from "./filteredValues";

const generateInitialValues = (items) => {
  return items.reduce((values, item) => {
    if (item.tag === "repeater") {
      values[item.name] = [generateEmptyValues(item?.form?.items)];
    } else {
      values[item.name] = "";
    }
    return values;
  }, {});
};

const generateEmptyValues = (items) => {
  return items.reduce((values, item) => {
    if (item.tag === "repeater") {
      values[item.name] = generateEmptyValues(item?.form?.items);
    } else {
      values[item.name] = "";
    }
    return values;
  }, {});
};

const checkDependency = (item, values) => {
  if (item?.depends) {
    const { name, operator, value } = item.depends;
    const dependentValue = name
      .split(".")
      .reduce((acc, key) => acc[key], values);

    if (operator === "eq" && dependentValue !== value) {
      return { ...item, hidden: true, required: false };
    }
    return { ...item, hidden: false, required: true };
  }
  return item;
};

const DynamicForm = ({
  dynamicLayoutData,
  onSubmit,
  currentStep,
  initialValues: initVals,
}) => {
  const [formItems, setFormItems] = useState(dynamicLayoutData.items);
  const [validationSchema, setValidationSchema] = useState(
    Yup.object(generateValidationSchema(dynamicLayoutData?.items, {}))
  );

  useEffect(() => {
    formik.resetForm({ values: initVals });
  }, [initVals]);

  const initialValues = generateInitialValues(formItems);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // alert(JSON.stringify(filteredValues(values), null, 2));
      console.log(filteredValues(values));
      onSubmit(filteredValues(values));
    },
  });

  useEffect(() => {
    const updateFormItems = () => {
      const updateItemsWithDependencies = (items) => {
        return items?.map((item) => {
          item = checkDependency(item, formik.values);
          if (item?.form?.items?.length > 0) {
            item.form.items = updateItemsWithDependencies(item?.form?.items);
          }
          return item;
        });
      };

      const updatedItems = updateItemsWithDependencies(formItems);

      const updateFormItems = (items, values) => {
        return items.map((item) => {
          let updatedItem = checkDependency(item, values);
          if (item.items) {
            updatedItem.items = updateFormItems(item.items, values);
          }
          return updatedItem;
        });
      };

      setFormItems(updatedItems);
      setValidationSchema(
        Yup.object(generateValidationSchema(updatedItems, formik.values))
      );
    };

    updateFormItems();
  }, [formik.values]);

  const adjustWidths = (items, innerWidth) => {
    return items.map((item) => {
      if (item.widths && typeof item.widths === "object") {
        if (innerWidth > 1440) {
          item.width = item.widths.greaterThan1440;
        } else if (innerWidth > 890 && innerWidth <= 1440) {
          item.width = item.widths.between890And1440;
        } else if (innerWidth > 600 && innerWidth <= 890) {
          item.width = item.widths.between600And890;
        } else {
          item.width = item.widths.default;
        }
      }

      // Recursively adjust widths for nested items in fieldArray
      if (item.tag === "repeater" && item.form && item.form.items) {
        item.form.items = adjustWidths(item.form.items, innerWidth);
      }

      return item;
    });
  };

  useEffect(() => {
    const handleResize = () => {
      const { innerWidth } = window;

      // Usage
      const updatedItems = adjustWidths(
        dynamicLayoutData.items,
        window.innerWidth
      );

      const updatedItemsWithValidation = updatedItems.map((item) => {
        if (item.depends) {
          const { name, operator, value } = item.depends;
          if (operator === "eq" && formik.values[name] !== value) {
            return { ...item, hidden: true, required: false };
          }
          return { ...item, hidden: false, required: true };
        }
        return item;
      });

      setFormItems(updatedItemsWithValidation);
      setValidationSchema(
        Yup.object(
          generateValidationSchema(updatedItemsWithValidation, formik.values)
        )
      );
    };

    handleResize(); // Initial setup

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [dynamicLayoutData]);

  const sortedItems = [...formItems].sort((a, b) => a.index - b.index);

  const handleAddFieldArrayItem = (name, items) => {
    const newFieldArrayItem = generateEmptyValues(items);
    formik.setFieldValue(name, [...formik.values[name], newFieldArrayItem]);
  };

  const handleRemoveFieldArrayItem = (name, index) => {
    const fieldArray = [...formik.values[name]];
    fieldArray.splice(index, 1);
    formik.setFieldValue(name, fieldArray);
  };

  const renderFields = ({ items, parentName = "", index = null }) => {
    return items.map((item) => {
      if (item?.hidden) {
        return null;
      }

      const itemName = parentName ? `${parentName}.${item.name}` : item.name;
      const splittedWidth = item?.width?.split("%")?.[0];
      const gridSingleColumnWidth = 100 / dynamicLayoutData?.grid;

      const gridColsDecorator = () => {
        const colsToSpan = Number(splittedWidth) / gridSingleColumnWidth;
        return Math.ceil(colsToSpan);
      };

      if (item.tag === "repeater") {
        return (
          <div
            key={item.index}
            style={{
              gridColumn: `span ${gridColsDecorator()}`,
            }}
            className="field-array-wrapper p-4 bg-blue-400"
          >
            <div
              className="col-span-4"
              style={{
                display: "grid",
                gridTemplateColumns: `repeat(${item.form.grid}, 1fr)`,
                gap: "1rem",
                maxWidth: "100%",
              }}
            >
              {formik.values[itemName]?.map((fieldItem, index) => (
                <div
                  className="col-span-4"
                  style={{
                    display: "grid",
                    gridTemplateColumns: `repeat(${item.form.grid}, 1fr)`,
                    gap: "1rem",
                    maxWidth: "100%",
                  }}
                  key={index}
                >
                  {renderFields({
                    items: [...item.form.items].sort(
                      (a, b) => a.index - b.index
                    ),
                    parentName: `${itemName}[${index}]`,
                    index,
                  })}
                  {formik.values[itemName]?.length > 1 ? (
                    <button
                      type="button"
                      onClick={() =>
                        handleRemoveFieldArrayItem(itemName, index)
                      }
                      className=" col-span-2 bg-red-500 text-white rounded px-2 py-1 mt-2 max-h-8 my-auto"
                    >
                      Remove
                    </button>
                  ) : null}
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={() => handleAddFieldArrayItem(itemName, item.form.items)}
              className="col-span-4 bg-green-500 text-white rounded px-2 py-1"
            >
              Add {item.placeholder}
            </button>
            {formik.touched?.[itemName] && formik.errors?.[itemName] && (
              <div style={{ color: "red" }}>
                {typeof formik.errors?.[itemName] === "string"
                  ? formik.errors?.[itemName]
                  : null}
              </div>
            )}
          </div>
        );
      }

      return (
        <div
          key={item.index}
          style={{ gridColumn: `span ${gridColsDecorator()}` }}
        >
          <label htmlFor={itemName} className={item?.labelClass}>
            {item.placeholder}
          </label>
          {item.tag === "input" && (
            <input
              type={item.type}
              name={itemName}
              placeholder={item.placeholder}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values[itemName]}
              className="p-2 border rounded w-full"
            />
          )}
          {item.tag === "textarea" && (
            <textarea
              name={itemName}
              placeholder={item.placeholder}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values[itemName]}
              className="p-2 border rounded w-full"
            />
          )}
          {item.tag === "select" && (
            <select
              name={itemName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values[itemName]}
              className="p-2 border rounded w-full"
            >
              <option value="">{item.placeholder}</option>
              {item.options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          )}
          {parentName
            ? formik.touched?.[parentName?.split("[")?.[0]]?.[index]?.[
                item?.name
              ] &&
              formik.errors?.[parentName?.split("[")?.[0]]?.[index]?.[
                item?.name
              ] && (
                <div style={{ color: "red" }}>
                  {
                    formik.errors?.[parentName?.split("[")?.[0]]?.[index]?.[
                      item?.name
                    ]
                  }
                </div>
              )
            : formik.touched?.[itemName] &&
              formik.errors?.[itemName] && (
                <div style={{ color: "red" }}>{formik.errors?.[itemName]}</div>
              )}
        </div>
      );
    });
  };

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="grid"
      style={{
        gridTemplateColumns: `repeat(${dynamicLayoutData.grid}, 1fr)`,
        gap: "1rem",
        maxWidth: "100%",
        margin: "0 auto",
      }}
    >
      {renderFields({ items: sortedItems, parentName: undefined })}
      <button
        type="submit"
        className="col-span-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        {currentStep === dynamicLayoutData.length - 1 ? "Submit" : "Next"}
      </button>
    </form>
  );
};

export default DynamicForm;
