/* eslint-disable prettier/prettier */
import {Alert} from 'react-native';
import {coinGet, userGet, userPost} from '../utils/axios/axiosInstance';
import {routersMain} from '../routers/Main';
import {routers} from '../routers/Routers';

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
    const resGet = await coinGet(`/getCoin/${props.id}`);
    props.dispatch(props.getById(resGet?.data));
  }
};
// GET ALL MY COIN
export const SVgetAllMyCoin = async (props = {}) => {
  const resGet = await userGet(`/getAllCoinOfUser/${props.id}`);
  props.dispatch(props.getAllMyCoin(resGet?.data));
};
// GET COIN BY SYMBOL
export const SVgetCoinBySymbol = async (props = {}) => {
  if (props.symbol) {
    const resGet = await coinGet(`/getCoinSymbol/${props.symbol}`);
    props.dispatch(props.getBySymbol(resGet?.data));
  }
};
// BUY COIN
export const SVbuyCoin = async (props = {}) => {
  console.log(props);
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
        Alert.alert(
          'Success!',
          `${props.symbol.replace('USDT', '')} has been bought!`,
          [
            {
              text: 'Continue',
              onPress: () => props.navigation.navigate(routers.Home),
            },
            {
              text: 'View History',
              onPress: () => props.navigation.navigate(routers.History),
            },
          ],
        );
      }, 5000);
      break;
    case 1:
    case 2:
    case 3:
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
        Alert.alert(
          'Success!',
          `${props.symbol.replace('USDT', '')} has been sold!`,
          [
            {
              text: 'Continue',
              onPress: () => props.navigation.navigate(routers.MyCoin),
            },
            {
              text: 'View History',
              onPress: () => props.navigation.navigate(routersMain.SellHistory),
            },
          ],
        );
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
