/* eslint-disable prettier/prettier */
import {View, Text} from 'react-native';
import React from 'react';
import styles from './SelectAlertCss';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export default function SelectAlert({label, onTouchStart}) {
  return (
    <View style={[styles.select_item]}>
      <Text style={[styles.label]}>{label}</Text>
      <View style={[styles.select]} onTouchStart={onTouchStart}>
        <Text>Select a bank</Text>
        <FontAwesome5 name="chevron-down" />
      </View>
    </View>
  );
}
