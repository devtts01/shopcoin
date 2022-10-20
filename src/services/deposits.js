/* eslint-disable prettier/prettier */
import {Alert} from 'react-native';
import {
  adminGet,
  userGet,
  userPost,
  userPut,
} from '../utils/axios/axiosInstance';

// GET ALL DEPOSITS
export const SVgetAllDeposits = async (props = {}) => {
  const resGet = await adminGet(
    `/getAllDeposit?page=${props.page}&show=${props.show}`,
  );
  props.dispatch(props.getAllDeposits(resGet));
};

// GET DEPOSITS BY EMAIL/ID USER
export const SVgetDepositsByEmailUser = async (props = {}) => {
  const resGet = await userGet(`/getAllDeposits/${props?.email}`);
  props.dispatch(props.getAllDeposits(resGet?.data));
};

// CREATE DEPOSITS
export const SVcreateDeposits = async (props = {}) => {
  const resPost = await userPost('/deposit', {
    amount: props?.amount,
    user: props?.email,
    amountVnd: props.amountVnd,
    token: props?.token,
  });
  switch (resPost.code) {
    case 0:
      props.setLoading(true);
      setTimeout(() => {
        props.setLoading(false);
        Alert.alert('Success!', 'Deposits request was successfully!', [
          {
            text: 'OK',
            onPress: () =>
              props.navigation.navigate({
                name: 'Single Deposits',
                params: {
                  data: resPost?.data,
                },
              }),
          },
        ]);
        props.dispatch(
          props.setFormDeposits({
            amountUSDT: '',
            bank: '',
          }),
        );
      }, 5000);
      break;
    default:
      break;
  }
};
// UPDATE DEPOSITS
export const SVupdateDeposits = async (props = {}) => {
  const resPut = await userPut(
    `/updateImageDeposit/${props.id}`,
    props?.image,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
        // Accept: 'application/json',
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
