import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TabNavigator from './TabNavigator';
import AddEditScreen from '../screens/AddEditScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Main" component={TabNavigator} />
      <Stack.Screen 
        name="AddExpense" 
        component={AddEditScreen} 
        options={{ 
          presentation: 'modal',
          headerShown: true,
          headerTitle: 'New Expense'
        }} 
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
