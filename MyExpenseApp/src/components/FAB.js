import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { Shadow } from '../constants/spacing';

/**
 * Floating Action Button (FAB) for adding new expenses
 */
const FAB = ({ onPress, icon = 'add' }) => {
  const { theme } = useTheme();

  return (
    <TouchableOpacity 
      style={[
        styles.container, 
        { backgroundColor: theme.fabBg || '#4FC3F7' }, 
        Shadow.md
      ]}
      onPress={onPress}
      activeOpacity={0.8}
    >
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
    bottom: 37,
    right: 35,
    zIndex: 1000,
    elevation: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
});

export default FAB;
