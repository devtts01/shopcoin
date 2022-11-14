/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  centerView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  modalText: {
    fontSize: 17,
  },
  modalView: {
    justifyContent: 'space-around',
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
  progressBar: {
    height: 15,
    width: '100%',
    backgroundColor: 'white',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 3,
  },
});

export default styles;
