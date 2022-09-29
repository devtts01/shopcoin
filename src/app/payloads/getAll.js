/* eslint-disable prettier/prettier */
import {GET_ALL_COIN} from '../actions';

export const getAllCoins = payload => {
  return {
    type: GET_ALL_COIN,
    payload,
  };
};
