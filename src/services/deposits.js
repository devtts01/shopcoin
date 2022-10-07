/* eslint-disable prettier/prettier */
import {adminGet, userGet} from '../utils/axios/axiosInstance';

// GET ALL DEPOSITS
export const SVgetAllDeposits = async (props = {}) => {
  const resGet = await adminGet(
    `/getAllDeposit?page=${props.page}&show=${props.show}`,
  );
  props.dispatch(props.getAllDeposits(resGet));
};

// GET DEPOSITS BY EMAIL/ID USER
export const SVgetDepositsByEmailUser = async (props = {}) => {
  const resGet = await userGet(`/getAllDeposits/${props.email}`);
  props.dispatch(props.getAllDeposits(resGet?.data));
};
