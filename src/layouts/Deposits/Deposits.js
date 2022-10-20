/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
/* eslint-disable prettier/prettier */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable prettier/prettier */
import {View, Text, ScrollView, RefreshControl} from 'react-native';
import {useCallback, useEffect, useState} from 'react';
import {useAppContext} from '../../utils';
import {formatUSDT, formatVND} from '../../utils/format/Money';
import {getAllDeposits} from '../../app/payloads/getAll';
import {Header} from '../../components';
import styles from './DepositsCss';
import stylesStatus from '../../styles/Status';
import stylesGeneral from '../../styles/General';
import {SVgetDepositsByEmailUser} from '../../services/deposits';
import {dateFormat} from '../../utils/format/Date';

const Deposits = ({navigation}) => {
  const {state, dispatch} = useAppContext();
  const {
    currentUser,
    data: {dataDeposits},
  } = state;
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    SVgetDepositsByEmailUser({
      email: currentUser?.email,
      dispatch,
      getAllDeposits,
    });
  }, []);
  const data = dataDeposits || [];

  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    SVgetDepositsByEmailUser({
      email: currentUser?.email,
      dispatch,
      getAllDeposits,
    });
    wait(2000).then(() => setRefreshing(false));
  }, []);
  return (
    <View style={[styles.container]}>
      <Header />
      <View
        style={[styles.container_btn, stylesStatus.vipbgcbold]}
        onTouchStart={() => navigation.navigate('Create Deposits')}>
        <Text style={[styles.btn, stylesStatus.white]}>Create</Text>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        style={[styles.listDeposits, stylesGeneral.mt10]}>
        {data.length > 0 ? (
          data.map((item, index) => (
            <View style={[styles.item]} key={index}>
              <View style={[styles.row, stylesGeneral.flexRow]}>
                <Text style={[styles.row_title]}>Created At</Text>
                <Text style={[styles.row_desc]}>
                  {dateFormat(item?.createdAt, 'DD/MM/YYYY')}
                </Text>
              </View>
              <View style={[styles.row, stylesGeneral.flexRow]}>
                <Text style={[styles.row_title]}>Status</Text>
                <Text
                  style={[
                    styles.row_desc,
                    stylesStatus.status,
                    item?.status.toLowerCase().replace(' ', '') === 'onhold'
                      ? stylesStatus.vipbgc
                      : item?.status.toLowerCase() === 'completed' ||
                        item?.status.toLowerCase() === 'complete'
                      ? stylesStatus.completebgc
                      : item?.status.toLowerCase() === 'canceled' ||
                        item?.status.toLowerCase() === 'cancel'
                      ? stylesStatus.cancelbgc
                      : item?.status.toLowerCase() === 'confirmed' ||
                        item?.status.toLowerCase() === 'confirm'
                      ? stylesStatus.confirmbgc
                      : stylesStatus.demobgc,
                  ]}>
                  {item?.status}
                </Text>
              </View>
              <View style={[styles.row, stylesGeneral.flexRow]}>
                <Text style={[styles.row_title]}>Amount USDT</Text>
                <Text style={[styles.row_desc]}>
                  {formatUSDT(item?.amount)}T
                </Text>
              </View>
              <View style={[styles.row, stylesGeneral.flexRow]}>
                <Text style={[styles.row_title]}>Amount VND</Text>
                <Text style={[styles.row_desc]}>
                  {formatVND(item?.amountVnd)}
                </Text>
              </View>
            </View>
          ))
        ) : (
          <View style={[stylesGeneral.flexCenter, stylesGeneral.mt10]}>
            <Text
              style={[
                stylesGeneral.fz16,
                stylesGeneral.fwbold,
                stylesStatus.confirm,
              ]}>
              No Deposits
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default Deposits;
