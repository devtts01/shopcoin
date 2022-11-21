/* eslint-disable prettier/prettier */
import {View, Text} from 'react-native';
import React from 'react';
import stylesGeneral from '../../styles/General';
import styles from './RowDetailCss';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export default function RowDetail({
  title,
  text,
  styleDesc,
  nameIcon,
  redirectName,
  navigation,
  noneBorderBottom,
}) {
  return (
    <View
      style={[
        styles.info_detail_item,
        stylesGeneral.flexRow,
        noneBorderBottom && styles.borderBt0,
      ]}
      onTouchStart={
        redirectName ? () => navigation.navigate(redirectName) : () => {}
      }>
      <Text style={[styles.info_detail_title, stylesGeneral.text_black]}>
        {title}
      </Text>
      {text && (
        <Text
          style={[
            styles.info_detail_desc,
            stylesGeneral.text_black,
            styleDesc,
          ]}>
          {text}
        </Text>
      )}
      {nameIcon && <FontAwesome5 name={nameIcon} size={12} />}
    </View>
  );
}
