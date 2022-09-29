/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  btn_container: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  btn: {
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: '#ededed',
    marginHorizontal: 8,
  },
  btn_text: {
    fontWeight: 'bold',
  },
  item: {
    borderColor: '#4CAF50',
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 8,
    marginVertical: 12,
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
  },
});

export default styles;
