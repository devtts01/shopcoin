/* eslint-disable prettier/prettier */
/* eslint-disable react/self-closing-comp */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
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
  const refreshData = () => {
    getAsyncStore(dispatch);
    SVgetRateDeposit({
      dispatch,
      getRateDeposit,
    });
    SVgetRateWithdraw({
      dispatch,
      getRateWithdraw,
    });
  };
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
      <Header refreshData={refreshData} />
      <View style={[styles.tables]}>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>
              <Text style={[stylesGeneral.text_black, stylesGeneral.fwbold]}>
                Actions
              </Text>
            </DataTable.Title>
            <DataTable.Title numeric>
              <Text style={[stylesGeneral.text_black, stylesGeneral.fwbold]}>
                Rate (VCB)
              </Text>
            </DataTable.Title>
            <DataTable.Title numeric></DataTable.Title>
          </DataTable.Header>
          <DataTable.Row>
            <DataTable.Cell>
              <Text style={[stylesGeneral.text_black]}>Deposit</Text>
            </DataTable.Cell>
            <DataTable.Cell numeric>
              <Text style={[stylesGeneral.text_black]}>
                {formatVND(rateDeposit)}
              </Text>
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
            <DataTable.Cell>
              <Text style={[stylesGeneral.text_black]}>Withdraw</Text>
            </DataTable.Cell>
            <DataTable.Cell numeric>
              <Text style={[stylesGeneral.text_black]}>
                {formatVND(rateWithdraw)}
              </Text>
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
