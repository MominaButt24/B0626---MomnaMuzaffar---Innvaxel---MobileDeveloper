import React from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { useExpenses } from '../context/ExpenseContext';
import { Spacing } from '../constants/spacing';
import ExpenseCard from '../components/ExpenseCard';
import { useNavigation } from '@react-navigation/native';

const ExpensesScreen = () => {
  const { theme } = useTheme();
  const { expenses } = useExpenses();
  const navigation = useNavigation();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.bgSecondary }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.textPrimary }]}>All Expenses</Text>
      </View>
      
      <FlatList
        data={expenses}
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
              No expenses recorded yet.
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
    padding: Spacing.lg,
    paddingBottom: Spacing.md,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  listContent: {
    paddingBottom: Spacing.xl,
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
