/* eslint-disable prettier/prettier */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable prettier/prettier */
/* eslint-disable prettier/prettier */
import {forwardRef, useState} from 'react';
import {Text, TextInput, View} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import styles from './FormInputCss';
import stylesGeneral from '../../styles/General';

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
    nameSymbol,
    color,
    colorSymbol,
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
      <Text style={[styles.label, stylesGeneral.text_black]}>{label}</Text>
      <View style={[styles.input_relative]}>
        {nameSymbol && (
          <View style={[styles.icon_symbol]}>
            <FontAwesome5 name={nameSymbol} size={20} color={colorSymbol} />
          </View>
        )}
        <TextInput
          // ascii-capable, number-pad, name-phone-pad, numbers-and-punctuation, phone-pad
          keyboardType={keyboardType}
          placeholder={placeholder}
          style={[
            styles.input,
            icon && styles.input_padding_right,
            nameSymbol && styles.input_padding_left,
          ]}
          secureTextEntry={!isShowPwd && secureTextEntry}
          ref={ref}
          onChangeText={onChangeText}
          onChange={onChange}
          value={value}
          cursorColor="#ffab00"
        />
        {(icon || color) && (
          <View style={[styles.icon]}>
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
        )}
      </View>
    </View>
  );
};

export default forwardRef(FormInput);
