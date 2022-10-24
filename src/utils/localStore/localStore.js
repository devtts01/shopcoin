/* eslint-disable prettier/prettier */
/* eslint-disable prettier/prettier */
import AsyncStorage from '@react-native-async-storage/async-storage';
import {setCurrentUser} from '../../app/payloads/user';
const KEY = 'loginDataMobile';

export const getAsyncStore = async dispatch => {
  await AsyncStorage.getItem(`@${KEY}`)
    .then(JSON.parse)
    .then(res => {
      dispatch(setCurrentUser(res));
      // return res;
    });
  // return jsonValue ? jsonValue : null;
};

export const setAsyncStore = async data => {
  const jsonValue = await JSON.stringify(data);
  await AsyncStorage.setItem(`@${KEY}`, jsonValue);
};
export const removeAsyncStore = async dispatch => {
  await AsyncStorage.removeItem(`@${KEY}`);
};
