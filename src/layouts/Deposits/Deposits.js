/* eslint-disable prettier/prettier */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable prettier/prettier */
import {View, Text, ScrollView, RefreshControl} from 'react-native';
import styles from './DepositsCss';
import {formatUSDT, formatVND} from '../../utils/format/Money';
import stylesStatus from '../../styles/Status';
import stylesGeneral from '../../styles/General';
import {useCallback, useState} from 'react';

const Deposits = ({navigation}) => {
  const [refreshing, setRefreshing] = useState(false);
  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <View style={[styles.container]}>
        <View style={[stylesGeneral.flexRow, stylesGeneral.flexCenter]}>
          <Text
            style={[
              stylesGeneral.mb10,
              stylesGeneral.fwbold,
              stylesGeneral.fz16,
              stylesGeneral.mr10,
            ]}>
            Welcome: Test
          </Text>
          <Text
            style={[
              stylesGeneral.mb10,
              stylesGeneral.fwbold,
              stylesGeneral.fz16,
              stylesStatus.status,
              stylesStatus.confirmbgc,
            ]}>
            Standard
          </Text>
        </View>
        <View style={[stylesGeneral.flexRow, stylesGeneral.flexCenter]}>
          <Text
            style={[
              stylesGeneral.fwbold,
              stylesGeneral.fz16,
              stylesGeneral.mr10,
              stylesGeneral.mb10,
            ]}>
            = 0.003 USDT
          </Text>
          <Text
            style={[
              stylesGeneral.mb10,
              stylesGeneral.fwbold,
              stylesGeneral.fz16,
              stylesStatus.status,
              stylesStatus.completebgc,
            ]}>
            Refresh
          </Text>
        </View>
        <View
          style={[styles.container_btn, stylesStatus.vipbgcbold]}
          onTouchStart={() => navigation.navigate('Create Deposits')}>
          <Text style={[styles.btn, stylesStatus.white]}>Create</Text>
        </View>
        <View style={[styles.listDeposits, stylesGeneral.mt10]}>
          <View style={[styles.item]}>
            <View style={[styles.row, stylesGeneral.flexRow]}>
              <Text style={[styles.row_title]}>Created At</Text>
              <Text style={[styles.row_desc]}>{new Date().toISOString()}</Text>
            </View>
            <View style={[styles.row, stylesGeneral.flexRow]}>
              <Text style={[styles.row_title]}>Status</Text>
              <Text
                style={[
                  styles.row_desc,
                  stylesStatus.completebgc,
                  stylesStatus.status,
                ]}>
                Complete
              </Text>
            </View>
            <View style={[styles.row, stylesGeneral.flexRow]}>
              <Text style={[styles.row_title]}>Amount USDT</Text>
              <Text style={[styles.row_desc]}>{formatUSDT(300000)}T</Text>
            </View>
            <View style={[styles.row, stylesGeneral.flexRow]}>
              <Text style={[styles.row_title]}>Amount VND</Text>
              <Text style={[styles.row_desc]}>{formatVND(72000000)}</Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Deposits;
