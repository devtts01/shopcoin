/* eslint-disable prettier/prettier */
import {View, Text, ScrollView, RefreshControl, Alert} from 'react-native';
import React, {useState} from 'react';
import {formatUSDT, formatVND} from '../../utils/format/Money';
import styles from './SingleWithdrawCss';
import stylesGeneral from '../../styles/General';
import stylesStatus from '../../styles/Status';
import {FormInput, ModalLoading} from '../../components';

export default function SingleWithdraw({navigation}) {
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
      Alert.alert('Success!', 'Withdraw code confirm successfully!', [
        {text: 'OK', onPress: () => navigation.navigate('Withdraw')},
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
      <Text style={[styles.title]}>Detail</Text>
      <View style={[styles.info_withdraw, stylesGeneral.mb10]}>
        <View style={[styles.info_item, stylesGeneral.flexRow]}>
          <Text style={[styles.info_item_text]}>Status</Text>
          <Text
            style={[
              styles.info_item_desc,
              stylesStatus.completebgc,
              stylesStatus.status,
            ]}>
            Complete
          </Text>
        </View>
        <View style={[styles.info_item, stylesGeneral.flexRow]}>
          <Text style={[styles.info_item_text]}>Created At</Text>
          <Text style={[styles.info_item_desc]}>
            {new Date().toISOString()}
          </Text>
        </View>
        <View style={[styles.info_item, stylesGeneral.flexRow]}>
          <Text style={[styles.info_item_text]}>Amount USDT</Text>
          <Text style={[styles.info_item_desc]}>{formatUSDT(300000)}T</Text>
        </View>
        <View style={[styles.info_item, stylesGeneral.flexRow]}>
          <Text style={[styles.info_item_text]}>Amount VND</Text>
          <Text style={[styles.info_item_desc]}>{formatVND(72000000)}</Text>
        </View>
        <View style={[styles.info_item, stylesGeneral.flexRow]}>
          <Text style={[styles.info_item_text]}>Method</Text>
          <View style={[stylesGeneral.flexEnd]}>
            <Text style={[styles.info_item_desc]}>MB bank</Text>
            <Text style={[styles.info_item_desc]}>Nguyen Van A</Text>
            <Text style={[styles.info_item_desc]}>1234567</Text>
          </View>
        </View>
      </View>
      <View style={[styles.verify_code_container]}>
        <FormInput label="Enter the following code" />
        <Text style={[stylesGeneral.mb5, stylesGeneral.fz16]}>
          This code is valid in 5 minutes.
        </Text>
        <Text
          style={[stylesGeneral.fwbold, stylesStatus.vip, stylesGeneral.mb10]}>
          Resend Code
        </Text>
        <View
          style={[styles.btn, stylesStatus.vipbgcbold]}
          onTouchStart={handleSubmit}>
          <Text style={[styles.btn_text, stylesStatus.white]}>Submit</Text>
        </View>
      </View>
      <View
        style={[
          styles.btn,
          styles.btn_margin,
          stylesStatus.cancelbgcbold,
          stylesGeneral.mt10,
        ]}
        onTouchStart={() => navigation.navigate('Withdraw')}>
        <Text style={[styles.btn_text, stylesStatus.white]}>Cancel</Text>
      </View>
      {/* Modal Loading */}
      {loading && progressValue < 1 && <ModalLoading value={progressValue} />}
    </ScrollView>
  );
}
