/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import {useAppContext} from '../../utils';
import {getUserById} from '../../app/payloads/getById';
import styles from './HeaderCss';
import stylesGeneral from '../../styles/General';
import stylesStatus from '../../styles/Status';
import {SVgetUserById} from '../../services/user';
import {formatUSDT} from '../../utils/format/Money';

export default function Header() {
  const {state, dispatch} = useAppContext();
  const {currentUser, userById} = state;
  useEffect(() => {
    SVgetUserById({
      id: currentUser && currentUser?.id,
      dispatch,
      getUserById,
    });
  }, []);

  return (
    <View style={[styles.container]}>
      <View style={[stylesGeneral.flexRow, stylesGeneral.flexCenter]}>
        <Text
          style={[
            stylesGeneral.mb10,
            stylesGeneral.fwbold,
            stylesGeneral.fz16,
            stylesGeneral.mr10,
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
              ? stylesStatus.probgc
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
          ]}>
          = {formatUSDT(userById?.Wallet?.balance)}
        </Text>
        <Text
          style={[
            stylesGeneral.mb10,
            stylesGeneral.fwbold,
            stylesGeneral.fz16,
            stylesStatus.status,
            stylesStatus.completebgc,
          ]}>
          Refresh
        </Text>
      </View>
    </View>
  );
}
