/**
 * FAB.js (Floating Action Button)
 * 
 * This is that classic circular button you see floating at the bottom 
 * of most modern apps. I use it here as the primary "Add" button 
 * so users can quickly log a new expense from the home screen 
 * without thinking about where the 'plus' icon is.
 */

import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { Shadow } from '../constants/spacing';

const FAB = ({ onPress, icon = 'add' }) => {
  const { theme } = useTheme();

  return (
    <TouchableOpacity 
      style={[
        styles.container, 
        // I use a separate fabBg color here so it stands out even in dark mode
        { backgroundColor: theme.fabBg || '#4FC3F7' }, 
        Shadow.md
      ]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      {/* Icon size 30 is the "sweet spot" for touch targets and visibility */}
      <Ionicons name={icon} size={30} color={theme.fabIcon || '#FFFFFF'} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 37, // Positioned so it doesn't overlap the tab bar too much
    right: 35,
    zIndex: 1000,
    elevation: 12, // High elevation for a strong shadow on Android
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
});

export default FAB;
