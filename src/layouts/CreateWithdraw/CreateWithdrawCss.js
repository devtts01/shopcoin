/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn: {
    width: '100%',
    paddingHorizontal: 12,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    borderRadius: 8,
  },
  btn_text: {
    fontWeight: 'bold',
    fontSize: 17,
  },
  info_withdraw_container: {
    width: '100%',
  },
  info_detail: {
    width: '100%',
  },
  info_detail_border: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  info_item: {
    justifyContent: 'space-between',
  },
});

export default styles;
