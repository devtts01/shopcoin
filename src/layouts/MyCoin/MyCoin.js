/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable prettier/prettier */
import {useCallback, useEffect, useState} from 'react';
import {Text, ScrollView, RefreshControl, View, FlatList} from 'react-native';
import {Header, ImageCp} from '../../components';
import {useAppContext} from '../../utils';
import stylesGeneral from '../../styles/General';
import stylesStatus from '../../styles/Status';
import styles from './MyCoinCss';
import {SVgetBuyHistory} from '../../services/bills';
import {getHistoryBuy} from '../../app/payloads/history';
import {formatUSDT} from '../../utils/format/Money';

const MyCoin = ({navigation}) => {
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
      <View style={[styles.coinItem]}>
        <View style={[stylesGeneral.flexRow, stylesGeneral.flexCenter]}>
          <View style={[styles.coinItem_Image]}>
            <ImageCp uri={item?.logo} />
          </View>
          <View style={[styles.coinItem_Info, stylesGeneral.ml12]}>
            <Text style={[styles.coinItem_Info_name]}>{item?.symbol}</Text>
          </View>
        </View>
        <View style={[styles.coinItem_Price]}>
          <View>
            <Text style={[styles.coinItem_Price_text]}>
              Qty: {item?.amount}
            </Text>
          </View>
          <View>
            <Text style={[styles.coinItem_Price_text]}>
              USDT: ~ {formatUSDT(item?.amountUsd).replace('USD', '')}
            </Text>
          </View>
        </View>
        <View
          style={[styles.coinItem_Btn]}
          onTouchStart={() =>
            navigation.navigate({
              name: 'Sell Coin',
              params: {
                id: item?._id,
                item: item,
              },
            })
          }>
          <Text style={[stylesStatus.cancelbgc, styles.btn]}>Sell</Text>
        </View>
      </View>
    );
  };
  return (
    <View style={[styles.container]}>
      <Header />
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        style={[styles.listCoin]}>
        {dataBuyHistory?.length > 0 ? (
          <FlatList
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
              No coin
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default MyCoin;
