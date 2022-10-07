/* eslint-disable prettier/prettier */
import {GET_ALL_COIN, GET_ALL_DEPOSITS} from '../actions';

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
