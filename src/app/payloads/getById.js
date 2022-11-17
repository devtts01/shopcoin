/* eslint-disable prettier/prettier */
import {
  GET_BY_ID,
  GET_USER_BY_ID,
  GET_PAYMENT_ADMIN_BY_ID,
  SET_USER_BY_ID_EMAIL,
  GET_BY_SYMBOL,
  SET_RATE_VALUE,
  SET_RATE_DEPOSIT_WITHDRAW_VALUE,
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
export const getRateDepositWithdraw = payload => {
  return {
    type: SET_RATE_DEPOSIT_WITHDRAW_VALUE,
    payload,
  };
};
export const getPaymentAdminById = payload => {
  return {
    type: GET_PAYMENT_ADMIN_BY_ID,
    payload,
  };
};
