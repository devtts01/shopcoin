/* eslint-disable prettier/prettier */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable prettier/prettier */
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Image,
} from 'react-native';
import {useAppContext} from '../../utils';
import {setFormValue} from '../../app/payloads/form';
import styles from './FormCss';
import stylesGeneral from '../../styles/General';
import stylesStatus from '../../styles/Status';
import {FormInput} from '../../components';

const Form = ({
  uriBgc = require('../../assets/images/bg-login.png'),
  uriLogo = require('../../assets/images/header-logo.png'),
  titleForm,
  textBtn,
  bolUsername,
  bolEmail,
  bolPwd,
  refEmail,
  refPwd,
  refUsername,
  children,
  onPress,
}) => {
  const {state, dispatch} = useAppContext();
  const {
    form: {username, email, password},
    message: {error},
  } = state;
  const handleChange = (name, value) => {
    dispatch(
      setFormValue({
        ...state.form,
        [name]: value,
      }),
    );
  };
  return (
    <ImageBackground
      style={[styles.container]}
      resizeMode="cover"
      source={uriBgc}>
      <View style={[styles.content]}>
        <View style={[stylesGeneral.flexCenter, stylesGeneral.mb10]}>
          <Image
            style={[styles.image_form]}
            source={uriLogo}
            resizeMode="contain"
          />
        </View>
        <Text style={[styles.title_form]}>{titleForm}</Text>
        {error && (
          <View style={[styles.error_container]}>
            <Text style={[styles.error_text]}>{error}</Text>
          </View>
        )}
        {bolUsername && (
          <FormInput
            label="Username"
            ref={refUsername}
            placeholder="Enter your username"
            onChangeText={value => handleChange('username', value)}
            value={username}
          />
        )}
        {bolEmail && (
          <FormInput
            label="Email"
            ref={refEmail}
            placeholder="Enter your email"
            onChangeText={value => handleChange('email', value)}
            value={email}
          />
        )}
        {bolPwd && (
          <FormInput
            label="Password"
            placeholder="Enter your password"
            secureTextEntry={true}
            ref={refPwd}
            onChangeText={value => handleChange('password', value)}
            value={password}
          />
        )}
        <TouchableOpacity
          activeOpacity={0.8}
          style={[styles.input_item]}
          onPress={onPress}>
          <Text style={[styles.input_btn, stylesStatus.confirmbgc]}>
            {textBtn}
          </Text>
        </TouchableOpacity>
        {children}
      </View>
    </ImageBackground>
  );
};

export default Form;
