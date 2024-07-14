
import { useFormik } from 'formik';
import * as Yup from 'yup';

const Step2 = ({ onNext, formData, onSkip }) => {
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      assetType: formData.assetType || ''
    },
    validationSchema: Yup.object({
      //   assetType: Yup.string().required('Asset type is required')
    }),
    onSubmit: (values) => {
      onNext(values);
    }
  });

  return (
    <form onSubmit={formik.handleSubmit} className="p-4">
      <h2 className="text-xl font-bold">Assets Type</h2>
      <div className="mt-2">
        <label>
          {/* <HtmlEl
            atom={false}
            element="csRadio"
            type="radio"
            name="assetType"
            value="Real Estate Equity"
            checked={formik.values.assetType === 'Real Estate Equity'}
            onChange={formik.handleChange}
            content="Real Estate Equity"
            // contentPosition="left"
            // contentClasses="w-40"
          /> */}
        </label>
        <label className="ml-4">
          <input
            type="radio"
            name="assetType"
            value="Loan Instrument"
            checked={formik.values.assetType === 'Loan Instrument'}
            onChange={formik.handleChange}
          />
          Loan Instrument
        </label>
      </div>
      {formik.touched.assetType && formik.errors.assetType ? (
        <div className="text-red-500 mt-2">{formik.errors.assetType}</div>
      ) : null}
      <div className="mt-4">
        <button type="button" onClick={onSkip} className="p-2 bg-gray-500 text-white rounded">
          Skip
        </button>
        <button type="submit" className="mr-2 p-2 bg-blue-500 text-white rounded">
          Continue
        </button>
      </div>
    </form>
  );
};

export default Step2;
