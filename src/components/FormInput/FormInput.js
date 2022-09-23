/* eslint-disable prettier/prettier */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable prettier/prettier */
/* eslint-disable prettier/prettier */
import {forwardRef} from 'react';
import {Text, TextInput, View} from 'react-native';
import styles from './FormInputCss';

const FormInput = (
  {label, value, placeholder, secureTextEntry = false, onChangeText, onChange},
  ref,
) => {
  return (
    <View style={[styles.input_item]}>
      <Text style={[styles.label]}>{label}</Text>
      <TextInput
        placeholder={placeholder}
        style={[styles.input]}
        secureTextEntry={secureTextEntry}
        ref={ref}
        onChangeText={onChangeText}
        onChange={onChange}
        value={value}
      />
    </View>
  );
};

export default forwardRef(FormInput);
