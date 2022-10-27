/* eslint-disable prettier/prettier */ routers;
import {Alert} from 'react-native';
import {
  adminGet,
  userDelete,
  userGet,
  userPost,
  userPut,
} from '../utils/axios/axiosInstance';
import {routersMain} from '../routers/Main';
import {routers} from '../routers/Routers';

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
                name: routersMain.SingleWithdraw,
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
            onPress: () =>
              props.navigation.navigate(routersMain.CreateWithdraw),
          },
        ]);
      }, 5000);
      break;
    default:
      break;
  }
};

// CHECK CODE
export const SVcheckCode = async (props = {}) => {
  const resGet = await userGet(`/enterOTPWithdraw/${props?.code}`, {
    code: props?.code,
    headers: {
      token: props?.token,
    },
  });
  switch (resGet.code) {
    case 0:
      props.setLoading(true);
      setTimeout(() => {
        props.setLoading(false);
        Alert.alert('Success!', resGet?.message, [
          {
            text: 'OK',
            onPress: () => props.navigation.navigate(routers.Withdraw),
          },
        ]);
      }, 5000);
      break;
    case 1:
    case 2:
      props.setLoading(true);
      setTimeout(() => {
        props.setLoading(false);
        Alert.alert('Error!', resGet?.message, [
          {
            text: 'OK',
            onPress: () =>
              props.navigation.navigate(routersMain.CreateWithdraw),
          },
        ]);
      }, 5000);
      break;
    default:
      break;
  }
};

// DELETE WITHDRAW
export const SVdeleteWithdraw = async (props = {}) => {
  const resDel = await userDelete(`/cancelWithdraw/${props.id}`);
  console.log(resDel);
  switch (resDel.code) {
    case 0:
      props.setLoading(true);
      setTimeout(() => {
        props.setLoading(false);
        props.navigation.navigate(routers.Withdraw);
      }, 5000);
      break;
    case 1:
    case 2:
      props.setLoading(true);
      setTimeout(() => {
        props.setLoading(false);
        Alert.alert('Error!', resDel?.message, [
          {
            text: 'OK',
            onPress: () =>
              props.navigation.navigate(routersMain.SingleWithdraw),
          },
        ]);
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
                name: routers.Deposits,
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
