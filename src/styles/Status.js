/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';

const stylesStatus = StyleSheet.create({
  status: {
    fontSize: 15,
    fontWeight: 'bold',
    lineHeight: 18,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 30,
    textTransform: 'capitalize',
  },
  confirm: {
    color: '#007aff',
  },
  complete: {
    color: '#4CAF50',
  },
  vip: {
    color: '#ffab00',
  },
  cancel: {
    color: '#d50000',
  },
  confirmbgc: {
    color: '#007aff',
    backgroundColor: '#e6f5ff',
  },
  completebgc: {
    color: '#4CAF50',
    backgroundColor: '#edf7ee',
  },
  vipbgc: {
    color: '#ffab00',
    backgroundColor: '#fff7e6',
  },
  cancelbgc: {
    color: '#d50000',
    backgroundColor: '#ffebea',
  },
});

export default stylesStatus;
