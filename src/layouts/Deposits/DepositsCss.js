/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  container_btn: {
    width: '100%',
    borderRadius: 10,
  },
  btn: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontWeight: 'bold',
    fontSize: 17,
    width: '100%',
    textAlign: 'center',
  },
  item: {
    borderColor: '#4CAF50',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    marginTop: 8,
  },
  row: {
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
