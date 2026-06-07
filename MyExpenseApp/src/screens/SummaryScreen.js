import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../context/ThemeContext';
import { useExpenses } from '../context/ExpenseContext';
import { Spacing, Radius } from '../constants/spacing';
import { CATEGORIES } from '../constants/categories';

const SummaryScreen = () => {
  const { theme } = useTheme();
  const { expenses = [], totalSpent = 0 } = useExpenses();

  // Calculate totals per category
  const categoryTotals = expenses.reduce((acc, curr) => {
    acc[curr.category] = (acc[curr.category] || 0) + Number(curr.amount);
    return acc;
  }, {});

  // Sort categories by amount spent (highest first)
  const sortedCategories = Object.entries(categoryTotals)
    .sort(([, a], [, b]) => b - a);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.bgSecondary }]} edges={['top']}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.textPrimary }]}>Statistics</Text>
      </View>
      
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Total Spending Card */}
        <View style={[styles.totalCard, { backgroundColor: theme.bgBrand }]}>
          <Text style={[styles.totalLabel, { color: theme.textInverse, opacity: 0.8 }]}>Total Spending</Text>
          <Text style={[styles.totalAmount, { color: theme.textInverse }]}>
            ${(totalSpent || 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </Text>
        </View>

        <Text style={[styles.sectionTitle, { color: theme.textPrimary }]}>Category Breakdown</Text>
        
        <View style={[styles.breakdownCard, { backgroundColor: theme.cardBg }]}>
          {sortedCategories.length > 0 ? (
            sortedCategories.map(([cat, amt]) => {
              const percentage = totalSpent > 0 ? (amt / totalSpent) : 0;
              const categoryInfo = CATEGORIES.find(c => c.label === cat);
              
              return (
                <View key={cat} style={styles.categoryItem}>
                  <View style={styles.categoryHeader}>
                    <View style={styles.categoryInfo}>
                      <Text style={styles.categoryEmoji}>{categoryInfo?.emoji || '💰'}</Text>
                      <Text style={[styles.categoryName, { color: theme.textPrimary }]}>{cat}</Text>
                    </View>
                    <Text style={[styles.categoryValue, { color: theme.textPrimary }]}>
                      ${amt.toFixed(2)} ({Math.round(percentage * 100)}%)
                    </Text>
                  </View>
                  
                  {/* Visual Progress Bar */}
                  <View style={[styles.progressBase, { backgroundColor: theme.bgSecondary }]}>
                    <View 
                      style={[
                        styles.progressFill, 
                        { 
                          backgroundColor: theme.bgBrand, 
                          width: `${percentage * 100}%` 
                        }
                      ]} 
                    />
                  </View>
                </View>
              );
            })
          ) : (
            <View style={styles.emptyState}>
              <Text style={{ color: theme.textSecondary }}>No data to display yet.</Text>
            </View>
          )}
        </View>
        
        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  content: {
    padding: Spacing.lg,
  },
  totalCard: {
    padding: Spacing.xxl,
    borderRadius: Radius.card,
    alignItems: 'center',
    marginBottom: Spacing.xl,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  totalLabel: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: Spacing.xs,
  },
  totalAmount: {
    fontSize: 36,
    fontWeight: '800',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: Spacing.md,
    marginLeft: 4,
  },
  breakdownCard: {
    padding: Spacing.lg,
    borderRadius: Radius.lg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  categoryItem: {
    marginBottom: Spacing.lg,
  },
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  categoryInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryEmoji: {
    fontSize: 18,
    marginRight: Spacing.sm,
  },
  categoryName: {
    fontSize: 15,
    fontWeight: '600',
  },
  categoryValue: {
    fontSize: 14,
    fontWeight: '500',
  },
  progressBase: {
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  emptyState: {
    alignItems: 'center',
    padding: Spacing.xl,
  }
});

export default SummaryScreen;
