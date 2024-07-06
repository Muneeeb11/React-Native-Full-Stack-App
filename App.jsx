import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native'; 
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from './component/splashscreen'; 
import IntroductionScreen from './component/Introduction';
import AuthStack from './(auth)/_layout';
import Layout from './(nav-tab)/_layout';

const Stack = createNativeStackNavigator();

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  const handleFinishLoading = () => {
    setIsLoading(false);
  };

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isLoading ? (
          <Stack.Screen name="Splash">
            {() => <SplashScreen onFinish={handleFinishLoading} />}
          </Stack.Screen>
        ) : (
          <>
            <Stack.Screen name="Introduction" component={IntroductionScreen} />
            <Stack.Screen name="Auth" component={AuthStack} />
            <Stack.Screen name="tab" component={Layout}/>
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
