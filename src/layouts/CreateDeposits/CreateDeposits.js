/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
/* eslint-disable prettier/prettier */
/* eslint-disable prettier/prettier */
import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import {
  FormInput,
  ModalBank,
  ModalLoading,
  SelectAlert,
} from '../../components';
import {useAppContext} from '../../utils';
import {formatVND} from '../../utils/format/Money';
import {setFormDeposits} from '../../app/payloads/form';
import {setCurrentUser} from '../../app/payloads/user';
import {setMessage} from '../../app/payloads/message';
import requestRefreshToken from '../../utils/axios/refreshToken';
import styles from './CreateDepositsCss';
import stylesGeneral from '../../styles/General';
import stylesStatus from '../../styles/Status';
import {SVcreateDeposits} from '../../services/deposits';
import {SVgetRateDepositWithdraw} from '../../services/rate';
import {getRateDepositWithdraw, getUserById} from '../../app/payloads/getById';
import {SVgetUserById} from '../../services/user';

export default function CreateDeposits({navigation}) {
  const {state, dispatch} = useAppContext();
  const {
    currentUser,
    userById,
    rateDepositWithdraw,
    deposits: {amountUSDT, bank},
  } = state;
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  useEffect(() => {
    SVgetUserById({
      id: currentUser?.id,
      dispatch,
      getUserById,
    });
  }, []);
  useEffect(() => {
    SVgetRateDepositWithdraw({
      numberBank: userById?.payment?.bank?.account,
      dispatch,
      getRateDepositWithdraw,
    });
  }, [amountUSDT]);
  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);
  const handleModalBank = () => {
    setModalVisible(!modalVisible);
  };
  const handleChange = (name, val) => {
    dispatch(setFormDeposits({[name]: val}));
    setModalVisible(false);
  };
  const createDepositsAPI = data => {
    SVcreateDeposits({
      amount: amountUSDT,
      email: currentUser.email,
      amountVnd: parseFloat(amountUSDT * 23000),
      token: data?.token,
      setLoading,
      dispatch,
      navigation,
      setFormDeposits,
    });
  };
  const handleSubmit = async () => {
    try {
      requestRefreshToken(
        currentUser,
        createDepositsAPI,
        state,
        dispatch,
        setCurrentUser,
        setMessage,
      );
    } catch (err) {
      console.log(err);
    }
  };
  const dataBank = [
    {
      id: 1,
      name: 'ACB',
    },
  ];
  return (
    <ScrollView
      style={[styles.container]}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <Text style={[styles.title]}>Create Deposits</Text>
      <FormInput
        label="Amount USD"
        placeholder="0.00"
        keyboardType="number-pad"
        onChangeText={val => handleChange('amountUSDT', val)}
      />
      <SelectAlert
        label="Choose Payment Method"
        onTouchStart={handleModalBank}
        value={bank}
      />
      {amountUSDT * rateDepositWithdraw?.rateDeposit > 0 && (
        <View style={[styles.deposits_VND]}>
          <Text
            style={[
              styles.deposits_money,
              stylesGeneral.fwbold,
              stylesStatus.confirm,
            ]}>
            Deposits (VND):{' '}
            {formatVND(amountUSDT * rateDepositWithdraw?.rateDeposit)}
          </Text>
        </View>
      )}
      <TouchableOpacity
        disabled={!amountUSDT || !bank}
        activeOpacity={0.6}
        style={[
          styles.btn_submit,
          (!amountUSDT || !bank) && stylesGeneral.op6,
          stylesStatus.confirmbgcbold,
        ]}
        onPress={handleSubmit}>
        <Text style={[stylesStatus.white, stylesGeneral.fwbold]}>Submit</Text>
      </TouchableOpacity>
      <ModalBank
        modalVisible={modalVisible}
        handleModalBank={handleModalBank}
        handleChange={handleChange}
        dataBank={dataBank}
      />
      {loading && <ModalLoading />}
    </ScrollView>
  );
}
