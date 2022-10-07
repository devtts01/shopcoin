/* eslint-disable prettier/prettier */
/* eslint-disable prettier/prettier */
/* eslint-disable prettier/prettier */
import React, {useCallback, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  RefreshControl,
} from 'react-native';
import {AlertDialog, Button, Center} from 'native-base';
import {FormInput, ModalLoading, SelectAlert} from '../../components';
import {useAppContext} from '../../utils';
import {setFormDeposits} from '../../app/payloads/form';
import {formatVND} from '../../utils/format/Money';
import styles from './CreateDepositsCss';
import stylesGeneral from '../../styles/General';
import stylesStatus from '../../styles/Status';

export default function CreateDeposits({navigation}) {
  const {state, dispatch} = useAppContext();
  const {
    deposits: {amountUSDT, bank},
  } = state;
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
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
  const cancelRef = React.useRef(null);

  const handleChangeInput = (name, val) => {
    dispatch(setFormDeposits({[name]: val}));
    setModalVisible(false);
  };
  const handleSubmit = async () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      Alert.alert('Success!', 'Deposits request was successfully!', [
        {text: 'OK', onPress: () => navigation.navigate('Single Deposits')},
      ]);
      dispatch(
        setFormDeposits({
          amountUSDT: '',
          bank: '',
        }),
      );
    }, 5000);
  };
  const dataBank = [
    {
      id: 1,
      name: 'Vietcombank',
    },
    {
      id: 2,
      name: 'Techcombank',
    },
    {
      id: 3,
      name: 'BIDV',
    },
    {
      id: 4,
      name: 'Vietinbank',
    },
    {
      id: 5,
      name: 'Agribank',
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
        label="Amount USDT"
        placeholder="0.00"
        keyboardType="number-pad"
        onChangeText={val => handleChangeInput('amountUSDT', val)}
      />
      <SelectAlert
        label="Choose Payment Method"
        onTouchStart={handleModalBank}
        value={bank}
      />
      <View style={[styles.deposits_VND]}>
        <Text
          style={[
            styles.deposits_money,
            stylesGeneral.fwbold,
            stylesStatus.confirm,
          ]}>
          Deposits (VND): {formatVND(72000000)}
        </Text>
      </View>
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
      {/* Modal Bank */}
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
                      onPress={() => handleChangeInput('bank', item.name)}
                      activeOpacity={0.7}
                      style={[styles.bankItem]}>
                      <Text style={[stylesGeneral.fwbold]}>{item.name}</Text>
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
