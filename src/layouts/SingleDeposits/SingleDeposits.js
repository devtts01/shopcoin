/* eslint-disable prettier/prettier */
/* eslint-disable prettier/prettier */
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  RefreshControl,
  Platform,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {launchImageLibrary} from 'react-native-image-picker';
import {useAppContext} from '../../utils';
import {setCurrentUser} from '../../app/payloads/user';
import {setMessage} from '../../app/payloads/message';
import {formatVND, formatUSDT} from '../../utils/format/Money';
import requestRefreshToken from '../../utils/axios/refreshToken';
import {dateFormat} from '../../utils/format/Date';
import {ModalLoading, RowDetail} from '../../components';
import styles from './SingleDepositsCss';
import stylesGeneral from '../../styles/General';
import stylesStatus from '../../styles/Status';
import {SVupdateDeposits} from '../../services/deposits';
import {textLower} from '../../utils/format/textLowercase';

export default function SingleDeposits({navigation, route}) {
  const {state, dispatch} = useAppContext();
  const {currentUser} = state;
  const {data} = route.params;
  const [fileResponse, setFileResponse] = useState(null);
  const [dataImageForm, setDataImageForm] = useState(null);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);
  const options = {
    title: 'Select Image',
    type: 'library',
    options: {
      maxHeight: 200,
      maxWidth: 200,
      selectionLimit: 1,
      mediaType: 'photo',
      includeBase64: false,
      allowsEditing: true,
      noData: true,
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    },
  };
  const handleDocumentSelection = async () => {
    const images = await launchImageLibrary(options);
    const formData = new FormData();
    formData.append('image', {
      uri:
        Platform.OS === 'android'
          ? images?.assets[0]?.uri
          : images?.assets[0]?.uri.replace('file://', ''),
      type: images?.assets[0]?.type,
      name: images?.assets[0]?.fileName,
    });
    setFileResponse(images.assets[0]);
    setDataImageForm(formData);
  };
  const submitSingleDepositsAPI = (dataAPI, id) => {
    SVupdateDeposits({
      token: dataAPI?.token,
      id: data?._id,
      image: dataImageForm,
      setLoading,
      navigation,
    });
  };
  const handleSubmit = id => {
    try {
      requestRefreshToken(
        currentUser,
        submitSingleDepositsAPI,
        state,
        dispatch,
        setCurrentUser,
        setMessage,
        id,
      );
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <View style={[styles.container]}>
        <Text style={[styles.title]}>Deposits Detail</Text>
        <RowDetail title="Code" text={data?.code} />
        <RowDetail
          title="Status"
          text={data?.status?.toLowerCase()}
          styleDesc={[
            stylesStatus.status,
            textLower(data?.status) === 'on hold'
              ? stylesStatus.vipbgc
              : textLower(data?.status) === 'confirm'
              ? stylesStatus.confirmbgc
              : textLower(data?.status) === 'complete'
              ? stylesStatus.completebgc
              : textLower(data?.status) === 'cancel'
              ? stylesStatus.cancelbgc
              : stylesStatus.demobgc,
          ]}
        />
        <RowDetail
          title="Created At"
          text={dateFormat(data?.createdAt, 'DD/MM/YYYY')}
        />
        <RowDetail
          title="Updated At"
          text={dateFormat(data?.updatedAt, 'DD/MM/YYYY')}
        />
        <RowDetail title="Amount USDT" text={formatUSDT(data?.amount)} />
        <RowDetail title="Amount VND" text={formatVND(data?.amountVnd)} />
        <View style={[styles.item, stylesGeneral.flexRow]}>
          <Text style={[styles.item_title]}>Method</Text>
          <View style={[stylesGeneral.flexColumn, stylesGeneral.flexEnd]}>
            <Text style={[styles.item_desc]}>ACB</Text>
            <Text style={[styles.item_desc]}>TRẦN VĂN ĐIỀU</Text>
            <Text style={[styles.item_desc]}>16744317</Text>
          </View>
        </View>
        <View>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={handleDocumentSelection}>
            <View style={[styles.btn, stylesStatus.vipbgcbold]}>
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
            <View style={[stylesGeneral.flexCenter]}>
              <Image
                source={{uri: `${fileResponse.uri}`}}
                style={[styles.image, stylesGeneral.mt10]}
                resizeMode="contain"
              />
            </View>
          )}
        </View>
        <TouchableOpacity
          onPress={() => handleSubmit(data?._id)}
          activeOpacity={0.6}
          disabled={!fileResponse}
          style={[
            styles.btn,
            !fileResponse && stylesGeneral.op6,
            stylesStatus.confirmbgcbold,
            stylesGeneral.mt10,
          ]}>
          <Text
            style={[styles.btn_text, stylesStatus.white, stylesGeneral.fwbold]}>
            Submit
          </Text>
        </TouchableOpacity>
        {loading && <ModalLoading />}
      </View>
    </ScrollView>
  );
}
