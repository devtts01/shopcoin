/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
import React, {useCallback, useEffect, useState} from 'react';
import {
  Image,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useAppContext} from '../../utils';
import {formatUSDT} from '../../utils/format/Money';
import {userLogout} from '../../services/userAuthen';
import {SVgetUserById} from '../../services/user';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {getUserById} from '../../app/payloads/getById';
import {getAllDeposits} from '../../app/payloads/getAll';
import styles from './ProfileCss';
import stylesGeneral from '../../styles/General';
import stylesStatus from '../../styles/Status';
import {SVgetDepositsByEmailUser} from '../../services/deposits';
import useGetUSDT from '../../utils/getData/USDT';

const Profile = ({navigation}) => {
  const [refreshing, setRefreshing] = useState(false);
  const {state, dispatch} = useAppContext();
  const {
    currentUser,
    userById,
    data: {dataDeposits},
  } = state;
  useEffect(() => {
    SVgetUserById({
      id: currentUser?.id,
      dispatch,
      getUserById,
    });
    SVgetDepositsByEmailUser({
      email: currentUser.email,
      dispatch,
      getAllDeposits,
    });
  }, []);
  const totalAmountUSDT = useGetUSDT(dataDeposits, currentUser?.email);
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
          source={{
            uri: 'https://img.capital.com/imgs/articles/1200x627x1/shutterstock_1923715325.jpg',
          }}
          resizeMode="cover"
          style={[styles.avatar]}
        />
        <Text
          style={[
            styles.name_user,
            stylesGeneral.mt10,
            stylesGeneral.mb5,
            stylesGeneral.fz16,
          ]}>
          {currentUser?.username}
        </Text>
        <Text style={[styles.email_user]}>{currentUser?.email}</Text>
      </View>
      <View style={[styles.info_detail_container]}>
        <View style={[styles.info_detail_item, stylesGeneral.flexRow]}>
          <Text style={[styles.info_detail_title]}>Username</Text>
          <Text style={[styles.info_detail_desc]}>{currentUser?.username}</Text>
        </View>
        <View style={[styles.info_detail_item, stylesGeneral.flexRow]}>
          <Text style={[styles.info_detail_title]}>Email</Text>
          <Text style={[styles.info_detail_desc]}>{currentUser?.email}</Text>
        </View>
        <View style={[styles.info_detail_item, stylesGeneral.flexRow]}>
          <Text style={[styles.info_detail_title]}>Wallet</Text>
          <Text style={[styles.info_detail_desc]}>
            {/* {formatUSDT(userById?.Wallet?.balance)}T */}
            {formatUSDT(totalAmountUSDT)} USDT
          </Text>
        </View>
        <View style={[styles.info_detail_item, stylesGeneral.flexRow]}>
          <Text style={[styles.info_detail_title]}>Rank</Text>
          <Text
            style={[
              styles.info_detail_desc,
              stylesStatus.status,
              currentUser?.rank?.toLowerCase() === 'vip'
                ? stylesStatus.vipbgc
                : currentUser?.rank?.toLowerCase() === 'pro'
                ? stylesStatus.probgc
                : currentUser?.rank?.toLowerCase() === 'standard'
                ? stylesStatus.confirmbgc
                : stylesStatus.demobgc,
            ]}>
            {currentUser?.rank}
          </Text>
        </View>
        <View
          style={[styles.info_detail_item, stylesGeneral.flexRow]}
          onTouchStart={() => navigation.navigate('Upload Document')}>
          <Text style={[styles.info_detail_title]}>Upload document</Text>
          <FontAwesome5 name="chevron-right" size={12} />
        </View>
        <View
          style={[styles.info_detail_item, stylesGeneral.flexRow]}
          onTouchStart={() => navigation.navigate('Change Password')}>
          <Text style={[styles.info_detail_title]}>Change password</Text>
          <FontAwesome5 name="chevron-right" size={12} />
        </View>
        <View
          style={[styles.info_detail_item, stylesGeneral.flexRow]}
          onTouchStart={() => navigation.navigate('Contact')}>
          <Text style={[styles.info_detail_title]}>Contact</Text>
          <FontAwesome5 name="chevron-right" size={12} />
        </View>
        <View
          style={[styles.info_detail_item, stylesGeneral.flexRow]}
          onTouchStart={() => navigation.navigate('Profile Payment')}>
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
