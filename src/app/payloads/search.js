/* eslint-disable prettier/prettier */
import {SET_SEARCH_VALUE} from '../actions';

export const setSearchValue = payload => {
  return {
    type: SET_SEARCH_VALUE,
    payload,
  };
};
