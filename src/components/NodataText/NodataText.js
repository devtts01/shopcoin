/* eslint-disable prettier/prettier */
import {View, Text, RefreshControl} from 'react-native';
import React from 'react';
import stylesGeneral from '../../styles/General';
import stylesStatus from '../../styles/Status';
import {ScrollView} from 'native-base';

export default function NodataText({text, refreshing, onRefresh}) {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <View style={[stylesGeneral.flexCenter, stylesGeneral.mt10]}>
        <Text
          style={[
            stylesGeneral.fz16,
            stylesGeneral.fwbold,
            stylesStatus.confirm,
          ]}>
          {text}
        </Text>
      </View>
    </ScrollView>
  );
}
