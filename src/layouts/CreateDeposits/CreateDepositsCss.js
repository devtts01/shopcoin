/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  title: {
    fontSize: 22,
    marginBottom: 24,
    fontWeight: 'bold',
  },
  btn_submit: {
    marginTop: 24,
    paddingHorizontal: 12,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
  },
  centeredView: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalView: {
    width: '70%',
    minHeight: 100,
    backgroundColor: 'white',
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 8,
    shadowColor: 'rgba(0,0,0,0.3)',
    shadowOffset: {
      width: 2,
      height: 0,
    },
    shadowOpacity: 0.5,
    shadowRadius: 8,
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: '#ededed',
    marginVertical: 10,
  },
  bankList: {
    maxHeight: 150,
  },
  bankItem: {
    backgroundColor: '#ededed',
    paddingHorizontal: 8,
    paddingVertical: 10,
    marginVertical: 2,
  },
});

export default styles;
