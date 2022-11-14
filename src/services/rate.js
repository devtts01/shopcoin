/* eslint-disable prettier/prettier */

import {rateGet} from '../utils/axios/axiosInstance';

// GET RATE
export const SVgetRate = async (props = {}) => {
  const resGet = await rateGet('/getRate/636383900f123aac4ee95969');
  props.dispatch(props.getRate(resGet.data));
};
