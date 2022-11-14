/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  image_item: {
    width: '49%',
    marginTop: 12,
    marginBottom: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonUpload: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 200,
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
  },
  typeUpload: {
    fontWeight: 'bold',
    marginVertical: 10,
    marginHorizontal: 10,
    marginBottom: 'auto',
  },
  image_title: {
    fontSize: 15,
    marginBottom: 12,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imageUploadIcons: {
    width: '100%',
    height: 60,
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{translateX: -90}, {translateY: -20}],
  },
  btn_upload: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 8,
    marginBottom: 12,
  },
  btn_text: {
    fontWeight: 'bold',
    fontSize: 12,
    textAlign: 'center',
  },
});

export default styles;
