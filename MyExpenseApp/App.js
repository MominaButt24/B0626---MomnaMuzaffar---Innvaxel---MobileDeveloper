import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from './src/context/ThemeContext';
import { ExpenseProvider } from './src/context/ExpenseContext';
import AppNavigator from './src/navigation/AppNavigator';

/**
 * App Entry Point
 *
 * We wrap the app in:
 * 1. SafeAreaProvider: For handling notches and status bars correctly.
 * 2. ThemeProvider: To provide light/dark mode support.
 * 3. ExpenseProvider: Our global state for managing expenses.
 * 4. NavigationContainer: The root for our React Navigation.
 */
export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <ExpenseProvider>
          <NavigationContainer>
            <AppNavigator />
            <StatusBar style="auto" />
          </NavigationContainer>
        </ExpenseProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
