/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
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
import {useAppContext} from '../../utils';
import {formatUSDT, formatVND, precisionRound} from '../../utils/format/Money';
import {setFormWithdraw} from '../../app/payloads/form';
import {getUserById, getRateWithdraw} from '../../app/payloads/getById';
import requestRefreshToken from '../../utils/axios/refreshToken';
import {FormInput, ModalLoading} from '../../components';
import {SVgetUserById} from '../../services/user';
import {setCurrentUser} from '../../app/payloads/user';
import {setMessage} from '../../app/payloads/message';
import {routersMain} from '../../routers/Main';
import styles from './CreateWithdrawCss';
import stylesGeneral from '../../styles/General';
import stylesStatus from '../../styles/Status';
import {SVcreateWithdraw} from '../../services/withdraw';
import {SVgetRateWithdraw} from '../../services/rate';

export default function CreateWithdraw({navigation}) {
  const {state, dispatch} = useAppContext();
  const [error, setError] = useState('');
  const {
    currentUser,
    rateWithdraw,
    withdraw: {amountUSDT},
    userById,
    rateDepositWithdraw,
  } = state;
  const [refreshing, setRefreshing] = React.useState(false);
  const [loading, setLoading] = useState(false);
  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    SVgetUserById({
      id: currentUser?.id,
      dispatch,
      getUserById,
    });
    SVgetRateWithdraw({
      dispatch,
      getRateWithdraw,
    });
    dispatch(
      setFormWithdraw({
        ...state.withdraw,
        amountUSDT: '',
      }),
    );
    wait(2000).then(() => setRefreshing(false));
  }, []);
  useEffect(() => {
    SVgetUserById({
      id: currentUser?.id,
      dispatch,
      getUserById,
    });
    SVgetRateWithdraw({
      dispatch,
      getRateWithdraw,
    });
  }, []);
  const handleChange = (name, val) => {
    dispatch(
      setFormWithdraw({
        [name]: val,
      }),
    );
  };
  const createWithdrawAPI = data => {
    SVcreateWithdraw({
      amountUSD: parseFloat(amountUSDT),
      amountVnd: precisionRound(amountUSDT * rateWithdraw),
      id: currentUser?.id,
      setLoading,
      dispatch,
      navigation,
      token: data?.token,
      setFormWithdraw,
    });
  };
  const handleSubmit = () => {
    try {
      requestRefreshToken(
        currentUser,
        createWithdrawAPI,
        state,
        dispatch,
        setCurrentUser,
        setMessage,
      );
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <View style={[styles.header_container]}>
        <Text style={[styles.title, stylesGeneral.text_black]}>
          Create Withdraw
        </Text>
        <Text
          style={[
            stylesGeneral.fz16,
            stylesStatus.cancel,
            stylesGeneral.fwbold,
          ]}>
          Rate (VCB): {formatVND(rateWithdraw)}
        </Text>
      </View>
      <View style={[styles.container]}>
        {!userById?.payment?.username ||
        !userById?.payment?.bank?.bankName ||
        !userById?.payment?.bank?.account ? (
          <>
            <Text style={[stylesGeneral.text_black]}>
              You must create your bank account first.
            </Text>
            <View
              style={[
                styles.btn,
                stylesStatus.confirmbgcbold,
                stylesGeneral.mt10,
              ]}
              onTouchStart={() =>
                navigation.navigate(routersMain.ProfilePayment)
              }>
              <Text style={[styles.btn_text, stylesStatus.white]}>
                Add bank info
              </Text>
            </View>
          </>
        ) : !userById?.uploadCCCDFont ||
          !userById?.uploadCCCDBeside ||
          !userById?.uploadLicenseFont ||
          !userById?.uploadLicenseBeside ? (
          <>
            <Text style={[stylesGeneral.text_black]}>
              You must upload documents on the first withdraw.
            </Text>
            <View
              style={[
                styles.btn,
                stylesStatus.confirmbgcbold,
                stylesGeneral.mt10,
              ]}
              onTouchStart={() =>
                navigation.navigate(routersMain.UploadDoument)
              }>
              <Text style={[styles.btn_text, stylesStatus.white]}>
                Upload documents
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
                    stylesGeneral.text_black,
                  ]}>
                  Your Wallet
                </Text>
                <Text style={[styles.info_item_text, stylesGeneral.text_black]}>
                  {formatUSDT(userById?.Wallet?.balance)}
                </Text>
              </View>
              <View style={[styles.info_item]}>
                <Text
                  style={[
                    styles.info_item_text,
                    stylesGeneral.fwbold,
                    stylesGeneral.fz16,
                    stylesGeneral.text_black,
                  ]}>
                  Your bank account
                </Text>
                <Text style={[styles.info_item_text, stylesGeneral.text_black]}>
                  {userById?.payment?.bank?.bankName || 'No'} -{' '}
                  {userById?.payment?.username || 'No'} -{' '}
                  {userById?.payment?.bank?.account || 'No'}
                </Text>
              </View>
            </View>
            <FormInput
              label="Amount USD"
              placeholder="0.00"
              // keyboardType="number-pad"
              onChangeText={val => handleChange('amountUSDT', val)}
              icon={error}
              color={error ? 'red' : ''}
              name="exclamation-triangle"
            />
            {(parseFloat(amountUSDT) < 10 ||
              (amountUSDT && !Number(amountUSDT))) && (
              <View style={[stylesGeneral.mb5]}>
                <Text style={[stylesStatus.cancel]}>
                  {amountUSDT && !Number(amountUSDT)
                    ? 'Amount must be a number'
                    : 'Minimum withdrawal amount is 10 USD'}
                </Text>
              </View>
            )}
            {amountUSDT * rateWithdraw > 0 && (
              <View style={[styles.info_detail, stylesGeneral.mb10]}>
                <Text
                  style={[
                    styles.receive,
                    stylesGeneral.fwbold,
                    stylesStatus.complete,
                    stylesGeneral.fz16,
                  ]}>
                  Receive (VND): {formatVND(amountUSDT * rateWithdraw)}
                </Text>
              </View>
            )}
            <TouchableOpacity
              activeOpacity={0.6}
              style={[
                styles.btn,
                stylesStatus.confirmbgcbold,
                stylesGeneral.mt10,
                (!amountUSDT ||
                  parseFloat(amountUSDT) < 10 ||
                  (amountUSDT && !Number(amountUSDT))) &&
                  stylesGeneral.op6,
              ]}
              disabled={
                !amountUSDT || !!error || (amountUSDT && !Number(amountUSDT))
              }
              onPress={handleSubmit}>
              <Text style={[styles.btn_text, stylesStatus.white]}>Submit</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      {loading && <ModalLoading />}
    </ScrollView>
  );
}
