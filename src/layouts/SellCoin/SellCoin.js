/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
import {
  View,
  Text,
  ScrollView,
  RefreshControl,
  Alert,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import styles from './SellCoinCss';
import {useAppContext} from '../../utils';
import {getById} from '../../app/payloads/getById';
import {SVgetACoin} from '../../services/coin';
import stylesGeneral from '../../styles/General';
import {FormInput, ImageCp, ModalLoading} from '../../components';
import {formatUSDT} from '../../utils/format/Money';
import stylesStatus from '../../styles/Status';
import {setAmountSell} from '../../app/payloads/form';

export default function SellCoin({navigation, route}) {
  const {item, id} = route.params;
  const {state, dispatch} = useAppContext();
  const {
    amountSell,
    data: {dataById},
  } = state;
  const [refreshing, setRefreshing] = React.useState(false);
  const [loading, setLoading] = useState(false);
  const handleChangeInput = (name, val) => {
    dispatch(setAmountSell(val));
  };
  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);
  useEffect(() => {
    SVgetACoin({
      id,
      dispatch,
      getById,
    });
  }, []);
  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      Alert.alert('Success!', `${item?.symbol} has been sold!`, [
        {
          text: 'Continue',
          onPress: () => navigation.navigate('My Coin'),
        },
        {
          text: 'View History',
          onPress: () => navigation.navigate('Sell History'),
        },
      ]);
    }, 5000);
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
        <ImageCp uri={item?.logo} />
        <View style={[styles.nameCoin, stylesGeneral.ml12]}>
          <Text style={[styles.name]}>{item?.symbol}</Text>
          <Text style={[styles.desc, stylesGeneral.fz16]}>Bitcoin</Text>
        </View>
      </View>
      <View style={[styles.info_sellCoin]}>
        <View style={[styles.row, stylesGeneral.flexRow]}>
          <Text style={[styles.row_text]}>Quantity</Text>
          <Text style={[styles.row_desc]}>{item?.amount}</Text>
        </View>
        <View style={[styles.row, stylesGeneral.flexRow]}>
          <Text style={[styles.row_text]}>USDT</Text>
          <Text style={[styles.row_desc]}>
            ~ {formatUSDT(item?.amountUsd)}T
          </Text>
        </View>
        <View style={[styles.row, stylesGeneral.flexRow]}>
          <Text style={[styles.row_text]}>Average buy price</Text>
          <Text style={[styles.row_desc]}>14.58</Text>
        </View>
        <View style={[styles.row, stylesGeneral.flexRow]}>
          <Text style={[styles.row_text]}>Coin price</Text>
          <SkeletonPlaceholder.Item
            width={100}
            height={20}
            borderRadius={4}
            backgroundColor="#ededed"
          />
        </View>
        <View style={[styles.row_single]}>
          <FormInput
            label="Amount Sell"
            placeholder="0.00"
            onChangeText={val => handleChangeInput('amountSell', val)}
            keyboardType="number-pad"
            // icon
            // name="exclamation-triangle"
            // color="red"
          />
          <Text
            style={[
              stylesGeneral.mb10,
              stylesGeneral.fz16,
              stylesGeneral.fwbold,
              stylesStatus.complete,
            ]}>
            Receive: {formatUSDT(0)}T
          </Text>
        </View>
      </View>
      <View style={[styles.btn_container]}>
        <TouchableOpacity
          activeOpacity={0.6}
          disabled={!amountSell}
          style={[
            styles.btn,
            !amountSell && stylesGeneral.op6,
            stylesStatus.confirmbgcbold,
            stylesGeneral.mr10,
          ]}
          onTouchStart={handleSubmit}>
          <Text style={[styles.btn_text, stylesStatus.white]}>Sell Coin</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.6}
          style={[styles.btn, stylesStatus.vipbgcbold]}>
          <Text style={[styles.btn_text, stylesStatus.white]}>Sell All</Text>
        </TouchableOpacity>
      </View>
      {/* Modal Loading */}
      {loading && <ModalLoading />}
    </ScrollView>
  );
}
