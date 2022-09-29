/* eslint-disable prettier/prettier */
import {GET_BY_ID} from '../actions';

export const getById = payload => {
  return {
    type: GET_BY_ID,
    payload,
  };
};
