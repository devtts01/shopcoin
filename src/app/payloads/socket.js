/* eslint-disable prettier/prettier */
import {SET_PRICE_COIN_SOCKET} from '../actions';

export const setPriceCoinSocket = payload => {
  return {
    type: SET_PRICE_COIN_SOCKET,
    payload,
  };
};
