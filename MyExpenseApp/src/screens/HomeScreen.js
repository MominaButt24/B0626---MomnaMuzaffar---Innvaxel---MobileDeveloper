import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, StatusBar, TouchableOpacity, Modal, TextInput, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../context/ThemeContext';
import { useExpenses } from '../context/ExpenseContext';
import { Spacing, Radius } from '../constants/spacing';
import StatCard from '../components/StatCard';
import ExpenseCard from '../components/ExpenseCard';
import FAB from '../components/FAB';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { formatCurrency } from '../utils/formatCurrency';

const HomeScreen = () => {
  const { theme, isDarkMode, toggleTheme } = useTheme();
  const { 
    expenses = [], 
    balance = 0, 
    totalIncome = 0, 
    totalExpenses = 0, 
    setIncome 
  } = useExpenses();
  const navigation = useNavigation();

  const [modalVisible, setModalVisible] = useState(false);
  const [newBudget, setNewBudget] = useState(totalIncome.toString());

  // Get only the 5 most recent expenses for the home screen
  const recentExpenses = expenses.slice(0, 5);

  const handleUpdateBudget = () => {
    const amount = parseFloat(newBudget);
    if (isNaN(amount) || amount < 0) {
      Alert.alert('Invalid Amount', 'Please enter a valid positive number for your budget.');
      return;
    }
    setIncome(amount);
    setModalVisible(false);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.bgSecondary }]}>
      <StatusBar barStyle="light-content" />
      
      {/* Header Background */}
      <View style={[styles.headerBg, { backgroundColor: theme.bgBrand }]}>
        <SafeAreaView edges={['top']}>
          <View style={styles.headerContent}>
            <View>
              <Text style={[styles.greeting, { color: '#FFFFFF', opacity: 0.8 }]}>Hello,</Text>
              <Text style={[styles.userName, { color: '#FFFFFF' }]}>My Expenses</Text>
            </View>
            
            <View style={styles.headerActions}>
              {/* Set Budget Button */}
              <TouchableOpacity 
                onPress={() => {
                  setNewBudget(totalIncome.toString());
                  setModalVisible(true);
                }}
                style={[styles.iconButton, { backgroundColor: 'rgba(255,255,255,0.2)', marginRight: 10 }]}
              >
                <Ionicons name="wallet-outline" size={20} color="white" />
              </TouchableOpacity>

              {/* Theme Toggle Button */}
              <TouchableOpacity 
                onPress={toggleTheme}
                style={[styles.iconButton, { backgroundColor: 'rgba(255,255,255,0.2)' }]}
              >
                <Ionicons 
                  name={isDarkMode ? 'sunny' : 'moon'} 
                  size={20} 
                  color="white" 
                />
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </View>

      <ScrollView 
        style={styles.scrollView} 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Main Stat Card with Income/Expense values */}
        <View style={styles.statWrapper}>
          <StatCard 
            title="Total Balance" 
            amount={balance} 
            income={totalIncome}
            expenses={totalExpenses}
            onMenuPress={() => setModalVisible(true)} // Link the menu icon to the budget modal
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
            <Ionicons name="receipt-outline" size={40} color={theme.textMuted} style={{ marginBottom: 10 }} />
            <Text style={[styles.emptyText, { color: theme.textSecondary }]}>
              No expenses yet. Tap + to add one!
            </Text>
          </View>
        )}
        
        {/* Extra padding at bottom for FAB/Tabs */}
        <View style={{ height: 120 }} />
      </ScrollView>

      {/* Budget Update Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: isDarkMode ? '#1E293B' : '#FFFFFF' }]}>
            <Text style={[styles.modalTitle, { color: theme.textPrimary }]}>Update Monthly Budget</Text>
            <Text style={[styles.modalSub, { color: theme.textSecondary }]}>Enter your total income or budget for this month.</Text>
            
            <TextInput
              style={[styles.budgetInput, { 
                backgroundColor: isDarkMode ? '#0F172A' : '#F8FAFC', 
                color: theme.textPrimary,
                borderColor: theme.border
              }]}
              keyboardType="decimal-pad"
              value={newBudget}
              onChangeText={setNewBudget}
              autoFocus={true}
              placeholder="0.00"
              placeholderTextColor={theme.textMuted}
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity 
                onPress={() => setModalVisible(false)}
                style={[styles.modalButton, { borderRightWidth: 0.5, borderColor: theme.border }]}
              >
                <Text style={{ color: theme.textSecondary, fontWeight: '600' }}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                onPress={handleUpdateBudget}
                style={styles.modalButton}
              >
                <Text style={{ color: theme.textBrand, fontWeight: 'bold' }}>Update</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerActions: {
    flexDirection: 'row',
  },
  greeting: {
    fontSize: 16,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
    marginTop: -60,
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.xl,
  },
  modalContent: {
    width: '100%',
    borderRadius: Radius.lg,
    padding: Spacing.xl,
    alignItems: 'center',
    elevation: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: Spacing.xs,
  },
  modalSub: {
    fontSize: 13,
    textAlign: 'center',
    marginBottom: Spacing.lg,
  },
  budgetInput: {
    width: '100%',
    height: 54,
    borderRadius: Radius.md,
    borderWidth: 1,
    paddingHorizontal: Spacing.md,
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: Spacing.xl,
  },
  modalButtons: {
    flexDirection: 'row',
    borderTopWidth: 0.5,
    borderColor: 'rgba(150,150,150,0.2)',
    width: '120%',
    marginHorizontal: -Spacing.xl,
  },
  modalButton: {
    flex: 1,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default HomeScreen;
