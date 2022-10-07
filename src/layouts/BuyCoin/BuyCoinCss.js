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
  exchange: {
    marginVertical: 15,
  },
  amountUsdt: {
    borderRadius: 5,
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  btn: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
    paddingVertical: 12,
    marginTop: 24,
    borderRadius: 8,
  },
  btn_text: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  btn_disabled: {
    opacity: 0.6,
  },
});

export default styles;
