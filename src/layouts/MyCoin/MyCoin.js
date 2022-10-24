/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable prettier/prettier */
import {useCallback, useEffect, useState} from 'react';
import {Text, RefreshControl, View, FlatList} from 'react-native';
import {Header, ImageCp, NodataText} from '../../components';
import {useAppContext} from '../../utils';
import {formatUSDT} from '../../utils/format/Money';
import {getAllMyCoin} from '../../app/payloads/getAll';
import {SVgetAllMyCoin} from '../../services/coin';
import {routersMain} from '../../routers/Main';
import styles from './MyCoinCss';
import stylesGeneral from '../../styles/General';
import stylesStatus from '../../styles/Status';

const MyCoin = ({navigation}) => {
  const {state, dispatch} = useAppContext();
  const {
    currentUser,
    data: {dataMyCoin},
  } = state;
  const [refreshing, setRefreshing] = useState(false);
  useEffect(() => {
    SVgetAllMyCoin({
      id: currentUser?.id,
      dispatch,
      getAllMyCoin,
    });
  }, []);
  const data = dataMyCoin || [];
  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    SVgetAllMyCoin({
      id: currentUser?.id,
      dispatch,
      getAllMyCoin,
    });
    wait(2000).then(() => setRefreshing(false));
  }, []);
  const renderItem = ({item}) => {
    return (
      <View style={[styles.coinItem]}>
        <View style={[stylesGeneral.flexRow, stylesGeneral.flexCenter]}>
          <View style={[styles.coinItem_Image]}>
            <ImageCp uri={item?.coin?.logo} />
          </View>
          <View style={[styles.coinItem_Info, stylesGeneral.ml12]}>
            <Text style={[styles.coinItem_Info_name]}>
              {item?.coin?.symbol?.replace('USDT', '')}
            </Text>
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
              USDT: ~{' '}
              {formatUSDT(item?.amount * item?.coin?.price).replace('USD', '')}
            </Text>
          </View>
        </View>
        <View
          style={[styles.coinItem_Btn]}
          onTouchStart={() =>
            navigation.navigate({
              name: routersMain.SellCoin,
              params: {
                id: item?.coin?._id,
                item: item,
                symbol: item?.coin?.symbol,
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
      <View style={[styles.listCoin]}>
        {data?.length > 0 ? (
          <FlatList
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            contentContainerStyle={{flex: 1}}
            data={data}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderItem}
          />
        ) : (
          <NodataText text="No coin" />
        )}
      </View>
    </View>
  );
};

export default MyCoin;
