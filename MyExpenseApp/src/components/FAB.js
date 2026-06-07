import React from 'react';
import { TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { Shadow } from '../constants/spacing';

const { width } = Dimensions.get('window');

const FAB = ({ onPress, icon = 'add' }) => {
  const { theme } = useTheme();

  return (
    <TouchableOpacity 
      style={[
        styles.container, 
        { backgroundColor: theme.fabBg, left: width / 2 - 28 }, 
        Shadow.md
      ]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Ionicons name={icon} size={32} color={theme.fabIcon} />
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
    bottom: 34, // Positioned to sit nicely above the tab bar
    zIndex: 1000,
  },
});

export default FAB;
