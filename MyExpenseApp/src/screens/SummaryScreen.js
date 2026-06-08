import React, { useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, StatusBar, Image } from 'react-native';
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
 * Enhanced with a branded header and visual icons.
 */
const SummaryScreen = () => {
  const { theme, isDarkMode } = useTheme();
  const { expenses = [], totalExpenses = 0 } = useExpenses();

  const chartData = useMemo(() => 
    calculateCategoryTotals(expenses, CATEGORIES), 
    [expenses]
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.bgSecondary }]}>
      <StatusBar barStyle="light-content" />

      {/* Enhanced Branded Header */}
      <View style={[styles.headerBg, { backgroundColor: theme.bgBrand }]}>
        <SafeAreaView edges={['top']}>
          <View style={styles.headerContent}>
            <View>
                <Text style={[styles.headerTitle, { color: theme.textInverse }]}>Statistics</Text>
                <Text style={[styles.headerSub, { color: theme.textInverse, opacity: 0.8 }]}>
                  Spending Overview
                </Text>
            </View>
            <Image
                source={require('../assets/pie-chart.png')}
                style={styles.moneyIcon}
                resizeMode="contain"
            />
          </View>
        </SafeAreaView>
      </View>
      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent} 
        showsVerticalScrollIndicator={false}
      >
        {/* Total Spending Card with PNG Icon */}
        <View style={styles.statWrapper}>
          <View style={[styles.totalCard, { backgroundColor: '#1E293B' }]}>
            <View style={styles.cardTopRow}>
              <View>
                <Text style={[styles.totalLabel, { color: 'rgba(255,255,255,0.7)' }]}>Total Spending</Text>
                <Text style={[styles.totalAmount, { color: '#FFFFFF' }]}>
                  {formatCurrency(totalExpenses)}
                </Text>
              </View>
              <Image 
                source={require('../assets/financial-profit.png')} 
                style={styles.moneyIcon}
                resizeMode="contain"
              />
            </View>
          </View>
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
        
        <View style={{ height: 120 }} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1 
  },
  headerBg: {
    paddingBottom: 60,
    borderBottomLeftRadius: Radius.xxl,
    borderBottomRightRadius: Radius.xxl,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
  },
  headerTitle: {
    fontSize: FontSize.xxl,
    fontWeight: FontWeight.bold,
  },
  headerSub: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.medium,
    marginTop: 2,
  },
  scrollView: {
    flex: 1,
    marginTop: -50,
  },
  scrollContent: { 
    padding: Spacing.lg 
  },
  statWrapper: {
    marginBottom: Spacing.lg,
  },
  totalCard: {
    padding: Spacing.xl,
    borderRadius: Radius.xxl,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  cardTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  moneyIcon: {
    width: 60,
    height: 60,
  },
  totalLabel: { 
    fontSize: FontSize.sm, 
    fontWeight: FontWeight.bold, 
    textTransform: 'uppercase', 
    letterSpacing: 1, 
    marginBottom: Spacing.xs 
  },
  totalAmount: { 
    fontSize: FontSize.hero, 
    fontWeight: FontWeight.bold 
  },
  chartWrapper: { 
    alignItems: 'center', 
    justifyContent: 'center', 
    marginBottom: Spacing.xl,
    marginTop: Spacing.md
  },
  sectionTitle: { 
    fontSize: FontSize.md, 
    fontWeight: FontWeight.bold, 
    marginBottom: Spacing.md, 
    marginLeft: Spacing.xs 
  },
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
