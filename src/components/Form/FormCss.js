/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
  },
  content: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 8,
    paddingHorizontal: 18,
    paddingVertical: 24,
  },
  title_form: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
  error_container: {
    alignItems: 'center',
    marginVertical: 12,
  },
  error_text: {
    color: 'red',
    fontFamily: 'monospace',
  },
  input_btn: {
    width: '100%',
    textAlign: 'center',
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 5,
    color: 'white',
    fontWeight: 'bold',
    marginVertical: 12,
  },
  image_form: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 200,
    height: 50,
  },
});

export default styles;
