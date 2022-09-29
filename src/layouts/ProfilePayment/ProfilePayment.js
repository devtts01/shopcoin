/* eslint-disable prettier/prettier */
/* eslint-disable react/self-closing-comp */
/* eslint-disable prettier/prettier */
import {
  View,
  Text,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
  Modal,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import {FormInput, ModalLoading, SelectAlert} from '../../components';
import styles from './ProfilePaymentCss';
import stylesGeneral from '../../styles/General';
import stylesStatus from '../../styles/Status';

export default function ProfilePayment({navigation}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [progressValue, setProgressValue] = useState(0.02);
  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };
  const onRefresh = React.useCallback(() => {
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
      Alert.alert('Success!', 'Your payment has been updated!', [
        {text: 'OK', onPress: () => navigation.navigate('Profile Payment')},
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
      <Text style={[styles.title]}>Payment</Text>
      <Text style={[styles.desc]}>
        Support the following pyayment methods to load or withdraw funds.
      </Text>
      <SelectAlert label="Choose bank" onTouchStart={handleModalBank} />
      <FormInput label="Account name" placeholder="Enter account name" />
      <FormInput
        label="Account number"
        keyboardType="number-pad"
        placeholder="Enter account number"
      />
      <View
        style={[styles.btn, stylesStatus.vipbgcbold]}
        onTouchStart={handleSubmit}>
        <Text style={[styles.btn_text, stylesStatus.white]}>Submit</Text>
      </View>
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
