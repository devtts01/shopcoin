/* eslint-disable prettier/prettier */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable prettier/prettier */
import {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useAppContext} from '../../utils';
import {setMessage} from '../../app/payloads/message';
import {setFormValue} from '../../app/payloads/form';
import {Form, ModalLoading} from '../../components';
import {SVforgotPwd} from '../../services/user';
import {routersMain} from '../../routers/Main';
import styles from './ForgotPwdCss';
import stylesGeneral from '../../styles/General';
import stylesStatus from '../../styles/Status';

const ForgotPwd = ({navigation}) => {
  const {state, dispatch} = useAppContext();
  const {
    form: {email},
  } = state;
  const [loading, setLoading] = useState(false);
  const handleSubmit = async () => {
    try {
      await 1;
      SVforgotPwd({
        email,
        dispatch,
        setMessage,
        setFormValue,
        setLoading,
        navigation,
      });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <Form
        titleForm="Forgot Password"
        textBtn="Send email"
        bolEmail
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

export default ForgotPwd;
