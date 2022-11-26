/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  dflex: {
    display: 'flex',
  },
  container: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  btn_container: {
    minWidth: 50,
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn_buy: {
    backgroundColor: '#1B9CFC',
  },
  btn_sell: {
    backgroundColor: '#c23616',
  },
  btn_text: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default styles;
