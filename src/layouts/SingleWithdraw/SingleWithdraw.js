/* eslint-disable prettier/prettier */
import {
  View,
  Text,
  ScrollView,
  RefreshControl,
  Alert,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {useAppContext} from '../../utils';
import {formatUSDT, formatVND} from '../../utils/format/Money';
import {setCodeValue} from '../../app/payloads/form';
import {FormInput, ModalLoading} from '../../components';
import styles from './SingleWithdrawCss';
import stylesGeneral from '../../styles/General';
import stylesStatus from '../../styles/Status';
import {dateFormat} from '../../utils/format/Date';
import {
  SVcheckCode,
  SVcreateWithdraw,
  SVdeleteWithdraw,
} from '../../services/withdraw';
import {setCurrentUser} from '../../app/payloads/user';
import {setMessage} from '../../app/payloads/message';
import requestRefreshToken from '../../utils/axios/refreshToken';

export default function SingleWithdraw({navigation, route}) {
  const {data} = route.params;
  const {state, dispatch} = useAppContext();
  const {
    currentUser,
    codeVerify,
    withdraw: {amountUSDT},
  } = state;
  const [refreshing, setRefreshing] = React.useState(false);
  const [loading, setLoading] = useState(false);
  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);
  const handleChangeInput = (name, val) => {
    dispatch(setCodeValue(val));
  };
  const createWithdrawAPI = dataAPI => {
    SVcheckCode({
      code: codeVerify,
      token: dataAPI?.token,
      setLoading,
      navigation,
    });
  };
  const handleSubmit = async () => {
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
  const handleCancel = async id => {
    SVdeleteWithdraw({
      id: id,
      setLoading,
      navigation,
    });
  };
  return (
    <ScrollView
      style={[styles.container]}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <Text style={[styles.title]}>Detail</Text>
      <View style={[styles.info_withdraw, stylesGeneral.mb10]}>
        <View style={[styles.info_item, stylesGeneral.flexRow]}>
          <Text style={[styles.info_item_text]}>Status</Text>
          <Text
            style={[
              styles.info_item_desc,
              stylesStatus.status,
              data?.status.toLowerCase().replace(' ', '') === 'onhold'
                ? stylesStatus.vipbgc
                : data?.status.toLowerCase() === 'completed' ||
                  data?.status.toLowerCase() === 'complete'
                ? stylesStatus.completebgc
                : data?.status.toLowerCase() === 'canceled' ||
                  data?.status.toLowerCase() === 'cancel'
                ? stylesStatus.cancelbgc
                : data?.status.toLowerCase() === 'confirmed' ||
                  data?.status.toLowerCase() === 'confirm'
                ? stylesStatus.confirmbgc
                : stylesStatus.demobgc,
            ]}>
            {data?.status}
          </Text>
        </View>
        <View style={[styles.info_item, stylesGeneral.flexRow]}>
          <Text style={[styles.info_item_text]}>Created At</Text>
          <Text style={[styles.info_item_desc]}>
            {dateFormat(data?.createdAt, 'DD/MM/YYYY')}
          </Text>
        </View>
        <View style={[styles.info_item, stylesGeneral.flexRow]}>
          <Text style={[styles.info_item_text]}>Amount USDT</Text>
          <Text style={[styles.info_item_desc]}>
            {formatUSDT(data?.amount)}T
          </Text>
        </View>
        <View style={[styles.info_item, stylesGeneral.flexRow]}>
          <Text style={[styles.info_item_text]}>Amount VND</Text>
          <Text style={[styles.info_item_desc]}>
            {formatVND(data?.amountVnd)}
          </Text>
        </View>
        <View style={[styles.info_item, stylesGeneral.flexRow]}>
          <Text style={[styles.info_item_text]}>Method</Text>
          <View style={[stylesGeneral.flexEnd]}>
            <Text style={[styles.info_item_desc]}>
              {data?.method?.methodName}
            </Text>
            <Text style={[styles.info_item_desc]}>
              {data?.method?.accountName}
            </Text>
            <Text style={[styles.info_item_desc]}>
              {data?.method?.accountNumber}
            </Text>
          </View>
        </View>
      </View>
      <View style={[styles.verify_code_container]}>
        <FormInput
          label="Enter the following code"
          placeholder="Enter verify code"
          nameSymbol="shield-alt"
          onChangeText={val => handleChangeInput('codeVerify', val)}
        />
        <Text style={[stylesGeneral.mb5, stylesGeneral.fz16]}>
          This code is valid in 5 minutes.
        </Text>
        <Text
          style={[
            stylesGeneral.fwbold,
            stylesStatus.complete,
            stylesGeneral.mb30,
          ]}>
          Resend Code
        </Text>
        <View style={[styles.btn_container]}>
          <TouchableOpacity
            activeOpacity={0.6}
            style={[
              styles.btn,
              !codeVerify && stylesGeneral.op6,
              stylesStatus.confirmbgcbold,
              stylesGeneral.mr10,
            ]}
            disabled={!codeVerify}
            onPress={handleSubmit}>
            <Text style={[styles.btn_text, stylesStatus.white]}>Submit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.6}
            style={[styles.btn, stylesStatus.cancelbgcbold]}
            onPress={() => handleCancel(data?._id)}>
            <Text style={[styles.btn_text, stylesStatus.white]}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* Modal Loading */}
      {loading && <ModalLoading />}
    </ScrollView>
  );
}
