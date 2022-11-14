/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  desc: {
    lineHeight: 25,
    marginBottom: 12,
  },
  btn: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 24,
  },
  btn_text: {
    fontWeight: 'bold',
    fontSize: 17,
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
