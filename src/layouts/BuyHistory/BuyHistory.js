/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable prettier/prettier */
import {useCallback, useEffect, useState} from 'react';
import {Text, RefreshControl, View, FlatList} from 'react-native';
import {useAppContext} from '../../utils/';
import {SVgetBuyHistory} from '../../services/bills';
import {getHistoryBuy} from '../../app/payloads/history';
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
      id: currentUser?.id,
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
      id: currentUser?.id,
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
          onTouchStart={() => navigation.navigate(routers.History)}>
          <Text style={[styles.btn_text]}>Buy History</Text>
        </View>
        <View
          style={[styles.btn]}
          onTouchStart={() => navigation.navigate(routersMain.SellHistory)}>
          <Text style={[styles.btn_text]}>Sell History</Text>
        </View>
      </View>
      <View style={[styles.listItem]}>
        {dataBuyHistory?.length > 0 ? (
          <FlatList
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{flex: 1}}
            data={dataBuyHistory}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderItem}
          />
        ) : (
          <NodataText text="No History Buy Coin" />
        )}
      </View>
    </View>
  );
};

export default History;
