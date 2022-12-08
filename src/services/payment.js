/* eslint-disable prettier/prettier */
import {Alert} from 'react-native';
import {adminGet, userPut} from '../utils/axios/axiosInstance';
import {routersMain} from '../routers/Main';

// ADD BANK INFO
export const addBankInfo = async (props = {}) => {
  console.log(props);
  const resPut = await userPut(`/additionBankInfo/${props.id}`, {
    bankName: props?.bank,
    nameAccount: props?.accountName,
    accountNumber: props?.accountNumber,
    token: props?.token,
  });
  console.log(resPut);
  switch (resPut.code) {
    case 0:
      props.setLoading(true);
      setTimeout(() => {
        props.setLoading(false);
        Alert.alert('Success!', 'Your payment has been updated!', [
          {
            text: 'OK',
            onPress: () =>
              props.navigation.navigate(routersMain.CreateWithdraw),
          },
        ]);
      }, 3000);
      break;
    case 1:
    case 2:
      props.setLoading(true);
      setTimeout(() => {
        props.setLoading(false);
        Alert.alert(
          'Error!',
          `${resPut?.message}. This account number already exists`,
          [
            {
              text: 'OK',
              onPress: () =>
                props.navigation.navigate(routersMain.ProfilePayment),
            },
          ],
        );
      }, 3000);
      break;
    default:
      break;
  }
};
// GET ALL PAYMENT ADMIN
export const SVgetAllPaymentAdmin = async (props = {}) => {
  const resGet = await adminGet('/getAllPaymentAdmin', {});
  props.dispatch(props.getAllPaymentAdmin(resGet.data));
};
// GET PAYMENT ADMIN BY ID
export const SVgetPaymentAdminById = async (props = {}) => {
  const resGet = await adminGet(`/getPayment/${props?.id}`);
  props.dispatch(props.getPaymentAdminById(resGet.data));
};
