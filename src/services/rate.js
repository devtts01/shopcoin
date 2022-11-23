/* eslint-disable prettier/prettier */

import {adminGet, userGet} from '../utils/axios/axiosInstance';

// GET RATE
export const SVgetRate = async (props = {}) => {
  const resGet = await adminGet('/getRate');
  props.dispatch(props.getRate(resGet.data));
};
// GET RATE DEPOSIT/WITHDRAW
export const SVgetRateDepositWithdraw = async (props = {}) => {
  const resGet = await userGet(`/getRate/${props.numberBank}`);
  props.dispatch(props.getRateDepositWithdraw(resGet.data));
};
