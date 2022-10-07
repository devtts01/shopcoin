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
import {AlertDialog, Button, Center} from 'native-base';
import {FormInput, ModalLoading, SelectAlert} from '../../components';
import styles from './ProfilePaymentCss';
import stylesGeneral from '../../styles/General';
import stylesStatus from '../../styles/Status';

export default function ProfilePayment({navigation}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const cancelRef = React.useRef(null);
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
      Alert.alert('Success!', 'Your payment has been updated!', [
        {text: 'OK', onPress: () => navigation.navigate('Profile Payment')},
      ]);
    }, 5000);
  };
  const dataBank = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
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
      <Center>
        <AlertDialog
          leastDestructiveRef={cancelRef}
          isOpen={modalVisible}
          onClose={handleModalBank}>
          <AlertDialog.Content>
            <AlertDialog.CloseButton />
            <AlertDialog.Header>Select Bank</AlertDialog.Header>
            <AlertDialog.Body>
              <View style={[styles.bankList]}>
                <ScrollView showsVerticalScrollIndicator={false}>
                  {dataBank.map((item, index) => (
                    <TouchableOpacity
                      key={index}
                      onPress={handleModalBank}
                      activeOpacity={0.7}
                      style={[styles.bankItem]}>
                      <Text style={[stylesGeneral.fwbold]}>ACB</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            </AlertDialog.Body>
            <AlertDialog.Footer>
              <Button.Group space={2}>
                <Button
                  variant="unstyled"
                  onPress={handleModalBank}
                  style={[stylesStatus.confirmbgcbold]}
                  ref={cancelRef}>
                  <Text style={[stylesStatus.white]}>Cancel</Text>
                </Button>
                <Button colorScheme="danger" onPress={handleModalBank}>
                  Submit
                </Button>
              </Button.Group>
            </AlertDialog.Footer>
          </AlertDialog.Content>
        </AlertDialog>
      </Center>
      {/* Modal Loading */}
      {loading && <ModalLoading />}
    </ScrollView>
  );
}
