import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import LottieView from 'lottie-react-native';
import { useTheme } from '../context/ThemeContext';

/**
 * SplashScreen: Uses Lottie for a smooth, high-quality animation.
 * The animation JSON is stored in src/assets/splash.json.
 */
const SplashScreen = () => {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.bgBrand }]}>
      <LottieView
        source={require('../assets/splash.json')}
        autoPlay
        loop
        style={styles.animation}
      />
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
