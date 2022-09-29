/* eslint-disable prettier/prettier */
/* eslint-disable react/self-closing-comp */
/* eslint-disable prettier/prettier */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable prettier/prettier */
import {useCallback, useState} from 'react';
import {Text, ScrollView, RefreshControl, View} from 'react-native';
import {formatUSDT, formatVND} from '../../utils/format/Money';
import {DataTable} from 'react-native-paper';
import stylesGeneral from '../../styles/General';
import stylesStatus from '../../styles/Status';
import styles from './WithdrawCss';

const Withdraw = ({navigation}) => {
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
      style={[styles.container]}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <View style={[styles.content]}>
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
          onTouchStart={() => navigation.navigate('Create Withdraw')}>
          <Text style={[styles.btn, stylesStatus.white]}>Create</Text>
        </View>
        <View style={[styles.listWithdraw, stylesGeneral.mt10]}></View>
      </View>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title style={[styles.title_table]} numeric>
            Send
          </DataTable.Title>
          <DataTable.Title style={[styles.title_table]} numeric>
            Receied
          </DataTable.Title>
          <DataTable.Title style={[styles.title_table]} numeric>
            Date
          </DataTable.Title>
          <DataTable.Title style={[styles.title_table]} numeric>
            Status
          </DataTable.Title>
        </DataTable.Header>
        <DataTable.Row>
          <DataTable.Cell numeric style={[styles.title_table]}>
            {formatUSDT(30000)}T
          </DataTable.Cell>
          <DataTable.Cell numeric style={[styles.title_table]}>
            {formatVND(7200000)}
          </DataTable.Cell>
          <DataTable.Cell numeric style={[styles.title_table]}>
            {new Date().toISOString()}
          </DataTable.Cell>
          <DataTable.Cell numeric style={[styles.title_table]}>
            <Text style={[stylesStatus.complete]}>Complete</Text>
          </DataTable.Cell>
        </DataTable.Row>
      </DataTable>
    </ScrollView>
  );
};

export default Withdraw;
