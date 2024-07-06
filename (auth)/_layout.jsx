import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Signin from './signin';
import Signup from './signup';
import Profile from './profile';
import { AuthProvider } from './AuthProvider';
const Stack = createNativeStackNavigator();

const _layout = () => {
  return (
    <AuthProvider>
      <Stack.Navigator initialRouteName="Profile">
        <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false }} />
        <Stack.Screen name="Signin" component={Signin} options={{ headerShown: false }} />
        <Stack.Screen name='Profile' component={Profile} options={{ headerShown: false }}/>

      </Stack.Navigator>
    </AuthProvider>
  );
};

export default _layout;
