/**
 * SplashScreen.js
 * 
 * This is the first thing the user sees when the app is booting up.
 * Instead of a boring static image, I used a Lottie animation to make 
 * the app feel more "alive" and premium from the very first second.
 */

import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import LottieView from 'lottie-react-native';
import { useTheme } from '../context/ThemeContext';

const SplashScreen = () => {
  // We grab the brand color from the theme so the background matches 
  // the rest of the app's branded headers.
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.bgBrand }]}>
      {/* 
        This is our animated logo. I used autoPlay and loop so it 
        keeps moving until the app is ready to navigate away.
      */}
      <LottieView
        source={require('../assets/splash.json')}
        autoPlay
        loop
        style={styles.animation}
      />
      
      {/* App Name: Styled to look bold and professional */}
      <Text style={styles.title}>SpendWise</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  animation: {
    width: 250,
    height: 250,
  },
  title: {
    marginTop: 20,
    fontSize: 28,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
});

export default SplashScreen;
