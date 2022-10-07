/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
/* eslint-disable react/self-closing-comp */
/* eslint-disable prettier/prettier */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable prettier/prettier */
import {useCallback, useState} from 'react';
import {Text, ScrollView, RefreshControl, View} from 'react-native';
import {DataTable} from 'react-native-paper';
import {useAppContext} from '../../utils';
import {formatUSDT, formatVND} from '../../utils/format/Money';
import {Header} from '../../components';
import stylesGeneral from '../../styles/General';
import stylesStatus from '../../styles/Status';
import styles from './WithdrawCss';

const Withdraw = ({navigation}) => {
  const {state} = useAppContext();
  const [refreshing, setRefreshing] = useState(false);

  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);
  const dataDetailWithdraw = [];
  return (
    <ScrollView
      style={[styles.container]}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <View style={[styles.content]}>
        <Header />
        <View
          style={[styles.container_btn, stylesStatus.vipbgcbold]}
          onTouchStart={() => navigation.navigate('Create Withdraw')}>
          <Text style={[styles.btn, stylesStatus.white]}>Create</Text>
        </View>
        <View style={[styles.listWithdraw, stylesGeneral.mt10]}></View>
      </View>
      {dataDetailWithdraw.length > 0 ? (
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
      ) : (
        <View style={[stylesGeneral.flexCenter, stylesGeneral.mt10]}>
          <Text
            style={[
              stylesGeneral.fz16,
              stylesGeneral.fwbold,
              stylesStatus.confirm,
            ]}>
            No Data Withdraw
          </Text>
        </View>
      )}
    </ScrollView>
  );
};

export default Withdraw;
