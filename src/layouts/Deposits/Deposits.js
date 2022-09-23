/* eslint-disable prettier/prettier */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable prettier/prettier */
import {View, Text} from 'react-native';
import styles from './DepositsCss';
import stylesStatus from '../../styles/Status';
import stylesGeneral from '../../styles/General';

const Deposits = () => {
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
      <View style={[styles.container_btn]}>
        <Text style={[styles.btn, stylesStatus.vipbgc]}>Create</Text>
      </View>
    </View>
  );
};

export default Deposits;
