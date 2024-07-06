import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { icons } from '../constants';

const FormField = ({ title, value,type ,placeholder, handleChangeText, otherStyles, ...props }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={[styles.container, otherStyles]}>
      <Text style={styles.label}>{title}</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#7b7b8b"
          onChangeText={handleChangeText}
          keyboardType={type}
          secureTextEntry={title === 'Password' && !showPassword}
        />
        {title === 'Password' && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image source={!showPassword ? icons.eye : icons.eyeHide} style={styles.eyeIcon} resizeMode='contain' />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 8,
  },
  label: {
    fontSize: 16,
    color: 'white',
    marginLeft:9,
    marginTop: 15,
    marginBottom:1,
    fontFamily:'Poppins-Medium'
  },
  inputContainer: {
    flexDirection: 'row',
    width: '100%',
    height: 50,
    paddingHorizontal: 16,
    backgroundColor: 'black',
    borderRadius: 28,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    color: 'white',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    alignItems:'center',
    textAlignVertical:'bottom'
  },
  eyeIcon: {
    width: 24,
    height: 24,
  },
});

export default FormField;
