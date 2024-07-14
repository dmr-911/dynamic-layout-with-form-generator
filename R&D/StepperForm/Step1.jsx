import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import * as Yup from 'yup';

const Step1 = ({ onNext, formData }) => {
  const [choice, setChoice] = useState(formData.choice || []);

  useEffect(() => {
    setChoice(formData.choice || []);
  }, []);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      introduction: formData?.introduction || '',
      email: formData?.email || '',
      password: formData?.password || '',
      choice: formData?.choice || []
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid Email').required('Required'),
      password: Yup.string().required('Password is required'),
      introduction: Yup.string().required('Introduction is required'),
      choice: Yup.array()
    }),
    onSubmit: (values) => {
      console.log(values);
      onNext(values);
    }
  });

  return (
    <form onSubmit={formik.handleSubmit} className="p-4">
      <HtmlEl atom tagName="div">
        <HtmlEl atom tagName="label" htmlFor="email">
          Email
          <HtmlEl
            atom={false}
            // tagName="textarea"
            element="csEmail"
            name="email"
            id="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            errors={formik.errors.email}
            // className="mt-2 p-2 border border-gray-300 rounded w-full"
          />
        </HtmlEl>
      </HtmlEl>

      <HtmlEl
        atom={false}
        element="csSelect"
        name="choice"
        selectItems={['Option 1', 'Option 2', 'Option 3']}
        isError={
          !formik.values.choice?.length && formik.touched.choice && formik.errors.choice
            ? true
            : false
        }
        getValue={(value) => {
          console.log(value, 'value');
          formik.setFieldValue('choice', value);
        }}
        placeholderText={choice}
        multiSelect={true}
        className="w-full"
        label="Select an option"
      />

      <HtmlEl atom tagName="div">
        <HtmlEl atom tagName="label" htmlFor="password">
          Password
          <HtmlEl
            atom={false}
            // tagName="textarea"
            element="csPassword"
            name="password"
            id="password"
            formik={formik}
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            // className="mt-2 p-2 border border-gray-300 rounded w-full"
          />
        </HtmlEl>
        {formik.touched.password && formik.errors.password ? (
          <div className="text-red-500 mt-2">{formik.errors.password}</div>
        ) : null}
      </HtmlEl>
      <HtmlEl atom tagName="div">
        <HtmlEl atom tagName="label" htmlFor="introduction">
          Introduction
          <HtmlEl
            atom
            tagName="textarea"
            name="introduction"
            id="introduction"
            value={formik.values.introduction}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="mt-2 p-2 border border-gray-300 rounded w-full"
            rows="4"
          />
        </HtmlEl>
        {formik.touched.introduction && formik.errors.introduction ? (
          <div className="text-red-500 mt-2">{formik.errors.introduction}</div>
        ) : null}
      </HtmlEl>
      <HtmlEl
        atom
        tagName="button"
        variant="outlined"
        type="submit"
        // className="hover:bg-blue-500 hover:text-white"
      >
        Continue
      </HtmlEl>
    </form>
  );
};

export default Step1;
