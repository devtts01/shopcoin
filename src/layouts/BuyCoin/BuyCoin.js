/* eslint-disable prettier/prettier */
/* eslint-disable radix */
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
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {useAppContext} from '../../utils';
import {formatUSDT} from '../../utils/format/Money';
import {getIdUserJWT} from '../../utils/getUser/Id';
import requestRefreshToken from '../../utils/axios/refreshToken';
import useGetUSDT from '../../utils/getData/USDT';
import stylesGeneral from '../../styles/General';
import {SVgetACoin, SVbuyCoin} from '../../services/coin';
import {SVgetUserById} from '../../services/user';
import {SVgetDepositsByEmailUser} from '../../services/deposits';
import {getById, getUserById} from '../../app/payloads/getById';
import {setCurrentUser} from '../../app/payloads/user';
import {setMessage} from '../../app/payloads/message';
import {getAllDeposits} from '../../app/payloads/getAll';
import {setAmountCoin} from '../../app/payloads/form';
import {FormInput, ImageCp, ModalLoading} from '../../components';
import styles from './BuyCoinCss';
import stylesStatus from '../../styles/Status';

export default function BuyCoin({navigation, route}) {
  const {state, dispatch} = useAppContext();
  const {
    currentUser,
    amountCoin,
    data: {dataById, dataDeposits},
    user: {email},
  } = state;
  const {id} = route.params;
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
  console.log(dataById);

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
      symbol: dataById?.symbol,
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
        <ImageCp uri={dataById?.logo} />
        <View style={[styles.nameCoin, stylesGeneral.ml12]}>
          <Text style={[styles.name]}>
            {dataById?.symbol.replace('USDT', '')}
          </Text>
          <Text style={[styles.desc]}>{dataById?.fullName}</Text>
        </View>
      </View>
      <View style={[styles.exchange]}>
        {Number(totalAmountUSDT / amountCoin) && amountCoin ? (
          <Text
            style={[
              stylesStatus.complete,
              stylesGeneral.fz16,
              stylesGeneral.fw500,
            ]}>
            = {totalAmountUSDT / amountCoin}
          </Text>
        ) : (
          <SkeletonPlaceholder.Item
            marginTop={6}
            width={120}
            height={20}
            borderRadius={4}
            backgroundColor="#ededed"
          />
        )}
      </View>
      <Text style={[stylesGeneral.fz16, stylesGeneral.mb10, stylesGeneral.fwb]}>
        Your Walet: {formatUSDT(totalAmountUSDT)} USDT
      </Text>
      <FormInput
        label="Amount Coin"
        placeholder="Enter mount coin"
        keyboardType="number-pad"
        onChangeText={val => handleChange('amountCoin', val)}
        icon={amountCoin}
        color={amountCoin ? 'red' : ''}
        name="exclamation-triangle"
      />
      {amountCoin && (
        <View style={[stylesGeneral.mb5]}>
          <Text>Suggest amount</Text>
          <Text style={[stylesStatus.cancel]}>Min: ...</Text>
          <Text style={[stylesStatus.cancel]}>Max: ...</Text>
        </View>
      )}
      <View style={[styles.amountUsdt, stylesStatus.completebgc]}>
        <Text
          style={[
            styles.amountUsdt_text,
            stylesGeneral.fz16,
            stylesGeneral.fwbold,
            stylesStatus.complete,
          ]}>
          Amount USDT: ...
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
