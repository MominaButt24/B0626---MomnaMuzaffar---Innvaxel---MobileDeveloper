import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { Spacing, Radius } from '../constants/spacing';
import { FontSize } from '../constants/typography';

/**
 * search bar: filter the expenses on the title ad notes basis
 */
const SearchBar = ({ value, onChangeText, placeholder = "Search transactions..." }) => {
  const { theme, isDarkMode } = useTheme();

  return (
    <View style={styles.container}>
      <View style={[
        styles.inputWrapper, 
        { backgroundColor: isDarkMode ? '#1E222E' : '#F8FAFC', borderColor: isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' }
      ]}>
        <Ionicons name="search-outline" size={20} color={theme.textMuted} style={styles.icon} />
        <TextInput
          style={[styles.input, { color: theme.textPrimary }]}
          placeholder={placeholder}
          placeholderTextColor={theme.textMuted}
          value={value}
          onChangeText={onChangeText}
          autoCorrect={false}
          clearButtonMode="while-editing"
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
