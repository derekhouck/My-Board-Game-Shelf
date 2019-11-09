import React from 'react';
import { Formik, Field, Form } from 'formik';
import './table-filters.css';

export const TableFilters = props => {
  const { onSubmit } = props;
  const initialValues = {
    name: '',
    status: ''
  }
  return (
    <Formik
      initialValues={initialValues}
      onReset={(values, { setSubmitting }) => {
        onSubmit(initialValues);
        setSubmitting(false);
      }}
      onSubmit={(values, { setSubmitting }) => {
        onSubmit(values);
        setSubmitting(false);
      }}
    >
      {({
        handleReset,
        isSubmitting
      }) =>
        <Form
          className="table-filters"
        >
          <div>
            <label htmlFor="name">Name: </label>
            <Field
              id="name"
              name="name"
              type="text"
            />
          </div>
          <div>
            <label htmlFor="status">Status: </label>
            <Field
              as="select"
              id="status"
              name="status"
            >
              <option value="">any</option>
              <option>pending</option>
              <option>approved</option>
              <option>rejected</option>
            </Field>
          </div>
          <button type="submit" disabled={isSubmitting}>
            Filter
          </button>
          <button
            onClick={handleReset}
            type="reset" disabled={isSubmitting}>
            Reset
          </button>
        </Form>
      }
    </Formik>
  );
};

TableFilters.defaultProps = {
  onSubmit: e => console.log(e)
};