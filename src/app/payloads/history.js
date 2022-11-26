/* eslint-disable prettier/prettier */
import {GET_HISTORY_BUY, GET_HISTORY_SELL} from '../actions';

export const getHistoryBuy = payload => {
  return {
    type: GET_HISTORY_BUY,
    payload,
  };
};
export const getHistorySell = payload => {
  return {
    type: GET_HISTORY_SELL,
    payload,
  };
};
