/* eslint-disable prettier/prettier */
import {
  SET_FORM,
  SET_AMOUNT_COIN,
  SET_AMOUNT_SELL,
  SET_FORM_DEPOSITS_VALUE,
  SET_FORM_WITHDRAW_VALUE,
  SET_FORM_PROFILE_PAYMENT_VALUE,
  SET_AMOUNT_USDT,
  SET_CODE_VALUE,
} from '../actions';

export const setFormValue = payload => {
  return {
    type: SET_FORM,
    payload,
  };
};
export const setAmountCoin = payload => {
  return {
    type: SET_AMOUNT_COIN,
    payload,
  };
};
export const setAmountSell = payload => {
  return {
    type: SET_AMOUNT_SELL,
    payload,
  };
};
export const setFormDeposits = payload => {
  return {
    type: SET_FORM_DEPOSITS_VALUE,
    payload,
  };
};
export const setAmountUsdt = payload => {
  return {
    type: SET_AMOUNT_USDT,
    payload,
  };
};
export const setCodeValue = payload => {
  return {
    type: SET_CODE_VALUE,
    payload,
  };
};
export const setFormWithdraw = payload => {
  return {
    type: SET_FORM_WITHDRAW_VALUE,
    payload,
  };
};
export const setFormProfilePayment = payload => {
  return {
    type: SET_FORM_PROFILE_PAYMENT_VALUE,
    payload,
  };
};
