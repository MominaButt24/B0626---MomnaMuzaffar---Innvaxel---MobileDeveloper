import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, StatusBar } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { useExpenses } from '../context/ExpenseContext';
import { Spacing, Radius } from '../constants/spacing';
import StatCard from '../components/StatCard';
import ExpenseCard from '../components/ExpenseCard';
import FAB from '../components/FAB';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const { theme } = useTheme();
  const { expenses, totalSpent } = useExpenses();
  const navigation = useNavigation();

  // Get only the 5 most recent expenses for the home screen
  const recentExpenses = expenses.slice(0, 5);

  return (
    <View style={[styles.container, { backgroundColor: theme.bgSecondary }]}>
      <StatusBar barStyle="light-content" />
      
      {/* Header Background (Teal area from reference) */}
      <View style={[styles.headerBg, { backgroundColor: theme.bgBrand }]}>
        <SafeAreaView>
          <View style={styles.headerContent}>
            <Text style={[styles.greeting, { color: theme.textInverse }]}>Hello,</Text>
            <Text style={[styles.userName, { color: theme.textInverse }]}>My Expenses</Text>
          </View>
        </SafeAreaView>
      </View>

      <ScrollView 
        style={styles.scrollView} 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Main Stat Card */}
        <View style={styles.statWrapper}>
          <StatCard 
            title="Total Balance" 
            amount={totalSpent} 
            subtitle="Spent this month"
          />
        </View>

        {/* Recent Transactions Section */}
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: theme.textPrimary }]}>
            Recent Transactions
          </Text>
          <Text 
            style={[styles.seeAll, { color: theme.textBrand }]}
            onPress={() => navigation.navigate('Expenses')}
          >
            See All
          </Text>
        </View>

        {recentExpenses.length > 0 ? (
          recentExpenses.map((expense) => (
            <ExpenseCard 
              key={expense.id} 
              expense={expense} 
              onPress={() => navigation.navigate('AddExpense', { expense })}
            />
          ))
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={[styles.emptyText, { color: theme.textSecondary }]}>
              No expenses yet. Tap + to add one!
            </Text>
          </View>
        )}
        
        {/* Extra padding at bottom for FAB/Tabs */}
        <View style={{ height: 100 }} />
      </ScrollView>

      <FAB onPress={() => navigation.navigate('AddExpense')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerBg: {
    height: 180,
    borderBottomLeftRadius: Radius.xxl,
    borderBottomRightRadius: Radius.xxl,
    paddingHorizontal: Spacing.lg,
  },
  headerContent: {
    marginTop: Spacing.md,
  },
  greeting: {
    fontSize: 16,
    opacity: 0.8,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  scrollView: {
    flex: 1,
    marginTop: -60, // Pulls content up into the header area
  },
  scrollContent: {
    paddingBottom: Spacing.xl,
  },
  statWrapper: {
    marginBottom: Spacing.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.md,
    marginTop: Spacing.sm,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  seeAll: {
    fontSize: 14,
    fontWeight: '600',
  },
  emptyContainer: {
    padding: Spacing.xxxl,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 14,
    textAlign: 'center',
  },
});

export default HomeScreen;
