import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { CommonActions } from '@react-navigation/native';

const Message = ({ navigation, message, nextScreen }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: nextScreen }],
        })
      );
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  message: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default Message;
