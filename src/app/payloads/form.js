/* eslint-disable prettier/prettier */
import {SET_FORM} from '../actions';

export const setFormValue = payload => {
  return {
    type: SET_FORM,
    payload,
  };
};
