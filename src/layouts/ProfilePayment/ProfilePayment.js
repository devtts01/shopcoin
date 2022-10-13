/* eslint-disable prettier/prettier */
/* eslint-disable prettier/prettier */
import {
  View,
  Text,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {AlertDialog, Button, Center} from 'native-base';
import {FormInput, ModalLoading, SelectAlert} from '../../components';
import {useAppContext} from '../../utils';
import {setCurrentUser} from '../../app/payloads/user';
import {setMessage} from '../../app/payloads/message';
import requestRefreshToken from '../../utils/axios/refreshToken';
import styles from './ProfilePaymentCss';
import stylesGeneral from '../../styles/General';
import stylesStatus from '../../styles/Status';
import {setFormProfilePayment} from '../../app/payloads/form';
import {addBankInfo} from '../../services/payment';

export default function ProfilePayment({navigation}) {
  const {state, dispatch} = useAppContext();
  const {
    currentUser,
    profilePayment: {bank, accountName, accountNumber},
  } = state;
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
  const handleChangeInput = (name, val) => {
    dispatch(setFormProfilePayment({[name]: val}));
    setModalVisible(false);
  };
  const addBankInfoAPI = data => {
    addBankInfo({
      id: currentUser?.id,
      bank,
      accountName,
      accountNumber,
      token: data?.token,
      setLoading,
      navigation,
    });
  };
  const handleSubmit = async () => {
    try {
      requestRefreshToken(
        currentUser,
        addBankInfoAPI,
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
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <Text style={[styles.title]}>Payment</Text>
      <Text style={[styles.desc]}>
        Support the following pyayment methods to load or withdraw funds.
      </Text>
      <SelectAlert
        label="Choose bank"
        onTouchStart={handleModalBank}
        value={bank}
      />
      <FormInput
        label="Account name"
        placeholder="Enter account name"
        onChangeText={val => handleChangeInput('accountName', val)}
      />
      <FormInput
        label="Account number"
        keyboardType="number-pad"
        placeholder="Enter account number"
        onChangeText={val => handleChangeInput('accountNumber', val)}
      />
      <TouchableOpacity
        style={[
          styles.btn,
          (!bank || !accountName || !accountNumber) && stylesGeneral.op6,
          stylesStatus.confirmbgcbold,
        ]}
        onPress={handleSubmit}
        disabled={!bank || !accountName || !accountNumber}>
        <Text style={[styles.btn_text, stylesStatus.white]}>Submit</Text>
      </TouchableOpacity>
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
                      <Text style={[stylesGeneral.fwbold]}>{item?.name}</Text>
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
