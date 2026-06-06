import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { useExpenses } from '../context/ExpenseContext';
import { Spacing } from '../constants/spacing';

const SummaryScreen = () => {
  const { theme } = useTheme();
  const { expenses, totalSpent } = useExpenses();

  // Basic category breakdown calculation
  const categoryTotals = expenses.reduce((acc, curr) => {
    acc[curr.category] = (acc[curr.category] || 0) + Number(curr.amount);
    return acc;
  }, {});

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.bgSecondary }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.textPrimary }]}>Spending Summary</Text>
      </View>
      
      <ScrollView contentContainerStyle={styles.content}>
        <View style={[styles.totalCard, { backgroundColor: theme.bgBrand }]}>
          <Text style={[styles.totalLabel, { color: theme.textInverse }]}>Total Spent</Text>
          <Text style={[styles.totalAmount, { color: theme.textInverse }]}>
            ${totalSpent.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </Text>
        </View>

        <Text style={[styles.sectionTitle, { color: theme.textPrimary }]}>By Category</Text>
        
        {Object.keys(categoryTotals).length > 0 ? (
          Object.entries(categoryTotals).map(([cat, amt]) => (
            <View key={cat} style={[styles.categoryRow, { backgroundColor: theme.cardBg }]}>
              <Text style={[styles.categoryName, { color: theme.textPrimary }]}>{cat}</Text>
              <Text style={[styles.categoryAmount, { color: theme.textPrimary }]}>
                ${amt.toFixed(2)}
              </Text>
            </View>
          ))
        ) : (
          <Text style={[styles.emptyText, { color: theme.textSecondary }]}>
            Add some expenses to see a breakdown.
          </Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: Spacing.lg,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  content: {
    padding: Spacing.lg,
  },
  totalCard: {
    padding: Spacing.xl,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  totalLabel: {
    fontSize: 16,
    opacity: 0.9,
    marginBottom: 4,
  },
  totalAmount: {
    fontSize: 32,
    fontWeight: '800',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: Spacing.md,
  },
  categoryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: Spacing.md,
    borderRadius: 12,
    marginBottom: Spacing.sm,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: '500',
  },
  categoryAmount: {
    fontSize: 16,
    fontWeight: '600',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
  }
});

export default SummaryScreen;
