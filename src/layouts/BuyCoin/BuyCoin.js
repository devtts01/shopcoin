/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
import {
  View,
  Text,
  ScrollView,
  RefreshControl,
  Image,
  Alert,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import styles from './BuyCoinCss';
import {useAppContext} from '../../utils';
import stylesGeneral from '../../styles/General';
import {SVgetACoin} from '../../services/coin';
import {getById} from '../../app/payloads/getById';
import {formatUSDT} from '../../utils/format/Money';
import {FormInput, ModalLoading} from '../../components';
import stylesStatus from '../../styles/Status';

export default function BuyCoin({navigation, route}) {
  const {state, dispatch} = useAppContext();
  const {
    data: {dataById},
  } = state;
  const {id} = route.params;
  const dataId = dataById?.data;
  const [refreshing, setRefreshing] = React.useState(false);
  const [loading, setLoading] = useState(false);
  const [progressValue, setProgressValue] = useState(0.02);
  useEffect(() => {
    SVgetACoin({
      id,
      getById,
      dispatch,
    });
  }, []);
  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);
  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setProgressValue(0.02);
      Alert.alert('Success!', 'BTC has been bought!', [
        {
          text: 'Continue',
          onPress: () => navigation.navigate('Home'),
        },
        {
          text: 'View History',
          onPress: () => navigation.navigate('History'),
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
        <Image
          source={{
            uri: 'https://img.capital.com/imgs/articles/1200x627x1/shutterstock_1923715325.jpg',
          }}
          style={[styles.image]}
          resizeMode="cover"
        />
        <View style={[styles.nameCoin, stylesGeneral.ml12]}>
          <Text style={[styles.name]}>{dataId?.symbol}</Text>
          <Text style={[styles.desc]}>{dataId?.fullName}</Text>
        </View>
      </View>
      <View style={[styles.exchange]}>
        <SkeletonPlaceholder.Item
          marginTop={6}
          width="100%"
          height={20}
          borderRadius={4}
          backgroundColor="#ededed"
        />
      </View>
      <Text style={[stylesGeneral.fz16, stylesGeneral.mb10, stylesGeneral.fwb]}>
        Your Walet: {formatUSDT(25000)}T
      </Text>
      <FormInput
        label="Amount Coin"
        keyboardType="number-pad"
        // icon
        // color="red"
        // name="exclamation-triangle"
      />
      <View style={[styles.amountUsdt, stylesStatus.completebgc]}>
        <Text
          style={[
            styles.amountUsdt_text,
            stylesGeneral.fz16,
            stylesGeneral.fwbold,
            stylesStatus.complete,
          ]}>
          Amount USDT: 82.25
        </Text>
      </View>
      <TouchableOpacity
        activeOpacity={0.8}
        style={[styles.btn, stylesStatus.confirmbgcbold]}
        onPress={handleSubmit}>
        <Text style={[styles.btn_text, stylesStatus.white]}>Submit</Text>
      </TouchableOpacity>
      {/* Modal Loading */}
      {loading && progressValue < 1 && <ModalLoading value={progressValue} />}
    </ScrollView>
  );
}
