import { TouchableOpacity, Text, StyleSheet, Image, View } from 'react-native';
import React from 'react';

const CustomButton = ({ title, handlePress, isLoading, icon, style }) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      style={[
        styles.button,
        isLoading && styles.disabledButton,
      ]}
    >
      <View style={styles.icontext}>
        <Text style={styles.buttonText}>
          {title}
        </Text>
        {icon && <Image source={icon} style={styles.icon} />}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#FF8E01',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    height:50,
    width:190
  },
  buttonText: {
    color: "black",
    fontFamily: 'Poppins-SemiBold',
    fontSize: 19,
  },
  disabledButton: {
    opacity: 0.5,
  },
  icontext: {
    flexDirection: 'row',
    alignItems:'center',
    alignContent:'center'
  },
  icon: {
    marginLeft:10,
    tintColor:'black',

  }
});

export default CustomButton;
