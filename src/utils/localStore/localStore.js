/* eslint-disable prettier/prettier */
import AsyncStorage from '@react-native-async-storage/async-storage';
const KEY = 'loginDataMobile';

export const getAsyncStore = async () => {
  const jsonValue = await AsyncStorage.getItem(`@${KEY}`);
  if (jsonValue) {
    const data = await Promise.resolve(JSON.parse(jsonValue)).then(x => x);
    return data;
  }
};
export const setAsyncStore = async data => {
  const jsonValue = JSON.stringify(data);
  await AsyncStorage.setItem(`@${KEY}`, jsonValue);
};
export const removeAsyncStore = async () => {
  await AsyncStorage.removeItem(`@${KEY}`);
};
