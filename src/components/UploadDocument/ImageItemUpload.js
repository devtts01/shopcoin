/* eslint-disable prettier/prettier */
import {View, Text, Image} from 'react-native';
import React from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {URL_SERVER} from '@env';
import styles from './ImageItemUploadCss';
import stylesStatus from '../../styles/Status';
import stylesGeneral from '../../styles/General';

export default function ImageItemUpload({
  isStatus,
  selectFile,
  fileResponse,
  userById,
  field,
  textUpload,
  text,
}) {
  return (
    <View style={[styles.image_item]}>
      {isStatus ? (
        <View
          style={[
            styles.btn_upload,
            stylesStatus.completebgcbold,
            stylesGeneral.flexRow,
          ]}
          onTouchStart={selectFile}>
          <FontAwesome5 name="image" size={16} style={[stylesStatus.white]} />
          <Text
            style={[styles.btn_text, stylesStatus.white, stylesGeneral.ml10]}>
            {textUpload}
          </Text>
        </View>
      ) : (
        <Text style={[styles.image_title]}>{text}</Text>
      )}
      <Image
        source={{
          uri: `${
            fileResponse !== null
              ? fileResponse?.uri
              : userById[field]
              ? `${URL_SERVER}${userById[field]?.replace('uploads/', '')}`
              : 'http://craftsnippets.com/articles_images/placeholder/placeholder.jpg'
          }`,
        }}
        style={[styles.image]}
        resizeMode="contain"
      />
    </View>
  );
}
