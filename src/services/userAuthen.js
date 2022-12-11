/* eslint-disable prettier/prettier */
import {authPost} from '../utils/axios/axiosInstance';
import {setAsyncStore, removeAsyncStore} from '../utils/localStore/localStore';
import {routersMain} from '../routers/Main';

// USER LOGIN
export const userLogin = async (props = {}) => {
  const resPost = await authPost('login', {
    email: props.email,
    password: props.password,
  });
  switch (resPost.code) {
    case 0:
      await setAsyncStore({
        token: resPost?.data?.token,
        username: resPost?.data?.user?.payment?.username,
        email: resPost?.data?.user?.payment?.email,
        rule: resPost?.data?.user?.payment.rule,
        rank: resPost?.data?.user?.rank,
        id: resPost?.data?.user?._id,
      });
      props.dispatch(
        props.setFormValue({
          username: '',
          email: '',
          password: '',
        }),
      );
      props.dispatch(
        props.setMessage({
          ...props.state.message,
          error: '',
        }),
      );
      props.setIsProcess(false);
      props.redirect();
      break;
    case 1:
    case 2:
      props.dispatch(
        props.setMessage({
          ...props.state.message,
          error: resPost?.message,
        }),
      );
      props.setIsProcess(false);
      break;
    default:
      break;
  }
};
// USER LOGOUT
export const userLogout = async (props = {}) => {
  await removeAsyncStore();
  await authPost('logout');
};
// USER REGISTER
export const userRegister = async (props = {}) => {
  const resPost = await authPost('register', {
    username: props.username,
    email: props.email,
    password: props.password,
  });
  switch (resPost.code) {
    case 0:
      props.dispatch(
        props.setFormValue({
          username: '',
          email: '',
          password: '',
        }),
      );
      props.dispatch(
        props.setMessage({
          ...props.state.message,
          error: '',
        }),
      );
      props.setIsProcess(false);
      props.navigation.navigate(routersMain.Login);
      break;
    case 1:
    case 2:
      props.dispatch(
        props.setMessage({
          ...props.state.message,
          error: resPost?.message,
        }),
      );
      props.setIsProcess(false);
      break;
    default:
      break;
  }
};
