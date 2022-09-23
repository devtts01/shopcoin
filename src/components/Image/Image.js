/* eslint-disable prettier/prettier */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable prettier/prettier */
import {Image} from 'react-native';
import styles from './ImageCss';

const ImageCp = () => {
  return (
    <Image
      style={[styles.image]}
      source={{uri: 'https://reactnative.dev/img/tiny_logo.png'}}
    />
  );
};
export default ImageCp;
