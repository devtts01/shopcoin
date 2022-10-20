/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {Text, View, ScrollView, RefreshControl, FlatList} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
// import socketIO from 'socket.io-client';
import {useAppContext} from '../../utils';
import {getAllCoins} from '../../app/payloads/getAll';
import {setSearchValue} from '../../app/payloads/search';
import {Search, ImageCp, Header} from '../../components';
import {SVgetAllCoins} from '../../services/coin';
import styles from './HomeCss';
import stylesStatus from '../../styles/Status';
import stylesGeneral from '../../styles/General';

const Home = ({navigation}) => {
  const {state, dispatch} = useAppContext();
  const {
    currentUser,
    search,
    data: {dataCoins},
  } = state;
  const [refreshing, setRefreshing] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [page, setPage] = useState(1);
  const [show, setShow] = useState(dataCoins?.total || 10);
  let data = dataCoins?.data || [];
  useEffect(() => {
    SVgetAllCoins({
      page,
      show: dataCoins?.total || 10,
      dispatch,
      getAllCoins,
    });
  }, [page, show]);

  if (search) {
    data = data.filter(item => {
      return item?.symbol?.toLowerCase().includes(search?.toLowerCase());
    });
  }
  let stopLoadingData = true;

  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    SVgetAllCoins({
      page,
      show: dataCoins?.total || 10,
      dispatch,
      getAllCoins,
    });
    wait(2000).then(() => {
      setRefreshing(false);
    });
  }, []);
  const ListFooterComponent = () => {
    return (
      <Text style={[stylesGeneral.fwbold, stylesGeneral.text_center]}>
        Loading...
      </Text>
    );
  };
  const handleEndReached = async () => {
    setLoading(true);
    if (!stopLoadingData) {
      await 1;
      setShow(dataCoins?.total);
      stopLoadingData = true;
    }
    setLoading(false);
  };
  const renderItem = ({item}) => {
    return (
      <View style={[styles.coinItem]}>
        <View style={[stylesGeneral.flexRow]}>
          <View style={[styles.coinItem_Image]}>
            <ImageCp uri={item?.logo} />
          </View>
          <View style={[styles.coinItem_Info, stylesGeneral.ml12]}>
            <Text style={[styles.coinItem_Info_name]}>
              {item?.symbol?.replace('USDT', '')}
            </Text>
            <Text style={[styles.coinItem_Info_quantity]}>
              {item?.price ? item?.price : 0}
            </Text>
          </View>
        </View>
        <View style={[styles.coinItem_Price]}>
          <View style={[styles.coinItem_Price_text, stylesGeneral.flexCenter]}>
            <Text style={[stylesGeneral.mw50, stylesGeneral.fwbold]}>
              High:{' '}
            </Text>
            {item?.high ? (
              <Text style={[stylesGeneral.fwbold, stylesStatus.complete]}>
                {item?.high}
              </Text>
            ) : (
              <SkeletonPlaceholder.Item
                marginTop={6}
                width={40}
                height={20}
                borderRadius={4}
                backgroundColor="#ededed"
              />
            )}
          </View>
          <View style={[styles.coinItem_Price_text, stylesGeneral.flexCenter]}>
            <Text style={[stylesGeneral.mw50, stylesGeneral.fwbold]}>
              Low:{' '}
            </Text>
            {item?.low ? (
              <Text style={[stylesGeneral.fwbold, stylesStatus.cancel]}>
                {item?.low}
              </Text>
            ) : (
              <SkeletonPlaceholder.Item
                marginTop={6}
                width={40}
                height={20}
                borderRadius={4}
                backgroundColor="#ededed"
              />
            )}
          </View>
        </View>
        <View
          style={[styles.coinItem_Btn]}
          onTouchStart={() =>
            navigation.navigate({
              name: 'Buy Coin',
              params: {
                id: item?._id,
              },
            })
          }>
          <Text style={[stylesStatus.completebgc, styles.btn]}>Buy</Text>
        </View>
      </View>
    );
  };
  const handleChangeSearch = (name, val) => {
    dispatch(setSearchValue(val));
  };

  return (
    <View style={[styles.container]}>
      <Header />
      <View>
        <Search name="search" value={search} onChange={handleChangeSearch} />
      </View>
      <View style={[styles.listCoin]}>
        <FlatList
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          onEndReached={handleEndReached}
          onScroll={handleEndReached}
          onEndReachedThreshold={0.5}
          onScrollBeginDrag={() => (stopLoadingData = false)}
          contentContainerStyle={{flex: 1}}
          data={data}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
          ListFooterComponent={loading && ListFooterComponent}
        />
      </View>
    </View>
  );
};

export default Home;
