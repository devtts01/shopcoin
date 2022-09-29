/* eslint-disable prettier/prettier */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable prettier/prettier */
/* eslint-disable prettier/prettier */
import {forwardRef, useState} from 'react';
import {Text, TextInput, View} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import styles from './FormInputCss';

const FormInput = (
  {
    label,
    value,
    placeholder,
    secureTextEntry = false,
    onChangeText,
    onChange,
    keyboardType,
    icon,
    name,
    color,
    showPwd,
  },
  ref,
) => {
  const [isShowPwd, setIsShowPwd] = useState(false);
  const handleShowPwd = () => {
    setIsShowPwd(!isShowPwd);
  };
  return (
    <View style={[styles.input_item]}>
      <Text style={[styles.label]}>{label}</Text>
      <View style={[styles.input_relative]}>
        <TextInput
          // ascii-capable, number-pad, name-phone-pad, numbers-and-punctuation, phone-pad
          keyboardType={keyboardType}
          placeholder={placeholder}
          style={[styles.input, icon && styles.input_padding]}
          secureTextEntry={!isShowPwd && secureTextEntry}
          ref={ref}
          onChangeText={onChangeText}
          onChange={onChange}
          value={value}
        />
        {icon ||
          (color && (
            <View style={[styles.icon]}>
              <FontAwesome5 name={name} size={20} color={color} />
              {showPwd ? (
                <>
                  {isShowPwd ? (
                    <View onTouchStart={handleShowPwd}>
                      <FontAwesome5 name="eye" size={20} color={color} />
                    </View>
                  ) : (
                    <View onTouchStart={handleShowPwd}>
                      <FontAwesome5 name="eye-slash" size={20} color={color} />
                    </View>
                  )}
                </>
              ) : (
                <FontAwesome5 name={name} size={20} color={color} />
              )}
            </View>
          ))}
      </View>
    </View>
  );
};

export default forwardRef(FormInput);
