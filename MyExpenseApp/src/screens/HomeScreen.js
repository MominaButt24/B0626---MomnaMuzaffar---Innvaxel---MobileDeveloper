import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, StatusBar, TouchableOpacity, Modal, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../context/ThemeContext';
import { useExpenses } from '../context/ExpenseContext';
import { Spacing, Radius } from '../constants/spacing';
import { FontSize, FontWeight } from '../constants/typography';
import StatCard from '../components/StatCard';
import ExpenseCard from '../components/ExpenseCard';
import FAB from '../components/FAB';
import CustomAlert from '../components/CustomAlert';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { formatCurrency } from '../utils/formatCurrency';

/**
 * HomeScreen: The main dashboard.
 * Standardized using Spacing, Radius, and Typography constants.
 * Integrated with CustomAlert for a consistent and beautiful UI.
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
    resetOnboarding 
  } = useExpenses();
  const navigation = useNavigation();

  const [modalVisible, setModalVisible] = useState(false);
  const [newBudget, setNewBudget] = useState(totalIncome.toString());
  
  // Custom Alert State
  const [alertConfig, setAlertConfig] = useState({
    visible: false,
    title: '',
    message: '',
    type: 'info',
    onConfirm: null,
    confirmText: 'OK'
  });

  const showAlert = (title, message, type = 'info', onConfirm = null, confirmText = 'OK') => {
    setAlertConfig({ visible: true, title, message, type, onConfirm, confirmText });
  };

  const closeAlert = () => {
    setAlertConfig(prev => ({ ...prev, visible: false }));
  };

  const recentExpenses = expenses.slice(0, 5);

  const handleUpdateBudget = () => {
    const amount = parseFloat(newBudget);
    if (isNaN(amount) || amount < 0) {
      showAlert('Invalid Amount', 'Please enter a valid positive number.', 'error');
      return;
    }
    setIncome(amount);
    setModalVisible(false);
    showAlert('Success', 'Your monthly budget has been updated.', 'success');
  };

  const handleResetApp = () => {
    showAlert(
      "Reset Profile?", 
      "This will clear your name and take you back to the onboarding screen immediately.",
      "warning",
      async () => {
        await resetOnboarding();
        setModalVisible(false);
      },
      "Reset"
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
              <Text style={[styles.greeting, { color: theme.textInverse, opacity: 0.8 }]}>Hello,</Text>
              <Text style={[styles.userName, { color: theme.textInverse }]} numberOfLines={1}>
                {userName || 'Guest'}
              </Text>
            </View>
            
            <View style={styles.headerActions}>
              <TouchableOpacity 
                onPress={() => {
                  setNewBudget(totalIncome.toString());
                  setModalVisible(true);
                }}
                style={[styles.iconButton, { backgroundColor: 'rgba(255,255,255,0.2)', marginRight: Spacing.sm }]}
              >
                <Ionicons name="wallet-outline" size={FontSize.lg} color={theme.textInverse} />
              </TouchableOpacity>

              <TouchableOpacity 
                onPress={toggleTheme}
                style={[styles.iconButton, { backgroundColor: 'rgba(255,255,255,0.2)' }]}
              >
                <Ionicons 
                  name={isDarkMode ? 'sunny' : 'moon'} 
                  size={FontSize.lg} 
                  color={theme.textInverse} 
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
            <Ionicons name="receipt-outline" size={48} color={theme.textMuted} style={{ marginBottom: Spacing.sm }} />
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
          <View style={[styles.modalContent, { backgroundColor: theme.cardBg }]}>
            <Text style={[styles.modalTitle, { color: theme.textPrimary }]}>Settings</Text>
            
            <View style={styles.inputWrapper}>
               <Text style={[styles.inputLabel, { color: theme.textSecondary }]}>Update Monthly Budget</Text>
               <TextInput
                style={[styles.budgetInput, { 
                  backgroundColor: theme.bgSecondary, 
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

            <TouchableOpacity style={styles.resetButton} onPress={handleResetApp}>
              <Ionicons name="refresh-circle-outline" size={FontSize.lg} color={theme.danger} />
              <Text style={[styles.resetButtonText, { color: theme.danger }]}>Reset Profile (Onboarding)</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              onPress={() => setModalVisible(false)}
              style={styles.closeButton}
            >
              <Text style={{ color: theme.textSecondary, fontWeight: FontWeight.semibold }}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <CustomAlert 
        {...alertConfig} 
        onClose={closeAlert} 
      />

      <FAB onPress={() => navigation.navigate('AddExpense')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  headerBg: { 
    height: 180, 
    borderBottomLeftRadius: Radius.xxl, 
    borderBottomRightRadius: Radius.xxl, 
    paddingHorizontal: Spacing.lg 
  },
  headerContent: { 
    marginTop: Spacing.md, 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center' 
  },
  headerActions: { flexDirection: 'row' },
  greeting: { fontSize: FontSize.lg, fontWeight: FontWeight.medium },
  userName: { fontSize: FontSize.xl, fontWeight: FontWeight.bold },
  iconButton: { width: 40, height: 40, borderRadius: Radius.full, justifyContent: 'center', alignItems: 'center' },
  scrollView: { flex: 1, marginTop: -60 },
  scrollContent: { paddingBottom: Spacing.xl },
  statWrapper: { marginBottom: Spacing.lg },
  sectionHeader: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    paddingHorizontal: Spacing.lg, 
    marginBottom: Spacing.md, 
    marginTop: Spacing.sm 
  },
  sectionTitle: { fontSize: FontSize.md, fontWeight: FontWeight.bold },
  seeAll: { fontSize: FontSize.sm, fontWeight: FontWeight.semibold },
  emptyContainer: { padding: Spacing.xxxl, alignItems: 'center' },
  emptyText: { fontSize: FontSize.sm, textAlign: 'center' },
  modalOverlay: { 
    flex: 1, 
    backgroundColor: 'rgba(0,0,0,0.6)', 
    justifyContent: 'center', 
    alignItems: 'center', 
    padding: Spacing.xl 
  },
  modalContent: { 
    width: '100%', 
    borderRadius: Radius.lg, 
    padding: Spacing.xl, 
    alignItems: 'center', 
    elevation: 10 
  },
  modalTitle: { fontSize: FontSize.lg, fontWeight: FontWeight.bold, marginBottom: Spacing.lg },
  inputWrapper: { width: '100%', marginBottom: Spacing.md },
  inputLabel: { 
    fontSize: FontSize.xs, 
    fontWeight: FontWeight.bold, 
    textTransform: 'uppercase', 
    marginBottom: Spacing.sm, 
    letterSpacing: 0.5 
  },
  budgetInput: { 
    width: '100%', 
    height: 54, 
    borderRadius: Radius.md, 
    borderWidth: 1, 
    paddingHorizontal: Spacing.md, 
    fontSize: FontSize.md, 
    fontWeight: FontWeight.bold 
  },
  updateButton: { 
    width: '100%', 
    height: 50, 
    borderRadius: Radius.md, 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginTop: Spacing.sm 
  },
  updateButtonText: { color: '#FFF', fontWeight: FontWeight.bold, fontSize: FontSize.base },
  divider: { 
    height: 1, 
    backgroundColor: 'rgba(150,150,150,0.1)', 
    width: '100%', 
    marginVertical: Spacing.lg 
  },
  resetButton: { flexDirection: 'row', alignItems: 'center', padding: Spacing.sm },
  resetButtonText: { fontWeight: FontWeight.bold, marginLeft: Spacing.sm },
  closeButton: { marginTop: Spacing.md, padding: Spacing.sm },
});

export default HomeScreen;
