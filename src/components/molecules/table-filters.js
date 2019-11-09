import React from 'react';
import { Formik, Field, Form } from 'formik';
import './table-filters.css';

export const TableFilters = props => {
  const { onSubmit } = props;
  return (
    <Formik
      initialValues={{
        name: '',
        status: ''
      }}
      onSubmit={(values, { setSubmitting }) => {
        onSubmit(values);
        setSubmitting(false);
      }}
    >
      {({ isSubmitting }) =>
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
        </Form>
      }
    </Formik>
  );
};

TableFilters.defaultProps = {
  onSubmit: e => console.log(e)
};