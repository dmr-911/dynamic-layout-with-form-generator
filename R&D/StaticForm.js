"use client";

import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().required('Required'),
  friends: Yup.array().of(
    Yup.object().shape({
      name: Yup.string().required('Required'),
      age: Yup.number()
        .required('Required')
        .positive('Age must be positive')
        .integer('Age must be an integer'),
    })
  ).min(1, 'Add at least one friend'),
});

const initialValues = {
  email: '',
  password: '',
  friends: [{ name: '', age: '' }],
};

const FormComponent = () => {
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // Handle form submission
      console.log(values);
    },
  });

  const handleAddFriend = () => {
    formik.setValues({
      ...formik.values,
      friends: [...formik.values.friends, { name: '', age: '' }],
    });
  };

  const handleRemoveFriend = (index) => {
    const newFriends = [...formik.values.friends];
    newFriends.splice(index, 1);
    formik.setValues({
      ...formik.values,
      friends: newFriends,
    });
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <div>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          onChange={formik.handleChange}
          value={formik.values.email}
        />
        {formik.errors.email && formik.touched.email && (
          <div>{formik.errors.email}</div>
        )}
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          onChange={formik.handleChange}
          value={formik.values.password}
        />
        {formik.errors.password && formik.touched.password && (
          <div>{formik.errors.password}</div>
        )}
      </div>
      <div>
        <label>Friends</label>
        {formik.values.friends.map((friend, index) => (
          <div key={index}>
            <input
              type="text"
              placeholder="Name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.friends[index].name}
              name={`friends[${index}].name`}
            />
            {formik.errors.friends &&
              formik.errors.friends[index] &&
              formik.errors.friends[index].name &&
              formik.touched.friends &&
              formik.touched.friends[index] && (
                <div>{formik.errors.friends[index].name}</div>
              )}
            <input
              type="number"
              placeholder="Age"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.friends[index].age}
              name={`friends[${index}].age`}
            />
            {formik.errors.friends &&
              formik.errors.friends[index] &&
              formik.errors.friends[index].age &&
              formik.touched.friends &&
              formik.touched.friends[index] && (
                <div>{formik.errors.friends[index].age}</div>
              )}
            {index > 0 && (
              <button type="button" onClick={() => handleRemoveFriend(index)}>
                Remove
              </button>
            )}
          </div>
        ))}
        <button type="button" onClick={handleAddFriend}>
          Add Friend
        </button>
        {formik.errors.friends && formik.touched.friends && !formik.values.friends.length && (
          <div>{formik.errors.friends}</div>
        )}
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default FormComponent;


