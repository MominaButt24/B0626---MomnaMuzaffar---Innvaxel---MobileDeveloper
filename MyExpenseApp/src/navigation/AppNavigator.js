/**
 * AppNavigator.js
 * 
 * This is the main traffic controller for the app. It decides 
 * which screen the user should see first.
 * 
 * Logic:
 * 1. Shows the Splash screen while loading data.
 * 2. If it's the user's first time, it sends them to Onboarding.
 * 3. Otherwise, it loads the main Tab Navigator.
 */

import React, { useState, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TabNavigator from './TabNavigator';
import AddEditScreen from '../screens/AddEditScreen';
import OnboardingScreen from '../screens/OnboardingScreen';
import SplashScreen from '../screens/SplashScreen';
import { useExpenses } from '../context/ExpenseContext';

const Stack = createStackNavigator();

const AppNavigator = () => {
  const { isFirstLaunch, loading } = useExpenses();
  const [splashVisible, setSplashVisible] = useState(true);

  // We want the splash screen to stay visible for at least 2.5 seconds 
  // so the branding has time to shine and the transition isn't too jarring.
  useEffect(() => {
    const timer = setTimeout(() => {
      setSplashVisible(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  // While we are fetching data from storage or waiting for the splash timer, 
  // we keep showing the animated splash screen.
  if (loading || isFirstLaunch === null || splashVisible) {
    return <SplashScreen />;
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* 
        If it's the first launch, we only allow them to see Onboarding.
        Once that's done, the state updates and they get access to the rest.
      */}
      {isFirstLaunch ? (
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      ) : (
        <>
          {/* Main is the bottom tab navigation */}
          <Stack.Screen name="Main" component={TabNavigator} />
          
          {/* 
            AddExpense is defined as a 'modal'. On iOS, this means it 
            slides up from the bottom, which feels right for a quick input form.
          */}
          <Stack.Screen 
            name="AddExpense" 
            component={AddEditScreen} 
            options={{ 
              presentation: 'modal',
              headerShown: false,
            }} 
          />
        </>
      )}
    </Stack.Navigator>
  );
};

export default AppNavigator;
