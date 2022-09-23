/* eslint-disable prettier/prettier */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable prettier/prettier */
import {View, Text, TouchableOpacity} from 'react-native';
import {Form} from '../../components';
import styles from './RegisterCss';
import stylesGeneral from '../../styles/General';
import stylesStatus from '../../styles/Status';

const Register = ({navigation}) => {
  return (
    <Form
      titleForm="Register Form"
      textBtn="Register"
      bolUsername
      bolEmail
      bolPwd>
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
    </Form>
  );
};

export default Register;
