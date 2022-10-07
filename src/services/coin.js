/* eslint-disable prettier/prettier */
import {Alert} from 'react-native';
import {coinGet, userPost} from '../utils/axios/axiosInstance';

// GET ALL COINS
export const SVgetAllCoins = async (props = {}) => {
  const resGet = await coinGet(
    props.page && props.show
      ? `getAllCoin?page=${props.page}&show=${props.show}`
      : '/getAllCoin',
  );
  props.dispatch(props.getAllCoins(resGet));
};
// GET COIN BY ID
export const SVgetACoin = async (props = {}) => {
  if (props.id) {
    const resGet = await coinGet(`getCoin/${props.id}`);
    props.dispatch(props.getById(resGet));
  }
};
// BUY COIN
export const SVbuyCoin = async (props = {}) => {
  const resPost = await userPost('/BuyCoin', {
    gmailUser: props?.gmailUser,
    amount: props?.amount,
    amountUsd: props?.amountUsd, //amount * price
    symbol: props?.symbol,
    price: props?.price, // api
    type: 'BuyCoin',
    token: props?.token,
  });
  switch (resPost.code) {
    case 0:
      props.setLoading(true);
      setTimeout(() => {
        props.setLoading(false);
        Alert.alert('Success!', `${props.nameCoin} has been bought!`, [
          {
            text: 'Continue',
            onPress: () => props.navigation.navigate('Home'),
          },
          {
            text: 'View History',
            onPress: () => props.navigation.navigate('History'),
          },
        ]);
      }, 5000);
      break;
    case 2:
      props.setLoading(false);
      Alert.alert('Error', resPost.message);
      break;
    default:
      break;
  }
};
// SELL COIN
export const SVsellCoin = async (props = {}) => {
  const resPost = await userPost('/SellCoin', {
    gmailUser: props?.gmailUser,
    amount: props?.amount,
    amountUsd: props?.amountUsd, //amount * price
    symbol: props?.symbol,
    price: props?.price, // api
    type: 'SellCoin',
    token: props?.token,
  });
  switch (resPost.code) {
    case 0:
      props.setLoading(true);
      setTimeout(() => {
        props.setLoading(false);
        Alert.alert('Success!', 'ETC has been sold!', [
          {
            text: 'Continue',
            onPress: () => props.navigation.navigate('My Coin'),
          },
          {
            text: 'View History',
            onPress: () => props.navigation.navigate('Sell History'),
          },
        ]);
      }, 5000);
      break;
    case 2:
      props.setLoading(false);
      Alert.alert('Error', resPost.message);
      break;
    default:
      break;
  }
};
