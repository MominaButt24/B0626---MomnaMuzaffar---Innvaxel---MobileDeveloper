import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { Spacing, Radius, Shadow } from '../constants/spacing';
import { CATEGORIES } from '../constants/categories';

const ExpenseCard = ({ expense, onPress }) => {
  const { theme } = useTheme();
  
  const categoryData = CATEGORIES.find(c => c.label === expense.category);
  const emoji = categoryData ? categoryData.emoji : '💰';

  return (
    <TouchableOpacity 
      style={[styles.container, { backgroundColor: theme.cardBg }, Shadow.sm]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.leftContent}>
        <View style={[styles.iconContainer, { backgroundColor: theme.bgSecondary }]}>
          <Text style={styles.emoji}>{emoji}</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={[styles.title, { color: theme.textPrimary }]} numberOfLines={1}>
            {expense.title}
          </Text>
          <Text style={[styles.date, { color: theme.textSecondary }]}>
            {new Date(expense.date).toLocaleDateString(undefined, { 
              month: 'short', 
              day: 'numeric' 
            })}
          </Text>
        </View>
      </View>
      <Text style={[styles.amount, { color: theme.amountNegative }]}>
        -${Number(expense.amount).toFixed(2)}
      </Text>
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
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: Radius.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  emoji: {
    fontSize: 20,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  date: {
    fontSize: 12,
  },
  amount: {
    fontSize: 16,
    fontWeight: '700',
  },
});

export default ExpenseCard;
