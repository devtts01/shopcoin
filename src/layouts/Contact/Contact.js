/* eslint-disable prettier/prettier */
import {View, Text, ScrollView, RefreshControl} from 'react-native';
import React from 'react';
import styles from './ContactCss';

export default function Contact() {
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
      <Text style={[styles.text]}>
        If you have any questions about trading with ShopCoinUSA, do not
        hesitate to contact our support team by:{' '}
        <Text style={[styles.email]}>spshopcoinusa@gmail.com</Text>
      </Text>
    </ScrollView>
  );
}
