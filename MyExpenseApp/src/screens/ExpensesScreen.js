/**
 * ExpensesScreen.js
 * 
 * This is the full transaction history of the app. I built this so users 
 * can dig deep into their past spending. 
 * 
 * It includes a powerful search bar and category filters because once 
 * you have hundreds of expenses, finding that one specific receipt 
 * becomes a nightmare without them.
 */

import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, SectionList, TouchableOpacity, ScrollView, StatusBar, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../context/ThemeContext';
import { useExpenses } from '../context/ExpenseContext';
import { Spacing, Radius } from '../constants/spacing';
import { FontSize, FontWeight } from '../constants/typography';
import { CATEGORIES } from '../constants/categories';
import ExpenseCard from '../components/ExpenseCard';
import SearchBar from '../components/SearchBar';
import { useNavigation } from '@react-navigation/native';
import { groupExpensesByDate } from '../utils/groupByDate';
import { Ionicons } from '@expo/vector-icons';

const ExpensesScreen = () => {
  const { theme, isDarkMode } = useTheme();
  const { expenses } = useExpenses();
  const navigation = useNavigation();
  
  // Local state for our filters
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // 1. Unified Filtering Logic (Category + Search)
  // I used useMemo here so the filtering doesn't lag the UI while typing
  const filteredExpenses = useMemo(() => {
    let result = expenses;
    
    // Filter by Category first
    if (selectedCategory !== 'All') {
      result = result.filter(e => e.category === selectedCategory);
    }
    
    // Then filter by what the user typed in the search bar
    if (searchQuery.trim().length > 0) {
      const query = searchQuery.toLowerCase();
      result = result.filter(e => 
        e.title.toLowerCase().includes(query) || 
        (e.notes && e.notes.toLowerCase().includes(query))
      );
    }
    
    return result;
  }, [expenses, selectedCategory, searchQuery]);

  // 2. Group the final filtered list by date (e.g., "Today", "Yesterday")
  const sections = useMemo(() => groupExpensesByDate(filteredExpenses), [filteredExpenses]);

  const categoriesWithAll = ['All', ...CATEGORIES.map(c => c.label)];

  return (
    <View style={[styles.container, { backgroundColor: theme.bgSecondary }]}>
      <StatusBar barStyle="light-content" />
      
      {/* Branded Header: Matches the Home and Summary screens for consistency */}
      <View style={[styles.headerBg, { backgroundColor: theme.bgBrand }]}>
        <SafeAreaView edges={['top']}>
          <View style={styles.headerContent}>
             <View>
                <Text style={[styles.headerTitle, { color: '#FFFFFF' }]}>History</Text>
                <Text style={[styles.headerSub, { color: '#FFFFFF', opacity: 0.8 }]}>
                  {filteredExpenses.length} Transactions Found
                </Text>
             </View>
             <Image
                 source={require('../assets/budget.png')}
                 style={styles.searchImageIcon}
                 resizeMode="contain"
             />
          </View>
        </SafeAreaView>
      </View>

      {/* The Search Bar: Floats slightly over the header */}
      <View style={styles.searchWrapper}>
        <SearchBar 
          value={searchQuery} 
          onChangeText={setSearchQuery} 
          placeholder="Search transactions..."
        />
      </View>

      {/* Category Filter Bar: Horizontal scrollable chips */}
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
      
      {/* 
        SectionList is perfect here because it handles the "Today", "Yesterday" 
        headers automatically and is very memory efficient for long lists.
      */}
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
          // Empty state: Shows a search icon if nothing was found
          <View style={styles.emptyContainer}>
            <Ionicons name="search-outline" size={48} color={theme.textMuted} style={{ marginBottom: 12 }} />
            <Text style={[styles.emptyText, { color: theme.textSecondary }]}>
              {searchQuery.length > 0 
                ? `No results for "${searchQuery}"` 
                : "No expenses recorded yet."}
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
    paddingBottom: 50,
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
  headerTitle: { fontSize: FontSize.xxl, fontWeight: FontWeight.bold },
  headerSub: { fontSize: FontSize.sm, fontWeight: FontWeight.medium, marginTop: 2 },
  searchImageIcon: {width: 60, height: 60},
  searchWrapper: {
    marginTop: -30, 
  },
  filterWrapper: {
    marginTop: Spacing.xs,
  },
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
    marginTop: Spacing.md,
    marginBottom: Spacing.sm,
  },
  listContent: { paddingBottom: 120 },
  emptyContainer: { marginTop: 80, alignItems: 'center', padding: Spacing.xl },
  emptyText: { fontSize: FontSize.base, textAlign: 'center' },
});

export default ExpensesScreen;
