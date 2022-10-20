/* eslint-disable prettier/prettier */
/* eslint-disable prettier/prettier */
import {
  SET_CURRENT_USER,
  SET_FORM,
  SET_MESSAGE,
  SET_AMOUNT_COIN,
  SET_AMOUNT_SELL,
  SET_FORM_DEPOSITS_VALUE,
  SET_FORM_WITHDRAW_VALUE,
  SET_FORM_PROFILE_PAYMENT_VALUE,
  SET_PRICE_COIN_SOCKET,
  SET_AMOUNT_USDT,
  GET_ALL_COIN,
  GET_ALL_DEPOSITS,
  GET_ALL_WITHDRAW,
  GET_ALL_MYCOIN,
  SET_SEARCH_VALUE,
  SET_CODE_VALUE,
  GET_BY_ID,
  GET_BY_SYMBOL,
  GET_USER_BY_ID,
  GET_HISTORY_BUY,
  GET_HISTORY_SELL,
  SET_USER_BY_ID_EMAIL,
} from './actions';

const initialState = {
  userById: null,
  currentUser: null,
  amountCoin: '',
  amountSell: '',
  amountUsdt: '',
  codeVerify: '',
  priceCoinSocket: null,
  deposits: {
    amountUSDT: '',
    bank: '',
  },
  withdraw: {
    amountUSDT: '',
  },
  profilePayment: {
    bank: '',
    accountName: '',
    accountNumber: '',
  },
  user: {
    id: '',
    email: '',
  },
  search: '',
  message: {
    del: '',
    cre: '',
    upd: '',
    error: '',
    success: '',
  },
  form: {
    email: '',
    username: '',
    password: '',
    oldPwd: '',
    confirmPwd: '',
    otpCode: '',
  },
  data: {
    dataCoins: [],
    dataDeposits: [],
    dataWithdraws: [],
    dataById: null,
    dataBySymbol: null,
    dataMyCoin: [],
  },
  history: {
    dataBuyHistory: [],
    dataSellHistory: [],
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
    case SET_AMOUNT_COIN:
      return {
        ...state,
        amountCoin: action.payload,
      };
    case SET_AMOUNT_SELL:
      return {
        ...state,
        amountSell: action.payload,
      };
    case SET_AMOUNT_USDT:
      return {
        ...state,
        amountUsdt: action.payload,
      };
    case SET_FORM_DEPOSITS_VALUE:
      return {
        ...state,
        deposits: {
          ...state.deposits,
          ...action.payload,
        },
      };
    case SET_FORM_WITHDRAW_VALUE:
      return {
        ...state,
        withdraw: {
          ...state.withdraw,
          ...action.payload,
        },
      };
    case SET_FORM_PROFILE_PAYMENT_VALUE:
      return {
        ...state,
        profilePayment: {
          ...state.profilePayment,
          ...action.payload,
        },
      };
    case SET_PRICE_COIN_SOCKET:
      return {
        ...state,
        priceCoinSocket: action.payload,
      };
    case SET_CODE_VALUE:
      return {
        ...state,
        codeVerify: action.payload,
      };
    case GET_BY_ID:
      return {
        ...state,
        data: {
          ...state.data,
          dataById: action.payload,
        },
      };
    case GET_BY_SYMBOL:
      return {
        ...state,
        data: {
          ...state.data,
          dataBySymbol: action.payload,
        },
      };
    case GET_USER_BY_ID:
      return {
        ...state,
        userById: action.payload,
      };
    case SET_USER_BY_ID_EMAIL:
      return {
        ...state,
        user: {
          ...state.user,
          ...action.payload,
        },
      };
    case GET_HISTORY_BUY:
      return {
        ...state,
        history: {
          ...state.history,
          dataBuyHistory: action.payload,
        },
      };
    case GET_HISTORY_SELL:
      return {
        ...state,
        history: {
          ...state.history,
          dataSellHistory: action.payload,
        },
      };
    case GET_ALL_DEPOSITS:
      return {
        ...state,
        data: {
          ...state.data,
          dataDeposits: action.payload,
        },
      };
    case GET_ALL_WITHDRAW:
      return {
        ...state,
        data: {
          ...state.data,
          dataWithdraws: action.payload,
        },
      };
    case GET_ALL_MYCOIN:
      return {
        ...state,
        data: {
          ...state.data,
          dataMyCoin: action.payload,
        },
      };
    default:
      break;
  }
};

export {initialState};
export default reducer;
