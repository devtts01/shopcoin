/* eslint-disable prettier/prettier */
import React from 'react';
import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import styles from './ProfileCss';
import {userLogout} from '../../services/userAuthen';
import stylesGeneral from '../../styles/General';
import stylesStatus from '../../styles/Status';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const Profile = ({navigation}) => {
  console.log(navigation);
  const handleLogout = () => {
    userLogout({});
    navigation.navigate('Login');
  };
  return (
    <ScrollView style={[styles.container]}>
      <View style={[styles.user_info]}>
        <Image
          source={require('../../assets/images/bg-login.png')}
          resizeMode="contain"
          style={[styles.avatar]}
        />
        <Text style={[styles.name_user, stylesGeneral.mt10, stylesGeneral.mb5]}>
          @Nguyễn Minh Châu
        </Text>
        <Text style={[styles.email_user]}>nmchauhcmue@gmail.com</Text>
      </View>
      <View style={[styles.list_actions, stylesGeneral.mt10]}>
        <TouchableOpacity activeOpacity={0.6} style={[styles.actions_item]}>
          <FontAwesome5 name="cog" size={20} />
          <Text
            style={[
              stylesGeneral.fz16,
              stylesGeneral.ml10,
              stylesGeneral.fwbold,
            ]}>
            Setting
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleLogout}
          activeOpacity={0.6}
          style={[styles.actions_item, stylesStatus.cancelbgc]}>
          <FontAwesome5 name="sign-out-alt" size={20} color={'red'} />
          <Text
            style={[
              styles.actions_text,
              stylesGeneral.fz16,
              stylesGeneral.ml10,
              stylesGeneral.fwbold,
            ]}>
            Logout
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Profile;
