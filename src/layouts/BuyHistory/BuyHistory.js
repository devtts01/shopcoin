/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/react-in-jsx-scope */
import {useCallback, useEffect, useState} from 'react';
import {Text, RefreshControl, View, FlatList} from 'react-native';
import {useAppContext} from '../../utils/';
import {SVgetBuyHistory, SVgetSellHistory} from '../../services/bills';
import {getHistoryBuy, getHistorySell} from '../../app/payloads/history';
import {routersMain} from '../../routers/Main';
import {routers} from '../../routers/Routers';
import styles from './BuyHistoryCss';
import stylesGeneral from '../../styles/General';
import {BuySellHistoryDetail, NodataText} from '../../components';

const History = ({navigation}) => {
  const {state, dispatch} = useAppContext();
  const {
    currentUser,
    history: {dataBuyHistory},
  } = state;
  const [refreshing, setRefreshing] = useState(false);
  useEffect(() => {
    SVgetBuyHistory({
      id: currentUser?.email,
      dispatch,
      getHistoryBuy,
    });
  }, []);
  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    SVgetBuyHistory({
      id: currentUser?.email,
      dispatch,
      getHistoryBuy,
    });
    wait(2000).then(() => setRefreshing(false));
  }, []);
  const renderItem = ({item}) => {
    return <BuySellHistoryDetail item={item} />;
  };
  return (
    <View style={[styles.container]}>
      <View style={[styles.btn_container, stylesGeneral.mb10]}>
        <View
          style={[styles.btn]}
          onTouchStart={() => {
            SVgetBuyHistory({
              id: currentUser?.email,
              dispatch,
              getHistoryBuy,
            });
            navigation.navigate(routers.History);
          }}>
          <Text style={[styles.btn_text, stylesGeneral.text_black]}>
            Deposits History
          </Text>
        </View>
        <View
          style={[styles.btn]}
          onTouchStart={() => {
            SVgetSellHistory({
              id: currentUser?.email,
              dispatch,
              getHistorySell,
            });
            navigation.navigate(routersMain.SellHistory);
          }}>
          <Text style={[styles.btn_text, stylesGeneral.text_black]}>
            Withdraws History
          </Text>
        </View>
      </View>
      <View style={[styles.listItem]}>
        {dataBuyHistory?.length > 0 ? (
          <FlatList
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            showsVerticalScrollIndicator={false}
            data={dataBuyHistory}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderItem}
          />
        ) : (
          <NodataText
            text="No History Deposits"
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        )}
      </View>
    </View>
  );
};

export default History;
