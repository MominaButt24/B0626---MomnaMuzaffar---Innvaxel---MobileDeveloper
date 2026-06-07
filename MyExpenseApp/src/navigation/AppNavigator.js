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

  // Ensure the splash screen is visible for at least 2.5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setSplashVisible(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  // Show Splash while loading data OR for the minimum branding duration
  if (loading || isFirstLaunch === null || splashVisible) {
    return <SplashScreen />;
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isFirstLaunch ? (
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      ) : (
        <>
          <Stack.Screen name="Main" component={TabNavigator} />
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
