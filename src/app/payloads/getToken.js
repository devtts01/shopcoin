/* eslint-disable prettier/prettier */
import {SET_TOKEN_FORGOT_PASSWORD} from '../actions';

export const getTokenForgotPwd = payload => {
  return {
    type: SET_TOKEN_FORGOT_PASSWORD,
    payload,
  };
};
