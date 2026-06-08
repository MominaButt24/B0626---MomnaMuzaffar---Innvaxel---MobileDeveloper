/**
 * ExpenseCard.js
 * 
 * This is the individual row item you see in the transaction lists.
 * It shows the category icon, the title, the date, and the amount spent.
 * 
 * I designed it to be clean and readable, with a subtle chevron at the 
 * end to hint to the user that they can tap it to edit the expense.
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { Spacing, Radius, Shadow } from '../constants/spacing';
import { CATEGORIES } from '../constants/categories';
import { Ionicons } from '@expo/vector-icons';
import { formatCurrency } from '../utils/formatCurrency';
import { formatDate } from '../utils/formatDate';

const ExpenseCard = ({ expense, onPress }) => {
  const { theme, isDarkMode } = useTheme();
  
  // Find the right category info (icon and color) based on the label
  const categoryData = CATEGORIES.find(c => c.label === expense.category) || CATEGORIES[CATEGORIES.length - 1];
  const iconName = categoryData.icon;
  const iconColor = categoryData.color;

  return (
    <TouchableOpacity 
      style={[
        styles.container, 
        { backgroundColor: theme.cardBg }, 
        Shadow.sm
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.leftContent}>
        {/* 
            Icon Container: Uses a semi-transparent version of the category 
            color for the background to make the icon pop.
        */}
        <View style={[
          styles.iconCircle, 
          { backgroundColor: isDarkMode ? 'rgba(255,255,255,0.05)' : iconColor + '15' }
        ]}>
          <Ionicons name={iconName} size={22} color={iconColor} />
        </View>

        <View style={styles.textContainer}>
          <Text style={[styles.title, { color: theme.textPrimary }]} numberOfLines={1}>
            {expense.title}
          </Text>
          <Text style={[styles.date, { color: theme.textSecondary }]}>
            {formatDate(expense.date)}
          </Text>
        </View>
      </View>

      <View style={styles.rightContent}>
        {/* All expenses are shown as negative (spent) amounts */}
        <Text style={[styles.amount, { color: theme.danger }]}>
          -{formatCurrency(expense.amount)}
        </Text>
        <Ionicons name="chevron-forward" size={16} color={theme.textMuted} style={{ marginLeft: 4 }} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: Spacing.md,
    borderRadius: Radius.lg,
    marginBottom: Spacing.sm,
    marginHorizontal: Spacing.lg,
  },
  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 2,
  },
  date: {
    fontSize: 12,
    fontWeight: '500',
  },
  rightContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  amount: {
    fontSize: 16,
    fontWeight: '800',
  },
});

export default ExpenseCard;
