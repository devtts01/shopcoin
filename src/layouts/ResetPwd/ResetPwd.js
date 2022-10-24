/* eslint-disable prettier/prettier */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable prettier/prettier */
import {useState} from 'react';
import {View, Text, TouchableOpacity, Alert} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {useAppContext} from '../../utils';
import {Form, ModalLoading} from '../../components';
import {routersMain} from '../../routers/Main';
import styles from './ResetPwdCss';
import stylesGeneral from '../../styles/General';
import stylesStatus from '../../styles/Status';

const ResetPwd = ({navigation}) => {
  const route = useRoute();
  console.log(route);
  const {state} = useAppContext();
  const {
    form: {password, otpCode},
  } = state;
  const [loading, setLoading] = useState(false);
  const handleSubmit = async () => {
    try {
      await 1;
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        Alert.alert(
          {
            title: 'Thông báo',
            message: 'Mật khẩu đã được thay đổi thành công',
          },
          [
            {
              text: 'OK',
              onPress: () => navigation.navigate(routersMain.Login),
            },
          ],
        );
      }, 5000);
      console.log(password, otpCode);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <Form
        titleForm="Reset Password"
        textBtn="Reset"
        bolOTP
        bolPwd
        onPress={handleSubmit}>
        <View style={[styles.desc, stylesGeneral.flexRow]}>
          <Text style={[styles.desc_text]}>You have an acount?</Text>
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
          <Text style={[styles.desc_text]}>You don't have an acount?</Text>
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
