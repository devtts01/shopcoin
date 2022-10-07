/* eslint-disable prettier/prettier */
import {userGet} from '../utils/axios/axiosInstance';

// GET BUY HISTORY
export const SVgetBuyHistory = async (props = {}) => {
  const resGet = await userGet(`/getAllBuy/${props.id}`);
  props.dispatch(props.getHistoryBuy(resGet?.data));
};
// GET SELL HISTORY
export const SVgetSellHistory = async (props = {}) => {
  const resGet = await userGet(`/getAllSell/${props.id}`);
  props.dispatch(props.getHistorySell(resGet?.data));
};
