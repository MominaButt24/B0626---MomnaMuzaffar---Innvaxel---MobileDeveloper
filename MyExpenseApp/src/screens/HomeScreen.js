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

/**
 * HomeScreen: The main dashboard.
 * Displays total balance, recent transactions, and personalized greeting.
 */
const HomeScreen = () => {
  const { theme, isDarkMode, toggleTheme } = useTheme();
  const { 
    expenses = [], 
    balance = 0, 
    totalIncome = 0, 
    totalExpenses = 0, 
    setIncome,
    userName,
    resetOnboarding // Use the reset function from Context
  } = useExpenses();
  const navigation = useNavigation();

  const [modalVisible, setModalVisible] = useState(false);
  const [newBudget, setNewBudget] = useState(totalIncome.toString());

  // Show only 5 most recent
  const recentExpenses = expenses.slice(0, 4);

  const handleUpdateBudget = () => {
    const amount = parseFloat(newBudget);
    if (isNaN(amount) || amount < 0) {
      Alert.alert('Invalid Amount', 'Please enter a valid positive number.');
      return;
    }
    setIncome(amount);
    setModalVisible(false);
  };

  const handleResetApp = () => {
    Alert.alert(
      "Reset Profile?", 
      "This will clear your name and take you back to the onboarding screen immediately.",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Reset", 
          style: "destructive", 
          onPress: async () => {
            await resetOnboarding();
            setModalVisible(false);
          } 
        }
      ]
    );
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
              <Text style={[styles.userName, { color: '#FFFFFF' }]} numberOfLines={1}>
                {userName || 'Guest'}
              </Text>
            </View>
            
            <View style={styles.headerActions}>
              {/* Wallet/Settings Icon */}
              <TouchableOpacity 
                onPress={() => {
                  setNewBudget(totalIncome.toString());
                  setModalVisible(true);
                }}
                style={[styles.iconButton, { backgroundColor: 'rgba(255,255,255,0.2)', marginRight: 10 }]}
              >
                <Ionicons name="wallet-outline" size={20} color="white" />
              </TouchableOpacity>

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
        <View style={styles.statWrapper}>
          <StatCard 
            title="Total Balance" 
            amount={balance} 
            income={totalIncome}
            expenses={totalExpenses}
            onMenuPress={() => setModalVisible(true)}
          />
        </View>

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
        
        <View style={{ height: 120 }} />
      </ScrollView>

      {/* Settings/Budget Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: isDarkMode ? '#1E293B' : '#FFFFFF' }]}>
            <Text style={[styles.modalTitle, { color: theme.textPrimary }]}>Settings</Text>
            
            <View style={styles.inputWrapper}>
               <Text style={[styles.inputLabel, { color: theme.textSecondary }]}>Update Monthly Budget</Text>
               <TextInput
                style={[styles.budgetInput, { 
                  backgroundColor: isDarkMode ? '#0F172A' : '#F8FAFC', 
                  color: theme.textPrimary,
                  borderColor: theme.border
                }]}
                keyboardType="decimal-pad"
                value={newBudget}
                onChangeText={setNewBudget}
                placeholder="0.00"
                placeholderTextColor={theme.textMuted}
              />
            </View>

            <TouchableOpacity 
              style={[styles.updateButton, { backgroundColor: theme.bgBrand }]} 
              onPress={handleUpdateBudget}
            >
              <Text style={styles.updateButtonText}>Update Budget</Text>
            </TouchableOpacity>

            <View style={styles.divider} />

            {/* Reset App Option to see onboarding again */}
            <TouchableOpacity style={styles.resetButton} onPress={handleResetApp}>
              <Ionicons name="refresh-circle-outline" size={22} color={theme.danger} />
              <Text style={[styles.resetButtonText, { color: theme.danger }]}>Reset Profile (Onboarding)</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              onPress={() => setModalVisible(false)}
              style={styles.closeButton}
            >
              <Text style={{ color: theme.textSecondary, fontWeight: '600' }}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <FAB onPress={() => navigation.navigate('AddExpense')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  headerBg: { height: 180, borderBottomLeftRadius: Radius.xxl, borderBottomRightRadius: Radius.xxl, paddingHorizontal: Spacing.lg },
  headerContent: { marginTop: Spacing.md, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  headerActions: { flexDirection: 'row' },
  greeting: { fontSize: 20, fontWeight: '500' },
  userName: { fontSize: 24, fontWeight: '800' },
  iconButton: { width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center' },
  scrollView: { flex: 1, marginTop: -60 },
  scrollContent: { paddingBottom: Spacing.xl },
  statWrapper: { marginBottom: Spacing.lg },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: Spacing.lg, marginBottom: Spacing.md, marginTop: Spacing.sm },
  sectionTitle: { fontSize: 18, fontWeight: '700' },
  seeAll: { fontSize: 14, fontWeight: '600' },
  emptyContainer: { padding: Spacing.xxxl, alignItems: 'center' },
  emptyText: { fontSize: 14, textAlign: 'center' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'center', alignItems: 'center', padding: Spacing.xl },
  modalContent: { width: '100%', borderRadius: Radius.lg, padding: Spacing.xl, alignItems: 'center' },
  modalTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: Spacing.lg },
  inputWrapper: { width: '100%', marginBottom: Spacing.md },
  inputLabel: { fontSize: 12, fontWeight: '700', textTransform: 'uppercase', marginBottom: 8, letterSpacing: 0.5 },
  budgetInput: { width: '100%', height: 54, borderRadius: Radius.md, borderWidth: 1, paddingHorizontal: Spacing.md, fontSize: 18, fontWeight: '700' },
  updateButton: { width: '100%', height: 50, borderRadius: Radius.md, justifyContent: 'center', alignItems: 'center', marginTop: Spacing.sm },
  updateButtonText: { color: '#FFF', fontWeight: 'bold', fontSize: 16 },
  divider: { height: 1, backgroundColor: 'rgba(150,150,150,0.1)', width: '100%', marginVertical: Spacing.lg },
  resetButton: { flexDirection: 'row', alignItems: 'center', padding: 10 },
  resetButtonText: { fontWeight: '700', marginLeft: 8 },
  closeButton: { marginTop: Spacing.md, padding: 10 },
});

export default HomeScreen;
