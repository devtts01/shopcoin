/* eslint-disable prettier/prettier */
import {
  GET_ALL_COIN,
  GET_ALL_DEPOSITS,
  GET_ALL_WITHDRAW,
  GET_ALL_MYCOIN,
} from '../actions';

export const getAllCoins = payload => {
  return {
    type: GET_ALL_COIN,
    payload,
  };
};
export const getAllDeposits = payload => {
  return {
    type: GET_ALL_DEPOSITS,
    payload,
  };
};
export const getAllWithdraws = payload => {
  return {
    type: GET_ALL_WITHDRAW,
    payload,
  };
};
export const getAllMyCoin = payload => {
  return {
    type: GET_ALL_MYCOIN,
    payload,
  };
};
