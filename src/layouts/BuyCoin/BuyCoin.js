/* eslint-disable prettier/prettier */
/* eslint-disable radix */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
import {
  View,
  Text,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import styles from './BuyCoinCss';
import {useAppContext} from '../../utils';
import stylesGeneral from '../../styles/General';
import {SVgetACoin, SVbuyCoin} from '../../services/coin';
import {SVgetUserById} from '../../services/user';
import {SVgetDepositsByEmailUser} from '../../services/deposits';
import {getById, getUserById} from '../../app/payloads/getById';
import {setCurrentUser} from '../../app/payloads/user';
import {setMessage} from '../../app/payloads/message';
import {getAllDeposits} from '../../app/payloads/getAll';
import {setAmountCoin} from '../../app/payloads/form';
import {formatUSDT} from '../../utils/format/Money';
import useGetUSDT from '../../utils/getData/USDT';
import {FormInput, ImageCp, ModalLoading} from '../../components';
import stylesStatus from '../../styles/Status';
import {getIdUserJWT} from '../../utils/getUser/Id';
import requestRefreshToken from '../../utils/axios/refreshToken';

export default function BuyCoin({navigation, route}) {
  const {state, dispatch} = useAppContext();
  const {
    currentUser,
    amountCoin,
    data: {dataById, dataDeposits},
    user: {email},
    userById,
  } = state;
  const {id} = route.params;
  const dataId = dataById?.data;
  const [refreshing, setRefreshing] = React.useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    SVgetACoin({
      id,
      getById,
      dispatch,
    });
    getIdUserJWT(currentUser, dispatch);
    SVgetUserById({
      id: currentUser.id,
      dispatch,
      getUserById,
    });
    SVgetDepositsByEmailUser({
      email: currentUser.email,
      dispatch,
      getAllDeposits,
    });
  }, []);

  const totalAmountUSDT = useGetUSDT(dataDeposits, email);

  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);
  const handleChange = (name, val) => {
    dispatch(setAmountCoin(val));
  };
  const handleBuy = data => {
    SVbuyCoin({
      gmailUser: currentUser?.email,
      amount: parseInt(amountCoin),
      amountUsd: parseInt(amountCoin) * 10000,
      symbol: dataId?.symbol,
      price: 10000,
      token: data?.token,
      setLoading,
      navigation,
    });
  };
  const handleSubmit = () => {
    requestRefreshToken(
      currentUser,
      handleBuy,
      state,
      dispatch,
      setCurrentUser,
      setMessage,
    );
  };

  return (
    <ScrollView
      style={[styles.container]}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <View
        style={[
          styles.image_container,
          stylesGeneral.flexRow,
          stylesGeneral.flexCenter,
        ]}>
        <ImageCp uri={dataId?.logo} />
        <View style={[styles.nameCoin, stylesGeneral.ml12]}>
          <Text style={[styles.name]}>
            {dataId?.symbol.replace('USDT', '')}
          </Text>
          <Text style={[styles.desc]}>{dataId?.fullName}</Text>
        </View>
      </View>
      <View style={[styles.exchange]}>
        <SkeletonPlaceholder.Item
          marginTop={6}
          width={120}
          height={20}
          borderRadius={4}
          backgroundColor="#ededed"
        />
      </View>
      <Text style={[stylesGeneral.fz16, stylesGeneral.mb10, stylesGeneral.fwb]}>
        Your Walet: {formatUSDT(userById?.Wallet?.balance)}T
      </Text>
      <FormInput
        label="Amount Coin"
        placeholder="Enter mount coin"
        keyboardType="number-pad"
        onChangeText={val => handleChange('amountCoin', val)}
        icon
        color="red"
        name="exclamation-triangle"
      />
      <View style={[styles.amountUsdt, stylesStatus.completebgc]}>
        <Text
          style={[
            styles.amountUsdt_text,
            stylesGeneral.fz16,
            stylesGeneral.fwbold,
            stylesStatus.complete,
          ]}>
          Amount USDT: {totalAmountUSDT || NaN}
        </Text>
      </View>
      <TouchableOpacity
        activeOpacity={0.8}
        style={[
          styles.btn,
          !amountCoin && stylesGeneral.op6,
          stylesStatus.confirmbgcbold,
        ]}
        onPress={handleSubmit}
        disabled={!amountCoin}>
        <Text style={[styles.btn_text, stylesStatus.white]}>Submit</Text>
      </TouchableOpacity>
      {/* Modal Loading */}
      {loading && <ModalLoading />}
    </ScrollView>
  );
}
