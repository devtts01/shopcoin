/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
import {View, Text, TouchableOpacity} from 'react-native';
import React, {useEffect} from 'react';
import {useAppContext} from '../../utils';
import {getUserById} from '../../app/payloads/getById';
import styles from './HeaderCss';
import stylesGeneral from '../../styles/General';
import stylesStatus from '../../styles/Status';
import {SVgetUserById} from '../../services/user';
import {formatUSDT} from '../../utils/format/Money';

export default function Header({refreshData = () => {}}) {
  const {state, dispatch} = useAppContext();
  const {currentUser, userById} = state;
  useEffect(() => {
    if (currentUser) {
      SVgetUserById({
        id: currentUser?.id,
        dispatch,
        getUserById,
      });
    }
  }, []);
  const handleRefreshUSDT = () => {
    refreshData();
    SVgetUserById({
      id: currentUser?.id,
      dispatch,
      getUserById,
    });
  };
  return (
    <View style={[styles.container]}>
      <View style={[stylesGeneral.flexRow, stylesGeneral.flexCenter]}>
        <Text
          style={[
            stylesGeneral.mb10,
            stylesGeneral.fwbold,
            stylesGeneral.fz16,
            stylesGeneral.mr10,
            stylesGeneral.text_black,
          ]}>
          Welcome: {currentUser?.username}
        </Text>
        <Text
          style={[
            stylesGeneral.mb10,
            stylesGeneral.fwbold,
            stylesGeneral.fz16,
            stylesStatus.status,
            currentUser?.rank?.toLowerCase() === 'vip'
              ? stylesStatus.vipbgc
              : currentUser?.rank?.toLowerCase() === 'pro'
              ? stylesStatus.completebgc
              : currentUser?.rank?.toLowerCase() === 'standard'
              ? stylesStatus.confirmbgc
              : stylesStatus.demobgc,
          ]}>
          {currentUser?.rank}
        </Text>
      </View>
      <View style={[stylesGeneral.flexRow, stylesGeneral.flexCenter]}>
        <Text
          style={[
            stylesGeneral.fwbold,
            stylesGeneral.fz16,
            stylesGeneral.mr10,
            stylesGeneral.mb10,
            stylesGeneral.text_black,
          ]}>
          ={' '}
          {userById?.Wallet?.balance || userById?.Wallet?.balance === 0
            ? formatUSDT(userById?.Wallet?.balance)
            : 'Loading...'}
        </Text>
        <TouchableOpacity activeOpacity={0.8} onPress={handleRefreshUSDT}>
          <Text
            style={[
              stylesGeneral.mb10,
              stylesGeneral.fwbold,
              stylesGeneral.fz16,
              stylesStatus.status,
              stylesStatus.completebgc,
              stylesGeneral.texttf_none,
            ]}>
            Refresh
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
