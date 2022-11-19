/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: 'white',
    marginBottom: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    borderColor: 'transparent',
    borderWidth: 0,
    marginLeft: 10,
    minHeight: 40,
  },
});
export default styles;
