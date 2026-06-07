import React, { useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../context/ThemeContext';
import { useExpenses } from '../context/ExpenseContext';
import { Spacing, Radius } from '../constants/spacing';
import { FontSize, FontWeight } from '../constants/typography';
import { CATEGORIES } from '../constants/categories';
import { Ionicons } from '@expo/vector-icons';
import SummaryDonut from '../components/SummaryDonut';
import { calculateCategoryTotals } from '../utils/calcSummary';
import { formatCurrency } from '../utils/formatCurrency';

/**
 * SummaryScreen: Provides a visual breakdown of spending by category.
 * Fully integrated with Spacing, Radius, and Typography constants.
 */
const SummaryScreen = () => {
  const { theme, isDarkMode } = useTheme();
  const { expenses = [], totalExpenses = 0 } = useExpenses();

  const chartData = useMemo(() => 
    calculateCategoryTotals(expenses, CATEGORIES), 
    [expenses]
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.bgSecondary }]} edges={['top']}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.textPrimary }]}>Statistics</Text>
      </View>
      
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Total Spending Card */}
        <View style={[styles.totalCard, { backgroundColor: '#1E293B' }]}>
          <Text style={[styles.totalLabel, { color: 'rgba(255,255,255,0.7)' }]}>Total Spending</Text>
          <Text style={[styles.totalAmount, { color: '#FFFFFF' }]}>
            {formatCurrency(totalExpenses)}
          </Text>
        </View>

        {/* Visual Donut Chart */}
        {totalExpenses > 0 && (
          <View style={styles.chartWrapper}>
             <SummaryDonut data={chartData} total={totalExpenses} />
          </View>
        )}

        <Text style={[styles.sectionTitle, { color: theme.textPrimary }]}>Category Breakdown</Text>
        
        <View style={[styles.breakdownCard, { backgroundColor: theme.cardBg }]}>
          {chartData.length > 0 ? (
            chartData.map((item) => {
              const percentage = totalExpenses > 0 ? (item.amount / totalExpenses) : 0;
              const categoryInfo = CATEGORIES.find(c => c.label === item.category) || CATEGORIES[CATEGORIES.length - 1];
              
              return (
                <View key={item.category} style={styles.categoryItem}>
                  <View style={styles.categoryHeader}>
                    <View style={styles.categoryInfo}>
                      <View style={[
                        styles.iconCircle, 
                        { backgroundColor: isDarkMode ? 'rgba(255,255,255,0.05)' : categoryInfo.color + '15' }
                      ]}>
                        <Ionicons name={categoryInfo.icon} size={18} color={categoryInfo.color} />
                      </View>
                      <Text style={[styles.categoryName, { color: theme.textPrimary }]}>{item.category}</Text>
                    </View>
                    <Text style={[styles.categoryValue, { color: theme.textPrimary }]}>
                      {formatCurrency(item.amount)} ({Math.round(percentage * 100)}%)
                    </Text>
                  </View>
                  
                  {/* Visual Progress Bar */}
                  <View style={[styles.progressBase, { backgroundColor: isDarkMode ? '#1E222E' : '#F1F5F9' }]}>
                    <View 
                      style={[
                        styles.progressFill, 
                        { 
                          backgroundColor: categoryInfo.color, 
                          width: `${Math.max(percentage * 100, 2)}%` 
                        }
                      ]} 
                    />
                  </View>
                </View>
              );
            })
          ) : (
            <View style={styles.emptyState}>
              <Ionicons name="stats-chart-outline" size={48} color={theme.textMuted} style={{ marginBottom: Spacing.md }} />
              <Text style={{ color: theme.textSecondary, textAlign: 'center' }}>
                No spending data recorded yet.
              </Text>
            </View>
          )}
        </View>
        
        <View style={{ height: 100 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { paddingHorizontal: Spacing.lg, paddingVertical: Spacing.md },
  title: { fontSize: FontSize.xxl, fontWeight: FontWeight.bold },
  content: { padding: Spacing.lg },
  totalCard: {
    padding: Spacing.xxl,
    borderRadius: Radius.xxl,
    alignItems: 'center',
    marginBottom: Spacing.md,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  totalLabel: { fontSize: FontSize.sm, fontWeight: FontWeight.bold, textTransform: 'uppercase', letterSpacing: 1, marginBottom: Spacing.xs },
  totalAmount: { fontSize: FontSize.hero, fontWeight: FontWeight.bold },
  chartWrapper: { alignItems: 'center', justifyContent: 'center', marginBottom: Spacing.xl },
  sectionTitle: { fontSize: FontSize.md, fontWeight: FontWeight.bold, marginBottom: Spacing.md, marginLeft: Spacing.xs },
  breakdownCard: {
    padding: Spacing.lg,
    borderRadius: Radius.xl,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
  },
  categoryItem: { marginBottom: Spacing.lg },
  categoryHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: Spacing.sm },
  categoryInfo: { flexDirection: 'row', alignItems: 'center' },
  iconCircle: { width: 36, height: 36, borderRadius: 18, justifyContent: 'center', alignItems: 'center', marginRight: Spacing.sm },
  categoryName: { fontSize: FontSize.base, fontWeight: FontWeight.semibold },
  categoryValue: { fontSize: FontSize.sm, fontWeight: FontWeight.medium },
  progressBase: { height: 10, borderRadius: 5, overflow: 'hidden' },
  progressFill: { height: '100%', borderRadius: 5 },
  emptyState: { alignItems: 'center', padding: Spacing.xxxl },
});

export default SummaryScreen;
