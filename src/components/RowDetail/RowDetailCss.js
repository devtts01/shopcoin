/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  info_detail_item: {
    justifyContent: 'space-between',
    borderBottomColor: '#ededed',
    borderBottomWidth: 1,
    marginVertical: 5,
  },
  info_detail_title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  info_detail_desc: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: '500',
  },
  borderBt0: {
    borderBottomColor: 'transparent',
    borderBottomWidth: 0,
    marginVertical: 0,
  },
});

export default styles;
