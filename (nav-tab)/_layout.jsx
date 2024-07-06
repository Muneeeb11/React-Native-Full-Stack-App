import React, { useState, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Calculator from './calculator';
import Chatscreen from './chatscreen';
import { icons } from '../constants';
import { Image, Text, View, StyleSheet, Keyboard } from 'react-native';

const TabIcon = ({ icon, color, name, focused }) => {
  return (
    <View style={{ alignItems: 'center', justifyContent: 'center', gap: 2 }}>
      <Image
        source={icon}
        tintColor={focused ? '#FFA001' : 'white'}
        resizeMode='contain'
        style={{ width: 25, height: 25 }}
      />
      <Text style={[styles.tabBar, { color: focused ? '#FFA001' : 'white' }]}>
        {name}
      </Text>
    </View>
  );
};

const Tab = createBottomTabNavigator();

const Layout = () => {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardVisible(true);
    });
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false);
    });

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#FFA001',
        tabBarShowLabel: false,
        tabBarInactiveTintColor: 'white',
        tabBarStyle: isKeyboardVisible
          ? { display: 'none' }
          : {
              backgroundColor: '#161622',
              borderTopWidth: 1,
              borderTopColor: '#232533',
              height: 64,
            },
      }}
    >
      <Tab.Screen
        name="Calculator"
        component={Calculator}
        options={{
          headerShown: false,
          tabBarLabel: 'Calculator',
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={icons.Calculator}
              name="Calculator"
              color={color}
              focused={focused}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Chat"
        component={Chatscreen}
        options={{
          headerShown: false,
          tabBarLabel: 'Chat',
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={icons.chat}
              name="Chat"
              color={color}
              focused={focused}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default Layout;
