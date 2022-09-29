/* eslint-disable prettier/prettier */
/* eslint-disable prettier/prettier */
import {View, Text, Modal} from 'react-native';
import React from 'react';
import {ProgressBar, MD3Colors} from 'react-native-paper';
import styles from './ModalLoadingCss';
import stylesGeneral from '../../styles/General';

export default function ModalLoading({value}) {
  return (
    <View style={[styles.centerView]}>
      <Modal animationType="slide" transparent={true}>
        <View style={[styles.centerView]}>
          <View style={[styles.modalView]}>
            <Text
              style={[
                styles.modalText,
                stylesGeneral.fwbold,
                stylesGeneral.text_center,
              ]}>
              Đang xử lý...
            </Text>
            <ProgressBar progress={value} color="#007aff" />
          </View>
        </View>
      </Modal>
    </View>
  );
}
