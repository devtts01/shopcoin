/* eslint-disable prettier/prettier */
import {Alert} from 'react-native';
import {
  adminGet,
  userGet,
  userPost,
  userPut,
} from '../utils/axios/axiosInstance';
import {routersMain} from '../routers/Main';
import {routers} from '../routers/Routers';

// GET ALL DEPOSITS
export const SVgetAllDeposits = async (props = {}) => {
  const resGet = await adminGet(
    `/getAllDeposit?page=${props.page}&show=${props.show}`,
  );
  props.dispatch(props.getAllDeposits(resGet));
};

// GET DEPOSITS BY EMAIL/ID USER
export const SVgetDepositsByEmailUser = async (props = {}) => {
  const resGet = await userGet(`/getPaymentByEmail/${props?.email}`);
  props.dispatch(props.getAllDeposits(resGet?.data));
};

// CREATE DEPOSITS
export const SVcreateDeposits = async (props = {}) => {
  const resPost = await userPost(`/BuyUSD/${props?.id}`, {
    amountUSD: props?.amount,
    user: props?.id,
    amountVnd: props.amountVnd,
    bankAdmin: props?.bankAdmin,
    token: props?.token,
  });
  switch (resPost.code) {
    case 0:
      props.setLoading(true);
      props.setIsProcess(false);
      setTimeout(() => {
        props.setLoading(false);
        Alert.alert('Success!', 'Deposits request was successfully!', [
          {
            text: 'OK',
            onPress: () =>
              props.navigation.navigate({
                name: routersMain.SingleDeposits,
                params: {
                  data: resPost?.data,
                  bankAdmin: props?.bankAdmin,
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
      }, 3000);
      break;
    case 1:
    case 2:
      props.setLoading(true);
      props.setIsProcess(false);
      setTimeout(() => {
        props.setLoading(false);
        Alert.alert(
          'Error!',
          'You have no payment yet. Please update your payment before making a deposit',
          [
            {
              text: 'OK',
              onPress: () => {
                props.navigation.navigate(routersMain.ProfilePayment);
              },
            },
          ],
        );
      }, 3000);
      break;
    default:
      break;
  }
};
// UPDATE DEPOSITS
export const SVupdateDeposits = async (props = {}) => {
  const object = {
    imageDeposit: props?.image,
  };
  const resPut = await userPut(
    `/additionImageDeposit/${props.id}`,
    {
      ...object,
      bankAdmin: props?.bankAdmin,
    },
    {
      headers: {
        // 'Content-Type': 'multipart/form-data',
        token: props?.token,
      },
    },
  );
  switch (resPut.code) {
    case 0:
      props.setLoading(true);
      props.setIsProcess(false);
      setTimeout(() => {
        props.setLoading(false);
        Alert.alert('Success!', resPut?.message, [
          {
            text: 'OK',
            onPress: async () => {
              props.navigation.navigate({
                name: routers.Home,
                params: {
                  data: resPut?.data,
                },
              });
              const resGet = await userGet(
                `/getPaymentByEmail/${props?.email}`,
              );
              props.dispatch(props.getAllDeposits(resGet?.data));
            },
          },
        ]);
      }, 3000);
      break;
    case 1:
    case 2:
      props.setLoading(true);
      props.setIsProcess(false);
      setTimeout(() => {
        props.setLoading(false);
        Alert.alert('Erroe!', resPut?.message, [
          {
            text: 'OK',
            onPress: () => {},
          },
        ]);
      }, 3000);
      break;
  }
};
