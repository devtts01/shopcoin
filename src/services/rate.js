/* eslint-disable prettier/prettier */

import {rateGet, userGet} from '../utils/axios/axiosInstance';

// GET RATE
export const SVgetRate = async (props = {}) => {
  const resGet = await rateGet('/getRate/636383900f123aac4ee95969');
  props.dispatch(props.getRate(resGet.data));
};
// GET RATE DEPOSIT/WITHDRAW
export const SVgetRateDepositWithdraw = async (props = {}) => {
  console.log(props);
  const resGet = await userGet(`/getRate/${props.numberBank}`);
  props.dispatch(props.getRateDepositWithdraw(resGet.data));
};
