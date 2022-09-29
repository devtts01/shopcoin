/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 50,
    marginBottom: 'auto',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  info_sellCoin: {
    width: '100%',
    marginVertical: 30,
  },
  row: {
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    marginBottom: 15,
  },
  row_single: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    marginBottom: 10,
  },
  row_text: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  row_desc: {
    fontSize: 16,
    marginBottom: 8,
  },
  btn: {
    paddingHorizontal: 12,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  btn_text: {
    fontSize: 17,
    fontWeight: 'bold',
  },
});

export default styles;
