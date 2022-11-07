/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
/* eslint-disable prettier/prettier */
/* eslint-disable prettier/prettier */
import {
  View,
  Text,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
  Platform,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {launchImageLibrary} from 'react-native-image-picker';
import {useAppContext} from '../../utils';
import requestRefreshToken from '../../utils/axios/refreshToken';
import {setCurrentUser} from '../../app/payloads/user';
import {getUserById} from '../../app/payloads/getById';
import {setMessage} from '../../app/payloads/message';
import {ImageItemUpload, ModalLoading} from '../../components';
import styles from './UploadDoumentCss';
import stylesGeneral from '../../styles/General';
import stylesStatus from '../../styles/Status';
import {SVgetUserById, SVuploadDocument} from '../../services/user';

export default function UploadDoument({navigation}) {
  const {state, dispatch} = useAppContext();
  const {currentUser, userById} = state;
  const [refreshing, setRefreshing] = useState(false);
  const [isStatus, setIsStatus] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fileResponseFrontCCCD, setFileResponseFrontCCCD] = useState(null);
  const [fileResponseBackCCCD, setFileResponseBackCCCD] = useState(null);
  const [fileResponseFrontLicense, setFileResponseFrontLicense] =
    useState(null);
  const [fileResponseBackLicense, setFileResponseBackLicense] = useState(null);
  const [dataImageForm, setDataImageForm] = useState([]);
  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    SVgetUserById({
      id: currentUser?.id,
      dispatch,
      getUserById,
    });
    wait(2000).then(() => setRefreshing(false));
  }, []);
  useEffect(() => {
    SVgetUserById({
      id: currentUser?.id,
      dispatch,
      getUserById,
    });
  }, []);
  const options = {
    title: 'Select Image',
    type: 'library, photo, video, camera',
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

  const handleDocumentSelectionFrontCCCD = async () => {
    const images = await launchImageLibrary(options);
    const formData = new FormData();
    formData.append('cccdFont', {
      uri:
        Platform.OS === 'android'
          ? images?.assets[0]?.uri
          : images?.assets[0]?.uri.replace('file://', ''),
      type: images?.assets[0]?.type,
      name: images?.assets[0]?.fileName,
    });
    setFileResponseFrontCCCD(images.assets[0]);
    setDataImageForm([...dataImageForm, formData]);
  };
  const handleDocumentSelectionBackCCCD = async () => {
    const images = await launchImageLibrary(options);
    const formData = new FormData();
    formData.append('cccdBeside', {
      uri:
        Platform.OS === 'android'
          ? images?.assets[0]?.uri
          : images?.assets[0]?.uri.replace('file://', ''),
      type: images?.assets[0]?.type,
      name: images?.assets[0]?.fileName,
    });
    setFileResponseBackCCCD(images.assets[0]);
    setDataImageForm([...dataImageForm, formData]);
  };
  const handleDocumentSelectionFrontLicense = async () => {
    const images = await launchImageLibrary(options);
    const formData = new FormData();
    formData.append('licenseFont', {
      uri:
        Platform.OS === 'android'
          ? images?.assets[0]?.uri
          : images?.assets[0]?.uri.replace('file://', ''),
      type: images?.assets[0]?.type,
      name: images?.assets[0]?.fileName,
    });
    setFileResponseFrontLicense(images.assets[0]);
    setDataImageForm([...dataImageForm, formData]);
  };
  const handleDocumentSelectionBackLicense = async () => {
    const images = await launchImageLibrary(options);
    const formData = new FormData();
    formData.append('licenseBeside', {
      uri:
        Platform.OS === 'android'
          ? images?.assets[0]?.uri
          : images?.assets[0]?.uri.replace('file://', ''),
      type: images?.assets[0]?.type,
      name: images?.assets[0]?.fileName,
    });
    setFileResponseBackLicense(images.assets[0]);
    setDataImageForm([...dataImageForm, formData]);
  };
  const handleChangeStatus = () => {
    setIsStatus(true);
  };
  const uploadImageAPI = (data, id) => {
    SVuploadDocument({
      id: id,
      imageForm: dataImageForm,
      token: data?.token,
      setLoading,
      navigation,
    });
  };
  const handleSubmit = id => {
    try {
      requestRefreshToken(
        currentUser,
        uploadImageAPI,
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
      style={[styles.container]}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <View style={[styles.content]}>
        {/* <Text style={[styles.title, stylesGeneral.mb10]}>
          Upload your image document
        </Text> */}
        <View style={[styles.image_container]}>
          <Text style={[stylesGeneral.fz16, stylesGeneral.fwbold]}>
            1. Citizen Identification
          </Text>
          <View style={[styles.image_container_item]}>
            <ImageItemUpload
              isStatus={isStatus}
              selectFile={handleDocumentSelectionFrontCCCD}
              textUpload="Front citizen identification"
              text="Front CCCD image"
              fileResponse={fileResponseFrontCCCD}
              userById={userById}
              field="uploadCCCDFont"
            />
            <ImageItemUpload
              isStatus={isStatus}
              selectFile={handleDocumentSelectionBackCCCD}
              textUpload="Back citizen identification"
              text="Back CCCD image"
              fileResponse={fileResponseBackCCCD}
              userById={userById}
              field="uploadCCCDBeside"
            />
          </View>
          <Text style={[stylesGeneral.fz16, stylesGeneral.fwbold]}>
            2. License
          </Text>
          <View style={[styles.image_container_item]}>
            <ImageItemUpload
              isStatus={isStatus}
              selectFile={handleDocumentSelectionFrontLicense}
              textUpload="Front license"
              text="Front license image"
              fileResponse={fileResponseFrontLicense}
              userById={userById}
              field="uploadCCCDFont"
            />
            <ImageItemUpload
              isStatus={isStatus}
              selectFile={handleDocumentSelectionBackLicense}
              textUpload="Back license"
              text="Back license image"
              fileResponse={fileResponseBackLicense}
              userById={userById}
              field="uploadLicenseBeside"
            />
          </View>
        </View>
        <TouchableOpacity
          activeOpacity={0.6}
          style={[styles.btn, stylesStatus.confirmbgcbold]}
          onPress={
            !isStatus ? handleChangeStatus : () => handleSubmit(currentUser?.id)
          }>
          <Text
            style={[styles.btn_text, stylesStatus.white, stylesGeneral.fz16]}>
            {!isStatus
              ? userById?.uploadCCCDFont ||
                userById?.uploadCCCDBeside ||
                userById?.uploadLicenseFont ||
                userById?.uploadLicenseBeside
                ? 'Change document'
                : 'Start upload'
              : 'Submit'}
          </Text>
        </TouchableOpacity>
      </View>
      {loading && <ModalLoading />}
    </ScrollView>
  );
}
