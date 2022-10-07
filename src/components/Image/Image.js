/* eslint-disable prettier/prettier */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable prettier/prettier */
import {useState} from 'react';
import {Image} from 'react-native';
import styles from './ImageCss';

const ImageCp = ({uri}) => {
  const [error, setError] = useState(true);
  return (
    <Image
      style={[styles.image]}
      source={
        error
          ? {uri: `https://apishopcoin.4eve.site/${uri}`}
          : {
              uri: 'https://img.capital.com/imgs/articles/1200x627x1/shutterstock_1923715325.jpg',
            }
      }
      resizeMode="cover"
      onError={() => {
        setError(false);
      }}
    />
  );
};
export default ImageCp;
