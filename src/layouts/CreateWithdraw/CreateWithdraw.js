/* eslint-disable prettier/prettier */
import {View, Text, ScrollView, RefreshControl, Alert} from 'react-native';
import React, {useState} from 'react';
import {FormInput, ModalLoading} from '../../components';
import {formatUSDT, formatVND} from '../../utils/format/Money';
import styles from './CreateWithdrawCss';
import stylesGeneral from '../../styles/General';
import stylesStatus from '../../styles/Status';

export default function CreateWithdraw({navigation}) {
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
      Alert.alert('Success!', 'Withdraw request was successfully!', [
        {text: 'OK', onPress: () => navigation.navigate('Single Withdraw')},
      ]);
    }, 5000);
  };
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <View style={[styles.container]}>
        <Text>You must create your bank account first.</Text>
        <View
          style={[styles.btn, stylesStatus.vipbgcbold, stylesGeneral.mt10]}
          onTouchStart={() => navigation.navigate('Profile Payment')}>
          <Text style={[styles.btn_text, stylesStatus.white]}>Click here</Text>
        </View>
        <View style={[styles.info_withdraw_container]}>
          <View style={[styles.info_detail, stylesGeneral.mb10]}>
            <View style={[styles.info_item]}>
              <Text
                style={[
                  styles.info_item_text,
                  stylesGeneral.fwbold,
                  stylesGeneral.fz16,
                ]}>
                Your Wallet
              </Text>
              <Text style={[styles.info_item_text]}>{formatUSDT(300000)}T</Text>
            </View>
            <View style={[styles.info_item]}>
              <Text
                style={[
                  styles.info_item_text,
                  stylesGeneral.fwbold,
                  stylesGeneral.fz16,
                ]}>
                Your bank account
              </Text>
              <Text style={[styles.info_item_text]}>
                MB bank - Nguyen Van A - 1234567
              </Text>
            </View>
          </View>
          <FormInput
            label="Amount USDT"
            placeholder="0.00"
            keyboardType="number-pad"
          />
          <View
            style={[
              styles.info_detail,
              stylesGeneral.mb10,
              stylesStatus.completebgcbold,
            ]}>
            <Text
              style={[
                styles.receive,
                stylesGeneral.fwbold,
                stylesStatus.white,
                stylesGeneral.fz16,
              ]}>
              Receive (VND): {formatVND(0)}
            </Text>
          </View>
          <View
            style={[styles.btn, stylesStatus.vipbgcbold, stylesGeneral.mt10]}
            onTouchStart={handleSubmit}>
            <Text style={[styles.btn_text, stylesStatus.white]}>Submit</Text>
          </View>
        </View>
      </View>
      {/* Modal Loading */}
      {loading && progressValue < 1 && <ModalLoading value={progressValue} />}
    </ScrollView>
  );
}
