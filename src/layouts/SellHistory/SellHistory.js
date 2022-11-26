/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
import {View, Text, RefreshControl, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useAppContext} from '../../utils/';
import {SVgetSellHistory} from '../../services/bills';
import {getHistorySell} from '../../app/payloads/history';
import {BuySellHistoryDetail, NodataText} from '../../components';
import {routersMain} from '../../routers/Main';
import {routers} from '../../routers/Routers';
import styles from './SellHistoryCss';
import stylesGeneral from '../../styles/General';

export default function SellHistory({navigation}) {
  const {state, dispatch} = useAppContext();
  const {
    currentUser,
    history: {dataSellHistory},
  } = state;
  const [refreshing, setRefreshing] = useState(false);
  useEffect(() => {
    SVgetSellHistory({
      id: currentUser?.email,
      dispatch,
      getHistorySell,
    });
  }, []);
  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    SVgetSellHistory({
      id: currentUser?.email,
      dispatch,
      getHistorySell,
    });
    wait(2000).then(() => setRefreshing(false));
  }, []);
  const renderItem = ({item}) => {
    return <BuySellHistoryDetail item={item} style={{borderColor: 'red'}} />;
  };
  return (
    <View style={[styles.container]}>
      <View style={[styles.btn_container, stylesGeneral.mb10]}>
        <View
          style={[styles.btn]}
          onTouchStart={() => navigation.navigate(routers.History)}>
          <Text style={[styles.btn_text, stylesGeneral.text_black]}>
            Deposits History
          </Text>
        </View>
        <View
          style={[styles.btn]}
          onTouchStart={() => navigation.navigate(routersMain.SellHistory)}>
          <Text style={[styles.btn_text, stylesGeneral.text_black]}>
            Withdraws History
          </Text>
        </View>
      </View>
      <View style={[styles.listItem]}>
        {dataSellHistory?.length > 0 ? (
          <FlatList
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            data={dataSellHistory}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderItem}
          />
        ) : (
          <NodataText
            text="No History Withdraws"
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        )}
      </View>
    </View>
  );
}
