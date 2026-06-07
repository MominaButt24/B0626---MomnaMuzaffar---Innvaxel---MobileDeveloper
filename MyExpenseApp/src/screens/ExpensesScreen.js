import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../context/ThemeContext';
import { useExpenses } from '../context/ExpenseContext';
import { Spacing, Radius } from '../constants/spacing';
import { CATEGORIES } from '../constants/categories';
import ExpenseCard from '../components/ExpenseCard';
import { useNavigation } from '@react-navigation/native';

const ExpensesScreen = () => {
  const { theme } = useTheme();
  const { expenses } = useExpenses();
  const navigation = useNavigation();
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Filter logic
  const filteredExpenses = useMemo(() => {
    if (selectedCategory === 'All') return expenses;
    return expenses.filter(e => e.category === selectedCategory);
  }, [expenses, selectedCategory]);

  const categoriesWithAll = ['All', ...CATEGORIES.map(c => c.label)];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.bgSecondary }]} edges={['top']}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.textPrimary }]}>History</Text>
      </View>

      {/* Category Filter Bar */}
      <View>
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
                  borderColor: theme.border 
                }
              ]}
            >
              <Text style={[
                styles.filterText,
                { color: selectedCategory === cat ? theme.textInverse : theme.textSecondary }
              ]}>
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      
      <FlatList
        data={filteredExpenses}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ExpenseCard 
            expense={item} 
            onPress={() => navigation.navigate('AddExpense', { expense: item })}
          />
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.sm,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  filterContainer: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
  },
  filterChip: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderRadius: Radius.full,
    marginRight: Spacing.sm,
    borderWidth: 1,
  },
  filterText: {
    fontSize: 14,
    fontWeight: '600',
  },
  listContent: {
    paddingBottom: 100,
  },
  emptyContainer: {
    marginTop: 100,
    alignItems: 'center',
    padding: Spacing.xl,
  },
  emptyText: {
    fontSize: 16,
  },
});

export default ExpensesScreen;
