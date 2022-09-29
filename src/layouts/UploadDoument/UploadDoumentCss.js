/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  front_image_container: {
    marginTop: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  back_image_container: {
    marginTop: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  front_title: {
    fontSize: 15,
    marginBottom: 12,
  },
  back_title: {
    fontSize: 15,
    marginBottom: 12,
  },
  btn: {
    marginTop: 24,
    width: '100%',
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn_text: {
    fontWeight: 'bold',
    fontSize: 17,
  },
  image: {
    width: 350,
    height: 180,
  },
  btn_upload: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 8,
    marginBottom: 12,
  },
});

export default styles;
