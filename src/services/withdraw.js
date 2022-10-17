/* eslint-disable prettier/prettier */
import {Alert} from 'react-native';
import {
  adminGet,
  userGet,
  userPost,
  userPut,
} from '../utils/axios/axiosInstance';

// GET ALL WITHDRAW
export const SVgetAllWithdraw = async (props = {}) => {
  const resGet = await adminGet(
    `/getAllWithdraw?page=${props.page}&show=${props.show}`,
  );
  props.dispatch(props.getAllWithdraws(resGet));
};

// GET WITHDRAW BY EMAIL/ID USER
export const SVgetWithdrawByEmailUser = async (props = {}) => {
  const resGet = await userGet(`/getAllWithdraw/${props?.email}`);
  props.dispatch(props.getAllWithdraws(resGet?.data));
};

// CREATE WITHDRAW
export const SVcreateWithdraw = async (props = {}) => {
  const resPost = await userPost('/withdraw', {
    amountUsd: parseFloat(props?.amount),
    user: props?.email,
    token: props?.token,
  });
  switch (resPost.code) {
    case 0:
      props.setLoading(true);
      setTimeout(() => {
        props.setLoading(false);
        Alert.alert('Success!', 'Withdraw request was successfully!', [
          {
            text: 'OK',
            onPress: () =>
              props.navigation.navigate({
                name: 'Single Withdraw',
                params: {
                  data: resPost?.data,
                },
              }),
          },
        ]);
      }, 5000);
      break;
    case 1:
    case 2:
      props.setLoading(true);
      setTimeout(() => {
        props.setLoading(false);
        Alert.alert('Error!', 'Payment no field rateWithdarw. Result is NaN', [
          {
            text: 'OK',
            onPress: () => props.navigation.navigate('Create Withdraw'),
          },
        ]);
      }, 5000);
      break;
    default:
      break;
  }
};

// DELETE WITHDRAW
export const SVdeleteWithdraw = async (props = {}) => {};

// UPDATE DEPOSITS
export const SVupdateDeposits = async (props = {}) => {
  const resPut = await userPut(
    `/updateImageDeposit/${props.id}`,
    props?.image,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
        Accept: 'application/json',
        token: props?.token,
      },
    },
  );
  switch (resPut.code) {
    case 0:
      props.setLoading(true);
      setTimeout(() => {
        props.setLoading(false);
        Alert.alert('Success!', resPut?.message, [
          {
            text: 'OK',
            onPress: () =>
              props.navigation.navigate({
                name: 'Deposits',
                params: {
                  data: resPut?.data,
                },
              }),
          },
        ]);
      }, 5000);
      break;
  }
};
