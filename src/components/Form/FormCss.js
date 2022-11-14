/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollview: {
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  content: {
    backgroundColor: 'white',
    borderRadius: 0,
    paddingHorizontal: 18,
    paddingVertical: 24,
    marginBottom: 35,
  },
  title_form: {
    textAlign: 'center',
    fontSize: 25,
    fontWeight: 'bold',
    fontStyle: 'italic',
    marginVertical: 10,
  },
  error_container: {
    alignItems: 'center',
    marginVertical: 12,
  },
  error_text: {
    color: 'red',
    letterSpacing: 0.5,
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
