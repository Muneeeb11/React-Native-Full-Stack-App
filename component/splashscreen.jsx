import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';

const SplashScreen = ({ onFinish }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Start the animation
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 1500,
        delay: 500,
        useNativeDriver: true,
      }),
    ]).start(() => {
      // Call the onFinish function passed from App.js
      if (onFinish) {
        onFinish();
      }
    });
  }, [fadeAnim, onFinish]);

  return (
    <View style={styles.container}>
      <Animated.Text style={[styles.text, { opacity: fadeAnim }]}>
        NORDSTONE
      </Animated.Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#161622',
  },
  text: {
    fontFamily: 'Poppins-ExtraBold',
    fontSize: 42,
    color: '#DC5F00',
  },
});

export default SplashScreen;
