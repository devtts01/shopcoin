/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  item: {
    borderColor: '#4CAF50',
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 8,
    marginVertical: 4,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  row_title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  row_desc: {
    fontSize: 16,
    fontWeight: '500',
  },
});

export default styles;
