/* eslint-disable prettier/prettier */
/* eslint-disable prettier/prettier */
import AsyncStorage from '@react-native-async-storage/async-storage';
import {setCurrentUser} from '../../app/payloads/user';
const KEY = 'loginDataMobile';

export const getAsyncStore = async dispatch => {
  try {
    await AsyncStorage.getItem(`@${KEY}`)
      .then(JSON.parse)
      .then(res => {
        dispatch(setCurrentUser(res));
      });
  } catch (err) {
    console.log('Error: ', err);
  }
};

export const updateAsyncStore = async dispatch => {
  try {
    await AsyncStorage.mergeItem(`@${KEY}`)
      .then(JSON.parse)
      .then(res => {
        dispatch(setCurrentUser(res));
      });
  } catch (err) {
    console.log(err);
  }
};

export const setAsyncStore = async data => {
  try {
    if (data) {
      const jsonValue = await JSON.stringify(data);
      await AsyncStorage.setItem(`@${KEY}`, jsonValue);
    }
  } catch (err) {
    console.log(err);
  }
};

export const removeAsyncStore = async () => {
  try {
    await AsyncStorage.clear();
    return true;
  } catch (exception) {
    return false;
  }
};
