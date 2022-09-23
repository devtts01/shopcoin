/* eslint-disable prettier/prettier */
import {SET_CURRENT_USER, SET_FORM, SET_MESSAGE} from './actions';
import {getAsyncStore} from '../utils/localStore/localStore';

const initialState = {
  currentUser: getAsyncStore(),
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
    default:
      break;
  }
};

export {initialState};
export default reducer;
