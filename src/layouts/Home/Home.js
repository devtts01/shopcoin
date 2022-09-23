/* eslint-disable prettier/prettier */
/* eslint-disable react/self-closing-comp */
/* eslint-disable prettier/prettier */
import React from 'react';
import {Text, View, ScrollView, RefreshControl} from 'react-native';
import {Search, ImageCp} from '../../components';
import {useAppContext} from '../../utils';
import styles from './HomeCss';
import stylesStatus from '../../styles/Status';
import stylesGeneral from '../../styles/General';

const Home = ({navigation}) => {
  const {state} = useAppContext();
  const {currentUser} = state;
  console.log(currentUser);

  const [refreshing, setRefreshing] = React.useState(false);
  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const onSubmit = () => {
    console.warn('123');
  };
  const DATA = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return (
    <View style={[styles.container]}>
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
      <View>
        <Search />
      </View>
      <View style={[styles.listCoin]}>
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          <View style={[styles.coinItem]}>
            <View style={[stylesGeneral.flexRow]}>
              <View style={[styles.coinItem_Image]}>
                <ImageCp />
              </View>
              <View style={[styles.coinItem_Info, stylesGeneral.ml12]}>
                <Text style={[styles.coinItem_Info_name]}>BTC</Text>
                <Text style={[styles.coinItem_Info_quantity]}>19240.20</Text>
              </View>
            </View>
            <View style={[styles.coinItem_Price]}>
              <View>
                <Text style={[styles.coinItem_Price_text]}>High: 19794.89</Text>
              </View>
              <View>
                <Text style={[styles.coinItem_Price_text]}>Low: 18948.98</Text>
              </View>
            </View>
            <View style={[styles.coinItem_Btn]}>
              <Text
                style={[stylesStatus.completebgc, styles.btn]}
                onPress={onSubmit}>
                Buy
              </Text>
            </View>
          </View>
          {DATA.map((item, index) => (
            <View style={[styles.coinItem]} key={index}>
              <View style={[stylesGeneral.flexRow]}>
                <View style={[styles.coinItem_Image]}>
                  <ImageCp />
                </View>
                <View style={[styles.coinItem_Info, stylesGeneral.ml12]}>
                  <Text style={[styles.coinItem_Info_name]}>BTC</Text>
                  <Text style={[styles.coinItem_Info_quantity]}>19240.20</Text>
                </View>
              </View>
              <View style={[styles.coinItem_Price]}>
                <View>
                  <Text style={[styles.coinItem_Price_text]}>
                    High: 19794.89
                  </Text>
                </View>
                <View>
                  <Text style={[styles.coinItem_Price_text]}>
                    Low: 18948.98
                  </Text>
                </View>
              </View>
              <View style={[styles.coinItem_Btn]}>
                <Text
                  style={[stylesStatus.completebgc, styles.btn]}
                  onPress={onSubmit}>
                  Buy
                </Text>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default Home;
