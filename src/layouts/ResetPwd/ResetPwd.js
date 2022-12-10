/* eslint-disable prettier/prettier */
/* eslint-disable react/react-in-jsx-scope */
import {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useAppContext} from '../../utils';
import {Form, ModalLoading} from '../../components';
import {routersMain} from '../../routers/Main';
import styles from './ResetPwdCss';
import stylesGeneral from '../../styles/General';
import stylesStatus from '../../styles/Status';
import {SVresetPassword} from '../../services/user';

const ResetPwd = ({navigation}) => {
  const {state, dispatch} = useAppContext();
  const {
    tokenForgot,
    form: {password, otpCode},
  } = state;
  const [loading, setLoading] = useState(false);
  const [isProcess, setIsProcess] = useState(false);
  const handleSubmit = async () => {
    try {
      await 1;
      setIsProcess(true);
      SVresetPassword({
        token: tokenForgot,
        otp: otpCode,
        pwd: password,
        setLoading,
        dispatch,
        navigation,
        setIsProcess,
      });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <Form
        titleForm="Change Password"
        textBtn="Change"
        bolOTP
        bolPwd
        isProcess={isProcess}
        onPress={handleSubmit}>
        <View style={[styles.desc, stylesGeneral.flexRow]}>
          <Text style={[styles.desc_text, stylesGeneral.text_black]}>
            You have an acount?
          </Text>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigation.navigate(routersMain.Login)}>
            <Text
              style={[
                stylesGeneral.ml4,
                styles.register,
                stylesStatus.confirm,
              ]}>
              Login
            </Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.desc, stylesGeneral.flexRow, stylesGeneral.mt10]}>
          <Text style={[styles.desc_text, stylesGeneral.text_black]}>
            You don't have an acount?
          </Text>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigation.navigate(routersMain.Register)}>
            <Text
              style={[
                stylesGeneral.ml4,
                styles.register,
                stylesStatus.confirm,
              ]}>
              Register
            </Text>
          </TouchableOpacity>
        </View>
      </Form>
      {loading && <ModalLoading />}
    </>
  );
};

export default ResetPwd;
