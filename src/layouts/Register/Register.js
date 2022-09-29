/* eslint-disable prettier/prettier */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable prettier/prettier */
import {View, Text, TouchableOpacity} from 'react-native';
import {userRegister} from '../../services/userAuthen';
import {setFormValue} from '../../app/payloads/form';
import {setMessage} from '../../app/payloads/message';
import {useAppContext} from '../../utils/';
import {Form} from '../../components';
import styles from './RegisterCss';
import stylesGeneral from '../../styles/General';
import stylesStatus from '../../styles/Status';

const Register = ({navigation}) => {
  const {state, dispatch} = useAppContext();
  const {
    form: {username, email, password},
  } = state;
  const handleRegister = () => {
    userRegister({
      username,
      email,
      password,
      dispatch,
      state,
      navigation,
      setMessage,
      setFormValue,
    });
  };
  return (
    <Form
      titleForm="Register Form"
      textBtn="Register"
      bolUsername
      bolEmail
      bolPwd
      onPress={handleRegister}>
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
