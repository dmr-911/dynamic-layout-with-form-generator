import { useFormik } from "formik";
import * as Yup from "yup";

const Step3 = ({ onNext, formData, onSubmit }) => {
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      assetValue: formData.assetValue || "",
    },
    validationSchema: Yup.object({
      assetValue: Yup.string().required("Asset value is required"),
    }),
    onSubmit: (values) => {
      onSubmit(values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="p-4">
      <h2 className="text-xl font-bold">Asset Value</h2>
      {/* <HtmlEl
        atom={false}
        element="csNumber"
        // type="text"
        formik={formik}
        name="assetValue"
        value={formik.values.assetValue}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        className="mt-2 p-2 border border-gray-300 rounded w-full"
      />
      {formik.touched.assetValue && formik.errors.assetValue ? (
        <div className="text-red-500 mt-2">{formik.errors.assetValue}</div>
      ) : null} */}
      <button type="submit" className="mt-4 p-2 bg-blue-500 text-white rounded">
        Submit
      </button>
    </form>
  );
};

export default Step3;
