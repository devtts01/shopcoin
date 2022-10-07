/* eslint-disable prettier/prettier */
/* eslint-disable prettier/prettier */
import {
  View,
  Text,
  ScrollView,
  RefreshControl,
  Image,
  Alert,
  TouchableOpacity,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import ImagePicker from 'react-native-image-crop-picker';
import {ModalLoading} from '../../components';
import styles from './UploadDoumentCss';
import stylesGeneral from '../../styles/General';
import stylesStatus from '../../styles/Status';

export default function UploadDoument({navigation}) {
  const [refreshing, setRefreshing] = useState(false);
  const [isStatus, setIsStatus] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fileResponseFront, setFileResponseFront] = useState(null);
  const [fileResponseBack, setFileResponseBack] = useState(null);
  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);
  const handleDocumentSelectionFront = useCallback(() => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      setFileResponseFront(image.path);
    });
  }, []);
  const handleDocumentSelectionBack = useCallback(() => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      setFileResponseBack(image.path);
    });
  }, []);
  const handleChangeStatus = () => {
    setIsStatus(!isStatus);
  };
  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      Alert.alert('Success!', 'Upload document successfully!', [
        {text: 'OK', onPress: () => navigation.navigate('Profile')},
      ]);
    }, 5000);
  };
  return (
    <ScrollView
      style={[styles.container]}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <View style={[styles.content]}>
        <Text style={[styles.title]}>Upload your image document</Text>
        <View style={[styles.front_image_container]}>
          {isStatus ? (
            <View
              style={[
                styles.btn_upload,
                stylesStatus.completebgcbold,
                stylesGeneral.flexRow,
              ]}
              onTouchStart={handleDocumentSelectionFront}>
              <FontAwesome5
                name="image"
                size={16}
                style={[stylesStatus.white]}
              />
              <Text
                style={[
                  styles.btn_text,
                  stylesStatus.white,
                  stylesGeneral.ml10,
                ]}>
                Upload front image
              </Text>
            </View>
          ) : (
            <Text style={[styles.front_title]}>Front image</Text>
          )}

          <Image
            source={{
              uri: 'http://craftsnippets.com/articles_images/placeholder/placeholder.jpg',
            }}
            style={[styles.image]}
            resizeMode="cover"
          />
        </View>
        <View style={[styles.back_image_container]}>
          {isStatus ? (
            <View
              style={[
                styles.btn_upload,
                stylesStatus.completebgcbold,
                stylesGeneral.flexRow,
              ]}
              onTouchStart={handleDocumentSelectionBack}>
              <FontAwesome5
                name="image"
                size={16}
                style={[stylesStatus.white]}
              />
              <Text
                style={[
                  styles.btn_text,
                  stylesStatus.white,
                  stylesGeneral.ml10,
                ]}>
                Upload back image
              </Text>
            </View>
          ) : (
            <Text style={[styles.back_title]}>Back image</Text>
          )}
          <Image
            source={{
              uri: 'http://craftsnippets.com/articles_images/placeholder/placeholder.jpg',
            }}
            style={[styles.image]}
            resizeMode="cover"
          />
        </View>
        <TouchableOpacity
          activeOpacity={0.6}
          style={[styles.btn, stylesStatus.confirmbgcbold]}
          disabled={(!fileResponseFront || !fileResponseBack) && isStatus}
          onPress={!isStatus ? handleChangeStatus : handleSubmit}>
          <Text
            style={[
              styles.btn_text,
              (!fileResponseFront || !fileResponseBack) &&
                isStatus &&
                stylesGeneral.op6,
              stylesStatus.white,
            ]}>
            {!isStatus ? 'Change your document' : 'Submit'}
          </Text>
        </TouchableOpacity>
      </View>
      {loading && <ModalLoading />}
    </ScrollView>
  );
}
