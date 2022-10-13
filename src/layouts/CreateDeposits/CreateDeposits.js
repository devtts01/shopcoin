/* eslint-disable prettier/prettier */
/* eslint-disable prettier/prettier */
/* eslint-disable prettier/prettier */
import React, {useCallback, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import {AlertDialog, Button, Center} from 'native-base';
import {FormInput, ModalLoading, SelectAlert} from '../../components';
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

export default function CreateDeposits({navigation}) {
  const {state, dispatch} = useAppContext();
  const {
    currentUser,
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
      {amountUSDT * 23000 > 0 && (
        <View style={[styles.deposits_VND]}>
          <Text
            style={[
              styles.deposits_money,
              stylesGeneral.fwbold,
              stylesStatus.confirm,
            ]}>
            Deposits (VND): {formatVND(amountUSDT * 23000)}
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
