/* eslint-disable prettier/prettier */
import {coinGet} from '../utils/axios/axiosInstance';

// GET ALL COINS
export const SVgetAllCoins = async (props = {}) => {
  const resGet = await coinGet(
    `getAllCoin?page=${props.page}&show=${props.show}`,
  );
  props.dispatch(props.getAllCoins(resGet));
};
// GET COIN BY ID
export const SVgetACoin = async (props = {}) => {
  if (props.id) {
    const resGet = await coinGet(`getCoin/${props.id}`);
    props.dispatch(props.getById(resGet));
  }
};
