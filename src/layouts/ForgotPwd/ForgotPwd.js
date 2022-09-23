/* eslint-disable prettier/prettier */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable prettier/prettier */
import {View, Text, TouchableOpacity} from 'react-native';
import {Form} from '../../components';
import styles from './ForgotPwdCss';
import stylesGeneral from '../../styles/General';
import stylesStatus from '../../styles/Status';

const ForgotPwd = ({navigation}) => {
  return (
    <Form titleForm="Forgot Password" textBtn="Send email" bolEmail>
      <View style={[styles.desc, stylesGeneral.flexRow]}>
        <Text style={[styles.desc_text]}>You have an acount?</Text>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => navigation.navigate('Login')}>
          <Text
            style={[stylesGeneral.ml4, styles.register, stylesStatus.confirm]}>
            Login
          </Text>
        </TouchableOpacity>
      </View>
      <View style={[styles.desc, stylesGeneral.flexRow, stylesGeneral.mt10]}>
        <Text style={[styles.desc_text]}>You don't have an acount?</Text>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => navigation.navigate('Register')}>
          <Text
            style={[stylesGeneral.ml4, styles.register, stylesStatus.confirm]}>
            Register
          </Text>
        </TouchableOpacity>
      </View>
    </Form>
  );
};

export default ForgotPwd;
