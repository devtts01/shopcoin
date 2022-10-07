/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import {useAppContext} from '../../utils';
import styles from './HeaderCss';
import stylesGeneral from '../../styles/General';
import stylesStatus from '../../styles/Status';
import useGetUSDT from '../../utils/getData/USDT';
import {SVgetDepositsByEmailUser} from '../../services/deposits';
import {getAllDeposits} from '../../app/payloads/getAll';

export default function Header() {
  const {state, dispatch} = useAppContext();
  const {
    currentUser,
    data: {dataDeposits},
  } = state;
  useEffect(() => {
    SVgetDepositsByEmailUser({
      email: currentUser.email,
      dispatch,
      getAllDeposits,
    });
  }, []);
  const totalAmountUSDT = useGetUSDT(dataDeposits, currentUser?.email);
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
            currentUser?.rank.toLowerCase() === 'vip'
              ? stylesStatus.vipbgc
              : currentUser?.rank.toLowerCase() === 'pro'
              ? stylesStatus.probgc
              : currentUser?.rank.toLowerCase() === 'standard'
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
          = {totalAmountUSDT} USDT
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
