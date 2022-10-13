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
import {useAppContext} from '../../utils';
import {formatUSDT, formatVND} from '../../utils/format/Money';
import {setAmountUsdt} from '../../app/payloads/form';
import {getUserById} from '../../app/payloads/getById';
import {FormInput, ModalLoading} from '../../components';
import {SVgetUserById} from '../../services/user';
import styles from './CreateWithdrawCss';
import stylesGeneral from '../../styles/General';
import stylesStatus from '../../styles/Status';

export default function CreateWithdraw({navigation}) {
  const {state, dispatch} = useAppContext();
  const {currentUser, amountUsdt, userById} = state;
  const [refreshing, setRefreshing] = React.useState(false);
  const [loading, setLoading] = useState(false);
  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);
  useEffect(() => {
    SVgetUserById({
      id: currentUser?.id,
      dispatch,
      getUserById,
    });
  }, []);
  const handleChangeInput = (name, val) => {
    dispatch(setAmountUsdt(val));
  };
  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
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
        {!userById?.payment?.username &&
        !userById?.payment?.bank?.bankName &&
        !userById?.payment?.bank?.account ? (
          <>
            <Text>You must create your bank account first.</Text>
            <View
              style={[
                styles.btn,
                stylesStatus.confirmbgcbold,
                stylesGeneral.mt10,
              ]}
              onTouchStart={() => navigation.navigate('Profile Payment')}>
              <Text style={[styles.btn_text, stylesStatus.white]}>
                Click here
              </Text>
            </View>
          </>
        ) : (
          <View style={[styles.info_withdraw_container]}>
            <View
              style={[
                styles.info_detail,
                styles.info_detail_border,
                stylesGeneral.mb10,
              ]}>
              <View style={[styles.info_item]}>
                <Text
                  style={[
                    styles.info_item_text,
                    stylesGeneral.fwbold,
                    stylesGeneral.fz16,
                  ]}>
                  Your Wallet
                </Text>
                <Text style={[styles.info_item_text]}>
                  {formatUSDT(userById?.Wallet?.balance)}T
                </Text>
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
                  {userById?.payment?.bank?.bankName || 'No'} -{' '}
                  {userById?.payment?.username || 'No'} -{' '}
                  {userById?.payment?.bank?.account || 'No'}
                </Text>
              </View>
            </View>
            <FormInput
              label="Amount USDT"
              placeholder="0.00"
              keyboardType="number-pad"
              onChangeText={val => handleChangeInput('amountUsdt', val)}
            />
            {amountUsdt * 23000 > 0 && (
              <View style={[styles.info_detail, stylesGeneral.mb10]}>
                <Text
                  style={[
                    styles.receive,
                    stylesGeneral.fwbold,
                    stylesStatus.complete,
                    stylesGeneral.fz16,
                  ]}>
                  Receive (VND): {formatVND(amountUsdt * 23000)}
                </Text>
              </View>
            )}
            <TouchableOpacity
              activeOpacity={0.6}
              style={[
                styles.btn,
                stylesStatus.confirmbgcbold,
                stylesGeneral.mt10,
                !amountUsdt && stylesGeneral.op6,
              ]}
              disabled={!amountUsdt}
              onPress={handleSubmit}>
              <Text style={[styles.btn_text, stylesStatus.white]}>Submit</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      {/* Modal Loading */}
      {loading && <ModalLoading />}
    </ScrollView>
  );
}
