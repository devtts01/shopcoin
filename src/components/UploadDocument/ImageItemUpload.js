/* eslint-disable prettier/prettier */
/* eslint-disable prettier/prettier */
import {View, Text, Image} from 'react-native';
import React from 'react';
import {URL_SERVER} from '@env';
import styles from './ImageItemUploadCss';
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
      <View
        style={[stylesGeneral.flexRow, styles.buttonUpload]}
        onTouchStart={
          (isStatus && userById[field]) || (!userById[field] && isStatus)
            ? selectFile
            : () => {}
        }>
        {/* fileResponse?.uri */}
        {!fileResponse && !userById[field] ? (
          <>
            <Text style={[styles.typeUpload]}>{textUpload}</Text>
            <Image
              style={[styles.imageUploadIcons]}
              resizeMethod="resize"
              resizeMode="contain"
              source={require('../../assets/images/upload.png')}
            />
          </>
        ) : (
          <Image
            source={{
              uri: `${
                fileResponse !== null
                  ? fileResponse
                  : userById[field]
                  ? `${URL_SERVER}${userById[field]?.replace('uploads/', '')}`
                  : 'http://craftsnippets.com/articles_images/placeholder/placeholder.jpg'
              }`,
            }}
            style={[styles.image]}
            resizeMode="contain"
          />
        )}
      </View>
    </View>
  );
}
