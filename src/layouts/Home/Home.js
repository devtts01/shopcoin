/* eslint-disable prettier/prettier */
/* eslint-disable react/self-closing-comp */
/* eslint-disable prettier/prettier */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
/* eslint-disable prettier/prettier */
import React, {useEffect} from 'react';
import {RefreshControl, Text, TouchableOpacity, View} from 'react-native';
import {useAppContext} from '../../utils';
import {DataTable} from 'react-native-paper';
import {Header} from '../../components';
import {
  getRate,
  getRateDeposit,
  getRateWithdraw,
} from '../../app/payloads/getById';
import styles from './HomeCss';
import {getAsyncStore} from '../../utils/localStore/localStore';
import {
  SVgetRate,
  SVgetRateDeposit,
  SVgetRateWithdraw,
} from '../../services/rate';
import stylesGeneral from '../../styles/General';
import {formatVND} from '../../utils/format/Money';
import {routersMain} from '../../routers/Main';
import {ScrollView} from 'native-base';

const Home = ({navigation}) => {
  const {state, dispatch} = useAppContext();
  const {rateDeposit, rateWithdraw} = state;
  const [refreshing, setRefreshing] = React.useState(false);
  useEffect(() => {
    getAsyncStore(dispatch);
    SVgetRateDeposit({
      dispatch,
      getRateDeposit,
    });
    SVgetRateWithdraw({
      dispatch,
      getRateWithdraw,
    });
  }, []);
  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getAsyncStore(dispatch);
    SVgetRateDeposit({
      dispatch,
      getRateDeposit,
    });
    SVgetRateWithdraw({
      dispatch,
      getRateWithdraw,
    });
    wait(2000).then(() => {
      setRefreshing(false);
    });
  }, []);
  return (
    <ScrollView
      style={[styles.container]}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <Header />
      <View style={[styles.tables]}>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title style={[stylesGeneral.text_black]}>
              Actions
            </DataTable.Title>
            <DataTable.Title numeric style={[stylesGeneral.text_black]}>
              Rate (VCB)
            </DataTable.Title>
            <DataTable.Title numeric></DataTable.Title>
          </DataTable.Header>

          <DataTable.Row>
            <DataTable.Cell style={[stylesGeneral.text_black]}>
              Deposit
            </DataTable.Cell>
            <DataTable.Cell numeric style={[stylesGeneral.text_black]}>
              {formatVND(rateDeposit)}
            </DataTable.Cell>
            <DataTable.Cell numeric>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate(routersMain.CreateDeposits);
                }}
                activeOpacity={0.6}
                style={[styles.btn_container, styles.btn_buy]}>
                <Text style={[styles.btn_text]}>Buy</Text>
              </TouchableOpacity>
            </DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell style={[stylesGeneral.text_black]}>
              Withdraw
            </DataTable.Cell>
            <DataTable.Cell numeric style={[stylesGeneral.text_black]}>
              {formatVND(rateWithdraw)}
            </DataTable.Cell>
            <DataTable.Cell numeric>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate(routersMain.CreateWithdraw);
                }}
                activeOpacity={0.6}
                style={[styles.btn_container, styles.btn_sell]}>
                <Text style={[styles.btn_text]}>Sell</Text>
              </TouchableOpacity>
            </DataTable.Cell>
          </DataTable.Row>
        </DataTable>
      </View>
    </ScrollView>
  );
};

export default Home;
