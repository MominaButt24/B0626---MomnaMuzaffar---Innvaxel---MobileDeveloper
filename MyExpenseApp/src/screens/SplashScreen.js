/**
 * SplashScreen.js
 * 
 * This is the first thing the user sees when the app is booting up.
 * Instead of a boring static image, I used a Lottie animation to make 
 * the app feel more "alive" and premium from the very first second.
 * 
 * Note: Background is fixed to White and Text to Black to provide a 
 * clean, high-contrast minimal first impression regardless of system theme.
 */

import React from 'react';
import { View, StyleSheet, Text, StatusBar, Platform } from 'react-native';
import LottieView from 'lottie-react-native';

const SplashScreen = () => {
  return (
    <View style={[styles.container, { backgroundColor: '#FFFFFF' }]}>
      {/* 
        Force the status bar to have dark icons since we are on 
        a fixed white background.
      */}
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

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
      
      {/* 
        App Name: Styled with a "cool" modern look.
        I used 'AvenirNext-Heavy' for iOS and 'sans-serif-condensed' for Android 
        with extra letter spacing to give it a premium "editorial" feel.
      */}
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
    fontSize: 32,
    fontWeight: '900',
    color: '#000000', // Fixed to Black
    letterSpacing: 8, // Wide letter spacing for a high-end, cool brand look
    textTransform: 'uppercase',
    // Using modern system fonts that look "cooler" than default
    fontFamily: Platform.OS === 'ios' ? 'AvenirNext-Heavy' : 'sans-serif-condensed',
  },
});

export default SplashScreen;
