import { API_BASE_URL } from "../config";
import { normalizeResponseErrors } from "./utils";
import { SubmissionError } from 'redux-form';

export const TAGS_ERROR = 'TAGS_ERROR';
export const tagsError = error => ({
  type: TAGS_ERROR,
  error
});

export const editTag = tag => (dispatch, getState) => {
  const authToken = getState().auth.authToken;
  const url = new URL(`${API_BASE_URL}/tags/${tag.id}`);

  return fetch(url, {
    method: 'PUT',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${authToken}`
    },
    body: JSON.stringify(tag)
  })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .catch(err => {
      const { reason, message, location } = err;
      if (reason === 'ValidationError') {
        // Convert ValidationErrors into SubmissionErrors for Redux Form
        return Promise.reject(
          new SubmissionError({
            [location]: message
          })
        );
      }
    });
};

export const fetchTag = tagId => (dispatch, getState) => {
  const authToken = getState().auth.authToken;
  const url = new URL(`${API_BASE_URL}/tags/${tagId}`);

  return fetch(url, {
    headers: {
      Authorization: `Bearer ${authToken}`
    }
  })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .catch(err => dispatch(tagsError(err)));
};