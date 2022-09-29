/* eslint-disable prettier/prettier */
/* eslint-disable prettier/prettier */
import {
  SET_CURRENT_USER,
  SET_FORM,
  SET_MESSAGE,
  GET_ALL_COIN,
  SET_SEARCH_VALUE,
  GET_BY_ID,
} from './actions';
import {getAsyncStore} from '../utils/localStore/localStore';

const initialState = {
  currentUser: getAsyncStore(),
  search: '',
  message: {
    del: '',
    cre: '',
    upd: '',
    error: '',
  },
  form: {
    email: '',
    username: '',
    password: '',
  },
  data: {
    dataCoins: [],
    dataById: null,
  },
};

const reducer = (state, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload,
      };
    case SET_FORM:
      return {
        ...state,
        form: {
          ...state.form,
          ...action.payload,
        },
      };
    case SET_MESSAGE:
      return {
        ...state,
        message: {
          ...state.message,
          ...action.payload,
        },
      };
    case GET_ALL_COIN:
      return {
        ...state,
        data: {
          ...state.data,
          dataCoins: action.payload,
        },
      };
    case SET_SEARCH_VALUE:
      return {
        ...state,
        search: action.payload,
      };
    case GET_BY_ID:
      return {
        ...state,
        data: {
          ...state.data,
          dataById: action.payload,
        },
      };
    default:
      break;
  }
};

export {initialState};
export default reducer;
