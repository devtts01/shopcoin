/* eslint-disable prettier/prettier */
import {View, Text} from 'react-native';
import React from 'react';
import ImageCp from '../Image/Image';
import Skeleton from '../Skeleton/Skeleton';
import {removeUSDT} from '../../utils/format/removeUSDT';
import styles from './CoinDetailCss';
import stylesGeneral from '../../styles/General';
import stylesStatus from '../../styles/Status';

export default function CoinDetail({item, navigation}) {
  return (
    <View style={[styles.coinItem]}>
      <View style={[stylesGeneral.flexRow]}>
        <View style={[styles.coinItem_Image]}>
          <ImageCp uri={item?.logo} />
        </View>
        <View style={[styles.coinItem_Info, stylesGeneral.ml12]}>
          <Text style={[styles.coinItem_Info_name]}>
            {removeUSDT(item?.symbol)}
          </Text>
          <Text style={[styles.coinItem_Info_quantity]}>
            {item?.price ? item?.price : 0}
          </Text>
        </View>
      </View>
      <View style={[styles.coinItem_Price]}>
        <View style={[styles.coinItem_Price_text, stylesGeneral.flexCenter]}>
          {/* <Text style={[stylesGeneral.mw50, stylesGeneral.fwbold]}>High: </Text> */}
          {item?.high ? (
            <Text style={[stylesGeneral.fwbold, stylesStatus.complete]}>
              {item?.high}
            </Text>
          ) : (
            <Skeleton />
          )}
        </View>
        <View style={[styles.coinItem_Price_text, stylesGeneral.flexCenter]}>
          {/* <Text style={[stylesGeneral.mw50, stylesGeneral.fwbold]}>Low: </Text> */}
          {item?.low ? (
            <Text style={[stylesGeneral.fwbold, stylesStatus.cancel]}>
              {item?.low}
            </Text>
          ) : (
            <Skeleton />
          )}
        </View>
      </View>
    </View>
  );
}
