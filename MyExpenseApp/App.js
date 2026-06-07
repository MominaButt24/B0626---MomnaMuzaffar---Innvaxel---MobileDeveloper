import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ThemeProvider } from './src/context/ThemeContext';
import { ExpenseProvider } from './src/context/ExpenseContext';
import AppNavigator from './src/navigation/AppNavigator';

/**
 * App Entry Point
 * 
 * We wrap the app in:
 * 1. GestureHandlerRootView: Required for react-native-gesture-handler 2.x
 * 2. SafeAreaProvider: For handling notches and status bars correctly.
 * 3. ThemeProvider: To provide light/dark mode support.
 * 4. ExpenseProvider: Our global state for managing expenses.
 * 5. NavigationContainer: The root for our React Navigation.
 */
export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
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
    </GestureHandlerRootView>
  );
}
