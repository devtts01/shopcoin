/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
/* eslint-disable react/self-closing-comp */
/* eslint-disable prettier/prettier */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable prettier/prettier */
import {useCallback, useState} from 'react';
import {
  Text,
  ScrollView,
  RefreshControl,
  View,
  TouchableOpacity,
} from 'react-native';
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
    <View style={[styles.container]}>
      <View style={[styles.content]}>
        <Header />
        <TouchableOpacity
          style={[styles.container_btn, stylesStatus.vipbgcbold]}
          onPress={() => navigation.navigate('Create Withdraw')}>
          <Text style={[styles.btn, stylesStatus.white]}>Create</Text>
        </TouchableOpacity>
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
          <ScrollView
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
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
          </ScrollView>
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
    </View>
  );
};

export default Withdraw;
