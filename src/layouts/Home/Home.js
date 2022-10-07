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
import {Search, ImageCp, Header} from '../../components';
import {useAppContext} from '../../utils';
import {getAllCoins} from '../../app/payloads/getAll';
import {setSearchValue} from '../../app/payloads/search';
import {SVgetAllCoins} from '../../services/coin';
import styles from './HomeCss';
import stylesStatus from '../../styles/Status';
import stylesGeneral from '../../styles/General';

const Home = ({navigation}) => {
  const {state, dispatch} = useAppContext();
  const {
    search,
    data: {dataCoins},
  } = state;
  const [refreshing, setRefreshing] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [page, setPage] = useState(1);
  const [show, setShow] = useState(10);

  useEffect(() => {
    SVgetAllCoins({
      page,
      show,
      dispatch,
      getAllCoins,
    });
  }, [page, show]);

  let data = dataCoins?.data || [];
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
    wait(2000).then(() => setRefreshing(false));
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
      setShow(show + 10);
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
              <SkeletonPlaceholder.Item
                marginTop={6}
                width={40}
                height={20}
                borderRadius={4}
                backgroundColor="#ededed"
              />
            </Text>
          </View>
        </View>
        <View style={[styles.coinItem_Price]}>
          <View style={[styles.coinItem_Price_text, stylesGeneral.flexCenter]}>
            <Text style={[stylesGeneral.mw50, stylesGeneral.fw500]}>
              High:{' '}
            </Text>
            <SkeletonPlaceholder.Item
              marginTop={6}
              width={80}
              height={20}
              borderRadius={4}
              backgroundColor="#ededed"
            />
          </View>
          <View style={[styles.coinItem_Price_text, stylesGeneral.flexCenter]}>
            <Text style={[stylesGeneral.mw50, stylesGeneral.fw500]}>Low: </Text>
            <SkeletonPlaceholder.Item
              marginTop={6}
              width={80}
              height={20}
              borderRadius={4}
              backgroundColor="#ededed"
            />
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
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          onEndReached={handleEndReached}
          onScroll={handleEndReached}
          onEndReachedThreshold={0.5}
          onScrollBeginDrag={() => (stopLoadingData = false)}>
          <FlatList
            contentContainerStyle={{flex: 1}}
            data={data}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderItem}
            ListFooterComponent={loading && ListFooterComponent}
          />
        </ScrollView>
      </View>
    </View>
  );
};

export default Home;
