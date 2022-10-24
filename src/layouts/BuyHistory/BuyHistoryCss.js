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
  listItem: {
    // flex: 1,
    marginBottom: 50,
  },
});

export default styles;
