/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
import {
  View,
  Text,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
// import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {useAppContext} from '../../utils';
import {formatUSDT, precisionRound} from '../../utils/format/Money';
import {getBySymbol, getById} from '../../app/payloads/getById';
import {setAmountSell} from '../../app/payloads/form';
import {setCurrentUser} from '../../app/payloads/user';
import {setMessage} from '../../app/payloads/message';
import socketIO from 'socket.io-client';
import {SVgetACoin, SVgetCoinBySymbol, SVsellCoin} from '../../services/coin';
import {FormInput, ImageCp, ModalLoading, RowDetail} from '../../components';
import styles from './SellCoinCss';
import stylesStatus from '../../styles/Status';
import stylesGeneral from '../../styles/General';
import requestRefreshToken from '../../utils/axios/refreshToken';
import {setPriceCoinSocket} from '../../app/payloads/socket';

export default function SellCoin({navigation, route}) {
  const {item, symbol} = route.params;
  const {state, dispatch} = useAppContext();
  const {
    priceCoinSocket,
    amountSell,
    currentUser,
    data: {dataBySymbol, dataById},
  } = state;
  const [refreshing, setRefreshing] = React.useState(false);
  const [loading, setLoading] = useState(false);
  const [isProcess, setIsProcess] = useState(false);
  const handleChangeInput = (name, val) => {
    dispatch(setAmountSell(val));
  };
  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    dispatch(setAmountSell(''));
    wait(2000).then(() => setRefreshing(false));
  }, []);
  useEffect(() => {
    SVgetCoinBySymbol({
      symbol,
      dispatch,
      getBySymbol,
    });
    SVgetACoin({
      id: dataBySymbol?._id,
      dispatch,
      getById,
    });
    const socket = socketIO('https://apishopcoin.4eve.site/', {
      jsonp: false,
    });
    socket.on(`send-data-${dataById?.symbol}`, data => {
      dispatch(setPriceCoinSocket(data));
    });
    return () => {
      socket.disconnect();
      socket.close();
    };
  }, []);
  const sellCoinAPI = data => {
    SVsellCoin({
      gmailUser: currentUser?.email,
      amount: amountSell ? amountSell : item?.amount,
      amountUsd: item?.coin?.price * (amountSell ? amountSell : item?.amount),
      symbol: item?.coin?.symbol,
      price: item?.coin?.price,
      token: data?.token,
      setLoading,
      navigation,
      setIsProcess,
    });
  };
  const handleSubmit = async () => {
    try {
      setIsProcess(true);
      requestRefreshToken(
        currentUser,
        sellCoinAPI,
        state,
        dispatch,
        setCurrentUser,
        setMessage,
      );
      dispatch(setAmountSell(''));
    } catch (err) {
      console.log(err);
    }
  };
  const isDisabled =
    parseFloat(amountSell) < 0.01 ||
    parseFloat(amountSell) > item?.amount ||
    (amountSell && !Number(amountSell));
  const suggestMax = precisionRound(item?.amount);
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
        <ImageCp uri={item?.coin?.logo} />
        <View style={[styles.nameCoin, stylesGeneral.ml12]}>
          <Text style={[styles.name, stylesGeneral.text_black]}>
            {item?.coin?.symbol?.replace('USDT', '')}
          </Text>
          <Text
            style={[styles.desc, stylesGeneral.fz16, stylesGeneral.text_black]}>
            {dataBySymbol?.fullName}
          </Text>
        </View>
      </View>
      <View style={[styles.info_sellCoin]}>
        <RowDetail title="Quantity" text={item?.amount} />
        <RowDetail
          title="USD"
          text={`~ ${formatUSDT(item?.amount * item?.coin?.price)}`}
        />
        <RowDetail
          title="Average buy price"
          text={priceCoinSocket?.weightedAvgPrice || 'unknown'}
        />
        <RowDetail title="Coin price" text={item?.coin?.price} />
        <View style={[styles.row_single]}>
          <FormInput
            label="Amount Sell"
            placeholder="0.00"
            onChangeText={val =>
              handleChangeInput('amountSell', val.replace(',', '.'))
            }
            // keyboardType="number-pad"
            icon={isDisabled}
            color={isDisabled ? 'red' : ''}
            name="exclamation-triangle"
          />
          {amountSell && (
            <View style={[stylesGeneral.mb5]}>
              <Text style={[stylesGeneral.text_black]}>Suggest amount</Text>
              <Text style={[stylesStatus.cancel]}>Min: 0.01</Text>
              <Text style={[stylesStatus.cancel]}>Max: {suggestMax}</Text>
            </View>
          )}
          {parseFloat(amountSell * item?.coin?.price) >= 0 && amountSell && (
            <Text
              style={[
                stylesGeneral.mb10,
                stylesGeneral.fz16,
                stylesGeneral.fwbold,
                stylesStatus.complete,
              ]}>
              Receive: {formatUSDT(parseFloat(amountSell * item?.coin?.price))}
            </Text>
          )}
        </View>
      </View>
      <View style={[styles.btn_container]}>
        <TouchableOpacity
          activeOpacity={0.6}
          disabled={!amountSell || isDisabled || isProcess}
          style={[
            styles.btn,
            (!amountSell || isDisabled || isProcess) && stylesGeneral.op6,
            stylesStatus.confirmbgcbold,
            stylesGeneral.mr10,
          ]}
          onPress={handleSubmit}>
          <Text style={[styles.btn_text, stylesStatus.white]}>
            {isProcess ? <ActivityIndicator color="white" /> : 'Sell Coin'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleSubmit}
          activeOpacity={0.6}
          style={[styles.btn, stylesStatus.vipbgcbold]}>
          <Text style={[styles.btn_text, stylesStatus.white]}>Sell All</Text>
        </TouchableOpacity>
      </View>
      {loading && <ModalLoading />}
    </ScrollView>
  );
}
