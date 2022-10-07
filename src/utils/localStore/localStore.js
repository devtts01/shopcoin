/* eslint-disable prettier/prettier */
/* eslint-disable prettier/prettier */
import AsyncStorage from '@react-native-async-storage/async-storage';
import {setCurrentUser} from '../../app/payloads/user';
const KEY = 'loginDataMobile';

export const getAsyncStore = dispatch => {
  AsyncStorage.getItem(`@${KEY}`)
    .then(JSON.parse)
    .then(res => {
      dispatch(setCurrentUser(res));
      // return res;
    });
  // return jsonValue ? jsonValue : null;
};

export const setAsyncStore = data => {
  const jsonValue = JSON.stringify(data);
  AsyncStorage.setItem(`@${KEY}`, jsonValue);
};
export const removeAsyncStore = () => {
  AsyncStorage.removeItem(`@${KEY}`);
};
