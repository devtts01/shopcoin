/* eslint-disable prettier/prettier */
import jwt_decode from 'jwt-decode';
import {refreshToken} from '../../utils/axios/axiosInstance';
import {getAsyncStore, setAsyncStore} from '../localStore/localStore';

const requestRefreshToken = async (
  currentUser,
  handleFunc,
  state,
  dispatch,
  actions,
  id,
) => {
  try {
    const accessToken = currentUser?.token;
    if (accessToken) {
      const decodedToken = await jwt_decode(accessToken);
      const date = new Date();
      if (decodedToken.exp < date.getTime() / 1000) {
        const res = await refreshToken('refreshToken');
        if (res.code === 0) {
          const refreshUser = {
            ...currentUser,
            token: res.newtoken.toString(),
          };
          await setAsyncStore(refreshUser);
          dispatch(
            actions.setData({
              ...state.set,
              currentUser: getAsyncStore(),
            }),
          );
          currentUser.token = `${res.newtoken}`;
          handleFunc(refreshUser, id ? id : '');
          return refreshUser;
        } else {
          dispatch(
            actions.setData({
              ...state.set,
              message: {
                ...state.set.message,
                error: 'RefreshToken not found- Please login again',
              },
            }),
          );
        }
      } else {
        handleFunc(currentUser, id ? id : '');
        return currentUser;
      }
    }
  } catch (err) {
    console.log(err);
  }
};
export default requestRefreshToken;
