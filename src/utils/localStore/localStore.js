/* eslint-disable prettier/prettier */
import AsyncStorage from '@react-native-async-storage/async-storage';
const KEY = 'loginDataMobile';

export const getAsyncStore = () => {
  const jsonValue = AsyncStorage.getItem(`@${KEY}`)
    .then(JSON.parse)
    .then(res => res);
  return jsonValue ? jsonValue : null;
};

export const setAsyncStore = data => {
  const jsonValue = JSON.stringify(data);
  AsyncStorage.setItem(`@${KEY}`, jsonValue);
};
export const removeAsyncStore = () => {
  AsyncStorage.removeItem(`@${KEY}`);
};
