/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable prettier/prettier */
import {View, Text, ScrollView, RefreshControl} from 'react-native';
import styles from './DepositsCss';
import {formatUSDT, formatVND} from '../../utils/format/Money';
import stylesStatus from '../../styles/Status';
import stylesGeneral from '../../styles/General';
import {useCallback, useState} from 'react';
import {useAppContext} from '../../utils';
import {Header} from '../../components';

const Deposits = ({navigation}) => {
  const {state} = useAppContext();
  const [refreshing, setRefreshing] = useState(false);

  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);
  const dataDetailDeposits = [];
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <View style={[styles.container]}>
        <Header />
        <View
          style={[styles.container_btn, stylesStatus.vipbgcbold]}
          onTouchStart={() => navigation.navigate('Create Deposits')}>
          <Text style={[styles.btn, stylesStatus.white]}>Create</Text>
        </View>
        <View style={[styles.listDeposits, stylesGeneral.mt10]}>
          {dataDetailDeposits.length > 0 ? (
            <View style={[styles.item]}>
              <View style={[styles.row, stylesGeneral.flexRow]}>
                <Text style={[styles.row_title]}>Created At</Text>
                <Text style={[styles.row_desc]}>
                  {new Date().toISOString()}
                </Text>
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
        </View>
      </View>
    </ScrollView>
  );
};

export default Deposits;
