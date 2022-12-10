/* eslint-disable prettier/prettier */
/* eslint-disable react/react-in-jsx-scope */
import {useState} from 'react';
import {Image} from 'react-native';
import {URL_SERVER} from '@env';
import styles from './ImageCss';

const ImageCp = ({uri, style}) => {
  const [error, setError] = useState(true);
  return (
    <Image
      style={[styles.image, {...style}]}
      source={
        error
          ? {
              uri: `${URL_SERVER}${uri?.replace('uploads/', '')}`,
            }
          : {
              uri: 'https://img.freepik.com/premium-vector/bitcoin-golden-cryptocurrency-coin-electronics-finance-money-symbol_53562-8482.jpg?w=2000',
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
