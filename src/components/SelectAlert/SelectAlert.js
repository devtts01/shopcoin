/* eslint-disable prettier/prettier */
import {View, Text} from 'react-native';
import React from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import styles from './SelectAlertCss';
import stylesGeneral from '../../styles/General';

export default function SelectAlert({label, onTouchStart, value}) {
  return (
    <View style={[styles.select_item]}>
      <Text style={[styles.label, stylesGeneral.text_black]}>{label}</Text>
      <View style={[styles.select]} onTouchStart={onTouchStart}>
        <Text style={[stylesGeneral.fw500]}>
          {value ? value : ' Select a bank'}
        </Text>
        <FontAwesome5 name="chevron-down" />
      </View>
    </View>
  );
}
