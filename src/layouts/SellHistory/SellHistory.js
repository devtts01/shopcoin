/* eslint-disable prettier/prettier */
import {View, Text, ScrollView, RefreshControl} from 'react-native';
import React from 'react';
import styles from './SellHistoryCss';
import stylesStatus from '../../styles/Status';

export default function SellHistory({navigation}) {
  const [refreshing, setRefreshing] = React.useState(false);
  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);
  return (
    <ScrollView
      style={[styles.container]}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <View style={[styles.btn_container]}>
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
        <View style={[styles.item]}>
          <View style={[styles.row]}>
            <Text style={[styles.row_title]}>BTC</Text>
            <Text style={[styles.row_desc]}>{new Date().toISOString()}</Text>
          </View>
          <View style={[styles.row]}>
            <Text style={[styles.row_title]}>Status</Text>
            <Text
              style={[
                styles.row_desc,
                stylesStatus.completebgc,
                stylesStatus.complete,
                stylesStatus.status,
              ]}>
              Complete
            </Text>
          </View>
          <View style={[styles.row]}>
            <Text style={[styles.row_title]}>Amount</Text>
            <Text style={[styles.row_desc]}>1</Text>
          </View>
          <View style={[styles.row]}>
            <Text style={[styles.row_title]}>USDT</Text>
            <Text style={[styles.row_desc]}>~ 46.5</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
