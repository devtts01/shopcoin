/* eslint-disable prettier/prettier */
import {
  GET_BY_ID,
  GET_USER_BY_ID,
  SET_USER_BY_ID_EMAIL,
  GET_BY_SYMBOL,
  SET_RATE_VALUE,
} from '../actions';

export const getById = payload => {
  return {
    type: GET_BY_ID,
    payload,
  };
};
export const getUserById = payload => {
  return {
    type: GET_USER_BY_ID,
    payload,
  };
};
export const setUserIdEmail = payload => {
  return {
    type: SET_USER_BY_ID_EMAIL,
    payload,
  };
};
export const getBySymbol = payload => {
  return {
    type: GET_BY_SYMBOL,
    payload,
  };
};
export const getRate = payload => {
  return {
    type: SET_RATE_VALUE,
    payload,
  };
};
