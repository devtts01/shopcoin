/* eslint-disable prettier/prettier */
import {SET_MESSAGE} from '../actions';

export const setMessage = payload => {
  return {
    type: SET_MESSAGE,
    payload,
  };
};
