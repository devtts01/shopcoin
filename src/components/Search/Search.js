/* eslint-disable prettier/prettier */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable prettier/prettier */
import {View, TextInput} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import styles from './SearchCss';

const Search = ({name, value, onChange}) => {
  return (
    <View style={[styles.container]}>
      <FontAwesome5 name="search" size={20} />
      <TextInput placeholder="Search ..." style={[styles.input]} />
    </View>
  );
};

export default Search;
