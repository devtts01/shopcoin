/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable prettier/prettier */
import {useCallback, useEffect, useState} from 'react';
import {Text, ScrollView, RefreshControl, View, FlatList} from 'react-native';
import {useAppContext} from '../../utils/';
import {dateFormat} from '../../utils/format/Date';
import {formatUSDT} from '../../utils/format/Money';
import {SVgetBuyHistory} from '../../services/bills';
import {getHistoryBuy} from '../../app/payloads/history';
import styles from './BuyHistoryCss';
import stylesGeneral from '../../styles/General';
import stylesStatus from '../../styles/Status';

const History = ({navigation}) => {
  const {state, dispatch} = useAppContext();
  const {
    currentUser,
    history: {dataBuyHistory},
  } = state;
  const [refreshing, setRefreshing] = useState(false);
  useEffect(() => {
    SVgetBuyHistory({
      id: currentUser.id,
      dispatch,
      getHistoryBuy,
    });
  }, []);

  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);
  const renderItem = ({item}) => {
    return (
      <View style={[styles.item]}>
        <View style={[styles.row]}>
          <Text style={[styles.row_title]}>
            {item?.symbol.replace('USDT', '')}
          </Text>
          <Text style={[styles.row_desc]}>
            {dateFormat(item?.createdAt, 'DD/MM/YYYY')}
          </Text>
        </View>
        <View style={[styles.row]}>
          <Text style={[styles.row_title]}>Status</Text>
          <Text
            style={[
              styles.row_desc,
              stylesStatus.status,
              stylesStatus.completebgc,
              item?.status.toLowerCase().replace(' ', '') === 'onhold'
                ? stylesStatus.vipbgc
                : item?.status.toLowerCase() === 'completed' ||
                  item?.status.toLowerCase() === 'complete'
                ? stylesStatus.completebgc
                : item?.status.toLowerCase() === 'canceled' ||
                  item?.status.toLowerCase() === 'cancel'
                ? stylesStatus.cancelbgc
                : item?.status.toLowerCase() === 'confirmed' ||
                  item?.status.toLowerCase() === 'confirm'
                ? stylesStatus.confirmbgc
                : stylesStatus.demobgc,
            ]}>
            {item?.status}
          </Text>
        </View>
        <View style={[styles.row]}>
          <Text style={[styles.row_title]}>Amount</Text>
          <Text style={[styles.row_desc]}>{item?.amount}</Text>
        </View>
        <View style={[styles.row]}>
          <Text style={[styles.row_title]}>USDT</Text>
          <Text style={[styles.row_desc]}>
            ~ {formatUSDT(item?.amountUsd).replace('USD', '')}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={[styles.container]}>
      <View style={[styles.btn_container, stylesGeneral.mb10]}>
        <View
          style={[styles.btn]}
          onTouchStart={() => navigation.navigate('History')}>
          <Text style={[styles.btn_text]}>Buy History</Text>
        </View>
        <View
          style={[styles.btn]}
          onTouchStart={() => navigation.navigate('Sell History')}>
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
          <View style={[stylesGeneral.flexCenter, stylesGeneral.mt10]}>
            <Text
              style={[
                stylesGeneral.fz16,
                stylesGeneral.fwbold,
                stylesStatus.confirm,
              ]}>
              No History Buy Coin
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default History;
