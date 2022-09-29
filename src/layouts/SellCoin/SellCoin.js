/* eslint-disable prettier/prettier */
import {
  View,
  Text,
  ScrollView,
  RefreshControl,
  Image,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import styles from './SellCoinCss';
import stylesGeneral from '../../styles/General';
import {FormInput, ModalLoading} from '../../components';
import {formatUSDT} from '../../utils/format/Money';
import stylesStatus from '../../styles/Status';

export default function SellCoin({navigation, route}) {
  const [refreshing, setRefreshing] = React.useState(false);
  const [loading, setLoading] = useState(false);
  const [progressValue, setProgressValue] = useState(0.02);
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
      Alert.alert('Success!', 'ETC has been sold!', [
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
        <Image
          source={{
            uri: 'https://img.capital.com/imgs/articles/1200x627x1/shutterstock_1923715325.jpg',
          }}
          style={[styles.image]}
          resizeMode="cover"
        />
        <View style={[styles.nameCoin, stylesGeneral.ml12]}>
          <Text style={[styles.name]}>BTC</Text>
          <Text style={[styles.desc, stylesGeneral.fz16]}>Bitcoin</Text>
        </View>
      </View>
      <View style={[styles.info_sellCoin]}>
        <View style={[styles.row, stylesGeneral.flexRow]}>
          <Text style={[styles.row_text]}>Quantity</Text>
          <Text style={[styles.row_desc]}>1</Text>
        </View>
        <View style={[styles.row, stylesGeneral.flexRow]}>
          <Text style={[styles.row_text]}>USDT</Text>
          <Text style={[styles.row_desc]}>~ 4.56 USDT</Text>
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
            // icon
            // name="exclamation-triangle"
            // color="red"
          />
          <Text style={[stylesGeneral.mb5, stylesGeneral.fz16]}>
            Receive: {formatUSDT(0)}T
          </Text>
        </View>
      </View>
      <View
        style={[styles.btn, stylesStatus.vipbgcbold]}
        onTouchStart={handleSubmit}>
        <Text style={[styles.btn_text, stylesStatus.white]}>Sell Coin</Text>
      </View>
      <View
        style={[styles.btn, stylesStatus.completebgcbold, stylesGeneral.mt10]}>
        <Text style={[styles.btn_text, stylesStatus.white]}>Sell All</Text>
      </View>
      {/* Modal Loading */}
      {loading && progressValue < 1 && <ModalLoading value={progressValue} />}
    </ScrollView>
  );
}
