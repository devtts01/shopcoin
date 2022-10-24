/* eslint-disable prettier/prettier */
import {View, Text} from 'react-native';
import React from 'react';
import stylesGeneral from '../../styles/General';
import stylesStatus from '../../styles/Status';

export default function NodataText({text}) {
  return (
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
  );
}
