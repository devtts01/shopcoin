/* eslint-disable prettier/prettier */
import React, {useCallback, useState} from 'react';
import {
  Image,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {formatUSDT} from '../../utils/format/Money';
import styles from './ProfileCss';
import {userLogout} from '../../services/userAuthen';
import stylesGeneral from '../../styles/General';
import stylesStatus from '../../styles/Status';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const Profile = ({navigation}) => {
  const [refreshing, setRefreshing] = useState(false);
  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);
  const handleLogout = () => {
    userLogout({});
    navigation.navigate('Login');
  };
  return (
    <ScrollView
      style={[styles.container]}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <View style={[styles.user_info]}>
        <Image
          source={require('../../assets/images/bg-login.png')}
          resizeMode="cover"
          style={[styles.avatar]}
        />
        <Text style={[styles.name_user, stylesGeneral.mt10, stylesGeneral.mb5]}>
          @Nguyễn Minh Châu
        </Text>
        <Text style={[styles.email_user]}>nmchauhcmue@gmail.com</Text>
      </View>
      <View style={[styles.info_detail_container]}>
        <View style={[styles.info_detail_item, stylesGeneral.flexRow]}>
          <Text style={[styles.info_detail_title]}>Username</Text>
          <Text style={[styles.info_detail_desc]}>Nguyen Minh Chau</Text>
        </View>
        <View style={[styles.info_detail_item, stylesGeneral.flexRow]}>
          <Text style={[styles.info_detail_title]}>Email</Text>
          <Text style={[styles.info_detail_desc]}>nmchauhcmue@gmail.com</Text>
        </View>
        <View style={[styles.info_detail_item, stylesGeneral.flexRow]}>
          <Text style={[styles.info_detail_title]}>Wallet</Text>
          <Text style={[styles.info_detail_desc]}>{formatUSDT(0)}T</Text>
        </View>
        <View style={[styles.info_detail_item, stylesGeneral.flexRow]}>
          <Text style={[styles.info_detail_title]}>Rank</Text>
          <Text
            style={[
              styles.info_detail_desc,
              stylesStatus.confirmbgc,
              stylesStatus.status,
            ]}>
            Standard
          </Text>
        </View>
        <View
          style={[styles.info_detail_item, stylesGeneral.flexRow]}
          onTouchStart={() => navigation.navigate('Upload Document')}>
          <Text style={[styles.info_detail_title]}>Upload document</Text>
          <FontAwesome5 name="chevron-right" size={12} />
        </View>
        <View style={[styles.info_detail_item, stylesGeneral.flexRow]}>
          <Text style={[styles.info_detail_title]}>Change password</Text>
          <FontAwesome5 name="chevron-right" size={12} />
        </View>
        <View style={[styles.info_detail_item, stylesGeneral.flexRow]}>
          <Text style={[styles.info_detail_title]}>Contact</Text>
          <FontAwesome5 name="chevron-right" size={12} />
        </View>
        <View style={[styles.info_detail_item, stylesGeneral.flexRow]}>
          <Text style={[styles.info_detail_title]}>Payment</Text>
          <FontAwesome5 name="chevron-right" size={12} />
        </View>
        <View style={[styles.info_detail_item, stylesGeneral.flexRow]}>
          <Text style={[styles.info_detail_title]}>Live chat</Text>
          <FontAwesome5 name="chevron-right" size={12} />
        </View>
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
          style={[styles.actions_item]}>
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
