/* eslint-disable prettier/prettier */
/* eslint-disable prettier/prettier */
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
import socketIO from 'socket.io-client';
import {URL_SERVER} from '@env';
import {useAppContext} from '../../utils';
import {formatUSDT, precisionRound} from '../../utils/format/Money';
import {getIdUserJWT} from '../../utils/getUser/Id';
import requestRefreshToken from '../../utils/axios/refreshToken';
import {SVgetACoin, SVbuyCoin} from '../../services/coin';
import {SVgetUserById} from '../../services/user';
import {SVgetDepositsByEmailUser} from '../../services/deposits';
import {setPriceCoinSocket} from '../../app/payloads/socket';
import {getById, getUserById} from '../../app/payloads/getById';
import {setCurrentUser} from '../../app/payloads/user';
import {setMessage} from '../../app/payloads/message';
import {getAllDeposits} from '../../app/payloads/getAll';
import {setAmountCoin} from '../../app/payloads/form';
import {removeUSDT} from '../../utils/format/removeUSDT';
import {FormInput, ImageCp, ModalLoading, Skeleton} from '../../components';
import stylesGeneral from '../../styles/General';
import styles from './BuyCoinCss';
import stylesStatus from '../../styles/Status';

export default function BuyCoin({navigation, route}) {
  const {id} = route.params;
  const {state, dispatch} = useAppContext();
  const {
    userById,
    priceCoinSocket,
    currentUser,
    amountCoin,
    data: {dataById},
  } = state;
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
    dispatch(setAmountCoin(''));
  }, []);
  useEffect(() => {
    const socket = socketIO(`${URL_SERVER}`, {
      jsonp: false,
    });
    socket.on(`send-data-${dataById?.symbol}`, data => {
      dispatch(setPriceCoinSocket(data));
    });
    return () => {
      socket.disconnect();
      socket.close();
    };
  }, [dataById?.symbol]);
  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    dispatch(setAmountCoin(''));
    wait(2000).then(() => setRefreshing(false));
  }, []);
  const handleChange = (name, val) => {
    dispatch(setAmountCoin(val));
  };
  const handleBuyAPI = data => {
    SVbuyCoin({
      gmailUser: currentUser?.email,
      amount: parseFloat(amountCoin),
      amountUsd: parseFloat(amountCoin) * parseFloat(dataById?.price),
      symbol: dataById?.symbol,
      price: parseFloat(dataById?.price),
      token: data?.token,
      setLoading,
      navigation,
    });
  };
  const handleSubmit = () => {
    requestRefreshToken(
      currentUser,
      handleBuyAPI,
      state,
      dispatch,
      setCurrentUser,
      setMessage,
    );
  };
  // console.log(priceCoinSocket);
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
        <ImageCp uri={dataById?.logo} />
        <View style={[styles.nameCoin, stylesGeneral.ml12]}>
          <Text style={[styles.name, stylesGeneral.text_black]}>
            {removeUSDT(dataById?.symbol)}
          </Text>
          <Text style={[styles.desc, stylesGeneral.text_black]}>
            {dataById?.fullName}
          </Text>
        </View>
      </View>
      <View style={[styles.exchange]}>
        {amountCoin ? (
          <Text
            style={[
              stylesStatus.complete,
              stylesGeneral.fz16,
              stylesGeneral.fw500,
            ]}>
            = {priceCoinSocket?.price}
          </Text>
        ) : (
          <Skeleton />
        )}
      </View>
      <Text
        style={[
          stylesGeneral.fz16,
          stylesGeneral.mb10,
          stylesGeneral.fwb,
          stylesGeneral.text_black,
        ]}>
        Your Walet: {formatUSDT(userById?.Wallet?.balance)}
      </Text>
      <FormInput
        label="Amount Coin"
        placeholder="Enter mount coin"
        keyboardType="number-pad"
        onChangeText={val => handleChange('amountCoin', val)}
        icon={
          amountCoin &&
          (amountCoin < parseFloat(10 / priceCoinSocket?.price) ||
            amountCoin >
              parseFloat(userById?.Wallet?.balance / priceCoinSocket?.price))
        }
        color={
          amountCoin &&
          (amountCoin < parseFloat(10 / priceCoinSocket?.price) ||
            amountCoin >
              parseFloat(userById?.Wallet?.balance / priceCoinSocket?.price))
            ? 'red'
            : ''
        }
        name="exclamation-triangle"
      />
      {amountCoin && (
        <View style={[stylesGeneral.mb5]}>
          <Text style={[stylesGeneral.text_black]}>Suggest amount</Text>
          <Text style={[stylesStatus.cancel]}>
            Min: {parseFloat(10 / priceCoinSocket?.price)}
          </Text>
          <Text style={[stylesStatus.cancel]}>
            Max:{' '}
            {parseFloat(userById?.Wallet?.balance / priceCoinSocket?.price)}
          </Text>
        </View>
      )}
      <View style={[styles.amountUsdt, stylesStatus.completebgc]}>
        <Text
          style={[
            stylesGeneral.fz16,
            stylesGeneral.fwbold,
            stylesStatus.complete,
          ]}>
          Amount USD:{' '}
          {formatUSDT(precisionRound(amountCoin * dataById?.price)).replace(
            'USD',
            '',
          )}
        </Text>
      </View>
      <TouchableOpacity
        activeOpacity={0.8}
        style={[
          styles.btn,
          !amountCoin ||
            (amountCoin &&
              (amountCoin < parseFloat(10 / priceCoinSocket?.price) ||
                amountCoin >
                  parseFloat(
                    userById?.Wallet?.balance / priceCoinSocket?.price,
                  )) &&
              stylesGeneral.op6),
          stylesStatus.confirmbgcbold,
        ]}
        onPress={handleSubmit}
        disabled={!amountCoin}>
        <Text style={[styles.btn_text, stylesStatus.white]}>Submit</Text>
      </TouchableOpacity>
      {loading && <ModalLoading />}
    </ScrollView>
  );
}
