/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  label: {
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
  input: {
    fontSize: 17,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 10,
    marginVertical: 10,
    fontStyle: 'italic',
  },
  input_padding: {
    paddingRight: 45,
  },
  input_relative: {
    position: 'relative',
  },
  icon: {
    flexDirection: 'row',
    position: 'absolute',
    top: '50%',
    right: 15,
    transform: [{translateY: -10}],
  },
});
export default styles;
