/* eslint-disable prettier/prettier */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable prettier/prettier */
import {useCallback, useState} from 'react';
import {Text, ScrollView, RefreshControl, View} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {ImageCp} from '../../components';
import stylesGeneral from '../../styles/General';
import stylesStatus from '../../styles/Status';
import styles from './MyCoinCss';

const MyCoin = ({navigation}) => {
  const [refreshing, setRefreshing] = useState(false);
  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);
  const DATA = [1, 2, 3, 4];
  return (
    <ScrollView
      style={[styles.container]}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <View style={[stylesGeneral.flexRow, stylesGeneral.flexCenter]}>
        <Text
          style={[
            stylesGeneral.mb10,
            stylesGeneral.fwbold,
            stylesGeneral.fz16,
            stylesGeneral.mr10,
          ]}>
          Welcome: Test
        </Text>
        <Text
          style={[
            stylesGeneral.mb10,
            stylesGeneral.fwbold,
            stylesGeneral.fz16,
            stylesStatus.status,
            stylesStatus.confirmbgc,
          ]}>
          Standard
        </Text>
      </View>
      <View style={[stylesGeneral.flexRow, stylesGeneral.flexCenter]}>
        <Text
          style={[
            stylesGeneral.fwbold,
            stylesGeneral.fz16,
            stylesGeneral.mr10,
            stylesGeneral.mb10,
          ]}>
          = 0.003 USDT
        </Text>
        <Text
          style={[
            stylesGeneral.mb10,
            stylesGeneral.fwbold,
            stylesGeneral.fz16,
            stylesStatus.status,
            stylesStatus.completebgc,
          ]}>
          Refresh
        </Text>
      </View>
      <View style={[styles.listCoin]}>
        {DATA.map((item, index) => (
          <View style={[styles.coinItem]} key={index}>
            <View style={[stylesGeneral.flexRow]}>
              <View style={[styles.coinItem_Image]}>
                {/* <ImageCp /> */}
                <SkeletonPlaceholder.Item
                  width={50}
                  height={50}
                  borderRadius={100}
                  backgroundColor="#ededed"
                />
              </View>
              <View style={[styles.coinItem_Info, stylesGeneral.ml12]}>
                <Text style={[styles.coinItem_Info_name]}>BTC</Text>
              </View>
            </View>
            <View style={[styles.coinItem_Price]}>
              <View>
                <Text style={[styles.coinItem_Price_text]}>Qty: 100</Text>
              </View>
              <View>
                <Text style={[styles.coinItem_Price_text]}>USDT: ~ 472.5</Text>
              </View>
            </View>
            <View
              style={[styles.coinItem_Btn]}
              onTouchStart={() =>
                navigation.navigate({
                  name: 'Sell Coin',
                  params: {
                    id: '#88389',
                  },
                })
              }>
              <Text style={[stylesStatus.cancelbgc, styles.btn]}>Sell</Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default MyCoin;
