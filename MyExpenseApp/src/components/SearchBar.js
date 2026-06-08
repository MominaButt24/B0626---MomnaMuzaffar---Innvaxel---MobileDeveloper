/**
 * SearchBar.js
 * 
 * This is the input field used in the History screen.
 * It helps users find specific transactions by typing in the title 
 * or notes. I added a search icon and a clear button to make it 
 * feel like a native search experience.
 */

import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { Spacing, Radius } from '../constants/spacing';
import { FontSize } from '../constants/typography';

const SearchBar = ({ value, onChangeText, placeholder = "Search transactions..." }) => {
  const { theme, isDarkMode } = useTheme();

  return (
    <View style={styles.container}>
      {/* 
          Using a wrapper to give it that 'pill' or 'rounded box' look.
          The background color changes based on Light/Dark mode.
      */}
      <View style={[
        styles.inputWrapper, 
        { backgroundColor: isDarkMode ? '#1E222E' : '#F8FAFC', borderColor: isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' }
      ]}>
        {/* Search icon - standard visual cue for users */}
        <Ionicons name="search-outline" size={20} color={theme.textMuted} style={styles.icon} />
        
        <TextInput
          style={[styles.input, { color: theme.textPrimary }]}
          placeholder={placeholder}
          placeholderTextColor={theme.textMuted}
          value={value}
          onChangeText={onChangeText}
          autoCorrect={false} // Don't want annoying autocorrect when searching
          clearButtonMode="while-editing" // iOS native clear button
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    borderRadius: Radius.lg,
    paddingHorizontal: Spacing.md,
    borderWidth: 1,
  },
  icon: {
    marginRight: Spacing.sm,
  },
  input: {
    flex: 1,
    fontSize: FontSize.base,
    fontWeight: '500',
  },
});

export default SearchBar;
