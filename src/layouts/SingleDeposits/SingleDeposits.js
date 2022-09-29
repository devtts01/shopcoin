/* eslint-disable prettier/prettier */
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
  RefreshControl,
} from 'react-native';
import React, {useCallback, useState} from 'react';
// import DocumentPicker from 'react-native-document-picker';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import ImagePicker from 'react-native-image-crop-picker';
import {formatVND, formatUSDT} from '../../utils/format/Money';
import styles from './SingleDepositsCss';
import stylesGeneral from '../../styles/General';
import stylesStatus from '../../styles/Status';
import {ModalLoading} from '../../components';

export default function SingleDeposits({navigation}) {
  const [fileResponse, setFileResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [progressValue, setProgressValue] = useState(0.02);
  const [refreshing, setRefreshing] = useState(false);
  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);
  const handleDocumentSelection = useCallback(() => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      setFileResponse(image.path);
    });
  }, []);
  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setProgressValue(0.02);
      Alert.alert('Success!', 'Deposits confirm successfully!', [
        {text: 'OK', onPress: () => navigation.navigate('Deposits')},
      ]);
    }, 5000);
  };
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <View style={[styles.container]}>
        <Text style={[styles.title]}>Deposits Detail</Text>
        <View style={[styles.item, stylesGeneral.flexRow]}>
          <Text style={[styles.item_title]}>Code</Text>
          <Text style={[styles.item_desc]}>#676281</Text>
        </View>
        <View style={[styles.item, stylesGeneral.flexRow]}>
          <Text style={[styles.item_title]}>Status</Text>
          <Text
            style={[
              styles.item_desc,
              stylesStatus.completebgc,
              stylesStatus.status,
            ]}>
            Complete
          </Text>
        </View>
        <View style={[styles.item, stylesGeneral.flexRow]}>
          <Text style={[styles.item_title]}>Created At</Text>
          <Text style={[styles.item_desc]}>{new Date().toUTCString()}</Text>
        </View>
        <View style={[styles.item, stylesGeneral.flexRow]}>
          <Text style={[styles.item_title]}>Updated At</Text>
          <Text style={[styles.item_desc]}>{new Date().toUTCString()}</Text>
        </View>
        <View style={[styles.item, stylesGeneral.flexRow]}>
          <Text style={[styles.item_title]}>Amount USDT</Text>
          <Text style={[styles.item_desc]}>{formatUSDT(300000)}T</Text>
        </View>
        <View style={[styles.item, stylesGeneral.flexRow]}>
          <Text style={[styles.item_title]}>Amount VND</Text>
          <Text style={[styles.item_desc]}>{formatVND(72000000)}</Text>
        </View>
        <View style={[styles.item, stylesGeneral.flexRow]}>
          <Text style={[styles.item_title]}>Method</Text>
          <View style={[stylesGeneral.flexColumn]}>
            <Text style={[styles.item_desc]}>ACB</Text>
            <Text style={[styles.item_desc]}>Tran Van Dieu</Text>
            <Text style={[styles.item_desc]}>16744322</Text>
          </View>
        </View>
        <View>
          <TouchableOpacity activeOpacity={0.8}>
            <View
              style={[styles.btn, stylesStatus.vipbgcbold]}
              onTouchStart={handleDocumentSelection}>
              <FontAwesome5
                name="file-image"
                size={25}
                style={[stylesStatus.white]}
              />
              <Text
                style={[
                  styles.btn_text,
                  stylesStatus.white,
                  stylesGeneral.fwbold,
                  stylesGeneral.ml8,
                ]}>
                Pick an image from camera roll
              </Text>
            </View>
          </TouchableOpacity>
          {fileResponse !== null && (
            <Image
              source={{uri: `${fileResponse}`}}
              style={[styles.image, stylesGeneral.mt10]}
              resizeMode="contain"
            />
          )}
        </View>
        <TouchableOpacity activeOpacity={0.8} onPress={handleSubmit}>
          <View
            style={[
              styles.btn,
              stylesStatus.completebgcbold,
              stylesGeneral.mt10,
            ]}>
            <Text
              style={[
                styles.btn_text,
                stylesStatus.white,
                stylesGeneral.fwbold,
              ]}>
              Submit
            </Text>
          </View>
        </TouchableOpacity>
        {loading && progressValue < 1 && <ModalLoading value={progressValue} />}
      </View>
    </ScrollView>
  );
}
