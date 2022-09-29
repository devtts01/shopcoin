/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
/* eslint-disable react/self-closing-comp */
/* eslint-disable prettier/prettier */
import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  Modal,
  ScrollView,
  TouchableOpacity,
  Alert,
  RefreshControl,
} from 'react-native';
import {FormInput, ModalLoading, SelectAlert} from '../../components';
import {formatVND} from '../../utils/format/Money';
import styles from './CreateDepositsCss';
import stylesGeneral from '../../styles/General';
import stylesStatus from '../../styles/Status';

export default function CreateDeposits({navigation}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [progressValue, setProgressValue] = useState(0.02);
  const [refreshing, setRefreshing] = useState(false);
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

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setProgressValue(0.02);
      Alert.alert('Success!', 'Deposits request was successfully!', [
        {text: 'OK', onPress: () => navigation.navigate('Single Deposits')},
      ]);
    }, 5000);
  };
  return (
    <ScrollView
      style={[styles.container]}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <Text style={[styles.title]}>Create Deposits</Text>
      <FormInput
        label="Amount USDT"
        placeholder="0.00"
        keyboardType="number-pad"
      />
      <SelectAlert
        label="Choose Payment Method"
        onTouchStart={handleModalBank}
      />
      <View style={[styles.deposits_VND]}>
        <Text style={[styles.deposits_money, stylesGeneral.fwbold]}>
          Deposits (VND): {formatVND(72000000)}
        </Text>
      </View>
      <View
        style={[styles.btn_submit, stylesStatus.vipbgcbold]}
        onTouchStart={handleSubmit}>
        <Text style={[stylesStatus.white, stylesGeneral.fwbold]}>Submit</Text>
      </View>
      {/* Modal Bank */}
      <View style={[styles.centeredView]}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(!modalVisible)}>
          <View style={[styles.centeredView]}>
            <View style={[styles.modalView]}>
              <Text style={[styles.modalText]}>Select a bank</Text>
              <View style={[styles.divider]}></View>
              <View style={[styles.bankList]}>
                <ScrollView showsVerticalScrollIndicator={false}>
                  <TouchableOpacity
                    onPress={handleModalBank}
                    activeOpacity={0.7}
                    style={[styles.bankItem]}>
                    <Text style={[stylesGeneral.fwbold]}>ACB</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    style={[styles.bankItem]}>
                    <Text style={[stylesGeneral.fwbold]}>Vietcombank</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    style={[styles.bankItem]}>
                    <Text style={[stylesGeneral.fwbold]}>BIDV</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    style={[styles.bankItem]}>
                    <Text style={[stylesGeneral.fwbold]}>Agribank</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    style={[styles.bankItem]}>
                    <Text style={[stylesGeneral.fwbold]}>ACB</Text>
                  </TouchableOpacity>
                </ScrollView>
              </View>
            </View>
          </View>
        </Modal>
      </View>
      {/* Modal Loading */}
      {loading && progressValue < 1 && <ModalLoading value={progressValue} />}
    </ScrollView>
  );
}
