/* eslint-disable prettier/prettier */
import {Alert} from 'react-native';
import {
  adminGet,
  authPost,
  userPost,
  userPut,
} from '../utils/axios/axiosInstance';
import {removeAsyncStore} from '../utils/localStore/localStore';
import {routersMain} from '../routers/Main';
import {routers} from '../routers/Routers';

// GET USER BY ID
export const SVgetUserById = async (props = {}) => {
  const resGet = await adminGet(`/getUser/${props.id}`);
  props.dispatch(props.getUserById(resGet?.data));
};

// CHANGE PASSWORD
export const SVchangePassword = async (props = {}) => {
  const resPut = await userPut(`/changePWD/${props.id}`, {
    oldPWD: props.oldPWD,
    newPWD: props.newPWD,
    token: props.token,
  });
  switch (resPut.code) {
    case 0:
      props.setLoading(true);
      setTimeout(() => {
        props.setLoading(false);
        Alert.alert('Success!', 'Change password successfully!', [
          {
            text: 'OK',
            onPress: () => props.navigation.navigate(routersMain.Login),
          },
        ]);
      }, 5000);
      props.dispatch(
        props.setFormValue({
          password: '',
          oldPwd: '',
          confirmPwd: '',
        }),
      );
      await authPost('logout');
      removeAsyncStore();
      break;
    case 1:
    case 2:
      props.dispatch(props.setMessage({error: resPut.message}));
      break;
    default:
      break;
  }
};
// FORGOT PASSWORD
export const SVforgotPwd = async (props = {}) => {
  const resPost = await userPost('/forgotPassword', {
    email: props.email,
  });
  switch (resPost.code) {
    case 0:
      props.setLoading(true);
      setTimeout(() => {
        props.setLoading(false);
        Alert.alert('Success!', 'Please check email with new password!', [
          {
            text: 'OK',
            onPress: () => props.navigation.navigate(routersMain.ResetPwd),
          },
        ]);
      }, 3000);
      props.dispatch(
        props.setFormValue({
          email: '',
        }),
      );
      break;
    case 1:
    case 2:
      props.dispatch(
        props.setMessage({
          success: '',
          error: resPost.message,
        }),
      );
      props.dispatch(
        props.setFormValue({
          email: '',
        }),
      );
      break;
    default:
      break;
  }
};
// UPLOAD DOCUMENT
export const SVuploadDocument = async (props = {}) => {
  const resPut = await userPut(
    `/uploadImage/${props.id}`,
    {
      body: {
        cccdFont: props?.imageForm[0],
        cccdBeside: props?.imageForm[1],
        licenseFont: props?.imageForm[2],
        licenseBeside: props?.imageForm[3],
      },
      headers: {
        'Content-Type': 'multipart/form-data',
        token: props?.token,
      },
    },
    // {
    //   headers: {
    //     'Content-Type': 'multipart/form-data',
    //     token: props?.token,
    //   },
    // },
  );
  console.log(resPut);
  switch (resPut.code) {
    case 0:
      props.setLoading(true);
      setTimeout(() => {
        props.setLoading(false);
        Alert.alert('Success!', 'Upload document successfully!', [
          {
            text: 'OK',
            onPress: () => props.navigation.navigate(routers.Profile),
          },
        ]);
      }, 5000);
      break;
    case 1:
    case 2:
      props.setLoading(true);
      setTimeout(() => {
        props.setLoading(false);
        Alert.alert('Error!', resPut?.message, [
          {
            text: 'OK',
            onPress: () => props.navigation.navigate(routers.Profile),
          },
        ]);
      }, 5000);
      break;
    default:
      break;
  }
};
