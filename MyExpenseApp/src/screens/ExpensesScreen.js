import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, SectionList, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../context/ThemeContext';
import { useExpenses } from '../context/ExpenseContext';
import { Spacing, Radius } from '../constants/spacing';
import { FontSize, FontWeight } from '../constants/typography';
import { CATEGORIES } from '../constants/categories';
import ExpenseCard from '../components/ExpenseCard';
import { useNavigation } from '@react-navigation/native';
import { groupExpensesByDate } from '../utils/groupByDate';

/**
 * ExpensesScreen: Transaction history grouped by date.
 * Enhanced with a branded header and consistent overlap styling.
 */
const ExpensesScreen = () => {
  const { theme, isDarkMode } = useTheme();
  const { expenses } = useExpenses();
  const navigation = useNavigation();
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredExpenses = useMemo(() => {
    if (selectedCategory === 'All') return expenses;
    return expenses.filter(e => e.category === selectedCategory);
  }, [expenses, selectedCategory]);

  const sections = useMemo(() => groupExpensesByDate(filteredExpenses), [filteredExpenses]);
  const categoriesWithAll = ['All', ...CATEGORIES.map(c => c.label)];

  return (
    <View style={[styles.container, { backgroundColor: theme.bgSecondary }]}>
      <StatusBar barStyle="light-content" />
      
      {/* Enhanced Branded Header */}
      <View style={[styles.headerBg, { backgroundColor: theme.bgBrand }]}>
        <SafeAreaView edges={['top']}>
          <View style={styles.headerContent}>
            <Text style={[styles.headerTitle, { color: '#FFFFFF' }]}>History</Text>
            <Text style={[styles.headerSub, { color: '#FFFFFF', opacity: 0.8 }]}>
              {expenses.length} Total Transactions
            </Text>
          </View>
        </SafeAreaView>
      </View>

      {/* Category Filter Bar with Overlap */}
      <View style={styles.filterWrapper}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          contentContainerStyle={styles.filterContainer}
        >
          {categoriesWithAll.map((cat) => (
            <TouchableOpacity
              key={cat}
              onPress={() => setSelectedCategory(cat)}
              style={[
                styles.filterChip,
                { 
                  backgroundColor: selectedCategory === cat ? theme.bgBrand : theme.cardBg,
                  borderColor: isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'
                }
              ]}
            >
              <Text style={[
                styles.filterText,
                { color: selectedCategory === cat ? '#FFFFFF' : theme.textSecondary }
              ]}>
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      
      <SectionList
        sections={sections}
        keyExtractor={(item) => item.id}
        stickySectionHeadersEnabled={false}
        renderItem={({ item }) => (
          <ExpenseCard 
            expense={item} 
            onPress={() => navigation.navigate('AddExpense', { expense: item })}
          />
        )}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={[styles.sectionHeader, { color: theme.textSecondary }]}>
            {title}
          </Text>
        )}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={[styles.emptyText, { color: theme.textSecondary }]}>
              {selectedCategory === 'All' 
                ? "No expenses recorded yet." 
                : `No expenses in ${selectedCategory}.`}
            </Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  headerBg: {
    paddingBottom: 60,
    borderBottomLeftRadius: Radius.xxl,
    borderBottomRightRadius: Radius.xxl,
  },
  headerContent: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
  },
  headerTitle: { fontSize: FontSize.xxl, fontWeight: FontWeight.bold },
  headerSub: { fontSize: FontSize.sm, fontWeight: FontWeight.medium, marginTop: 2 },
  filterWrapper: { marginTop: -30 },
  filterContainer: { paddingHorizontal: Spacing.lg, paddingBottom: Spacing.md },
  filterChip: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderRadius: Radius.full,
    marginRight: Spacing.sm,
    borderWidth: 1,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  filterText: { fontSize: FontSize.sm, fontWeight: FontWeight.semibold },
  sectionHeader: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.bold,
    textTransform: 'uppercase',
    letterSpacing: 1,
    paddingHorizontal: Spacing.xl,
    marginTop: Spacing.lg,
    marginBottom: Spacing.sm,
  },
  listContent: { paddingBottom: 120 },
  emptyContainer: { marginTop: 100, alignItems: 'center', padding: Spacing.xl },
  emptyText: { fontSize: FontSize.base, textAlign: 'center' },
});

export default ExpensesScreen;
