/* eslint-disable prettier/prettier */
import {authPost} from '../utils/axios/axiosInstance';
import {setAsyncStore, removeAsyncStore} from '../utils/localStore/localStore';

// USER LOGIN
export const userLogin = async (props = {}) => {
  try {
    const resPost = await authPost('login', {
      email: props.email,
      password: props.password,
    });
    switch (resPost.code) {
      case 0:
        setAsyncStore({
          token: resPost?.token,
          username: resPost?.userInfo?.payment?.username,
          email: resPost?.userInfo?.payment?.email,
          rule: resPost?.userInfo?.payment.rule,
          rank: resPost?.userInfo?.rank,
          id: resPost?.userInfo?._id,
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
        break;
      default:
        break;
    }
  } catch (err) {
    console.log(err);
  }
};
// USER LOGOUT
export const userLogout = async (props = {}) => {
  try {
    await authPost('logout');
    removeAsyncStore();
  } catch (err) {
    console.log(err);
  }
};
// USER REGISTER
export const userRegister = async (props = {}) => {
  try {
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
        props.navigation.navigate('Login');
        break;
      case 1:
      case 2:
        props.dispatch(
          props.setMessage({
            ...props.state.message,
            error: resPost?.message,
          }),
        );
        break;
      default:
        break;
    }
    console.log(resPost);
  } catch (err) {
    console.log(err);
  }
};