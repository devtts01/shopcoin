/* eslint-disable prettier/prettier */
import {coinGet, userGet} from '../utils/axios/axiosInstance';

// GET ALL COINS
export const SVgetAllCoins = async (props = {}) => {
  const resGet = await coinGet(
    props.page && props.show
      ? `getAllCoin?page=${props.page}&show=${props.show}`
      : '/getAllCoin',
  );
  props.dispatch(props.getAllCoins(resGet));
};
// GET COIN BY ID
export const SVgetACoin = async (props = {}) => {
  if (props.id) {
    const resGet = await coinGet(`/getCoin/${props.id}`);
    props.dispatch(props.getById(resGet?.data));
  }
};
// GET ALL MY COIN
export const SVgetAllMyCoin = async (props = {}) => {
  const resGet = await userGet(`/getAllCoinOfUser/${props.id}`);
  props.dispatch(props.getAllMyCoin(resGet?.data));
};
// GET COIN BY SYMBOL
export const SVgetCoinBySymbol = async (props = {}) => {
  if (props.symbol) {
    const resGet = await coinGet(`/getCoinSymbol/${props.symbol}`);
    props.dispatch(props.getBySymbol(resGet?.data));
  }
};
