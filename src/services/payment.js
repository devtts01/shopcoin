/* eslint-disable prettier/prettier */
import {Alert} from 'react-native';
import {userPut} from '../utils/axios/axiosInstance';

// ADD BANK INFO
export const addBankInfo = async (props = {}) => {
  const resPut = await userPut(`/additionBankInfo/${props.id}`, {
    bankName: props?.bank,
    nameAccount: props?.accountName,
    accountNumber: props?.accountNumber,
    token: props?.token,
  });
  switch (resPut.code) {
    case 0:
      props.setLoading(true);
      setTimeout(() => {
        props.setLoading(false);
        Alert.alert('Success!', 'Your payment has been updated!', [
          {
            text: 'OK',
            onPress: () => props.navigation.navigate('Create Withdraw'),
          },
        ]);
      }, 5000);
      break;
    case 1:
    case 2:
      props.setLoading(true);
      setTimeout(() => {
        props.setLoading(false);
        Alert.alert('Error!', resPut?.message, [
          {
            text: 'OK',
            onPress: () => props.navigation.navigate('Pofile Payment'),
          },
        ]);
      }, 5000);
      break;
    default:
      break;
  }
};
