/**
 * AddEditScreen.js
 * 
 * This is the workhorse of the app. It's a dual-purpose screen:
 * 1. Adding new expenses from scratch.
 * 2. Editing existing ones if the user made a mistake.
 * 
 * I tried to make the form feel very snappy with haptic feedback and a 
 * clean category grid so users can log their spending in under 10 seconds.
 */

import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  ScrollView, 
  KeyboardAvoidingView, 
  Platform,
  Image
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useTheme } from '../context/ThemeContext';
import { useExpenses } from '../context/ExpenseContext';
import { Spacing, Radius } from '../constants/spacing';
import { FontSize, FontWeight } from '../constants/typography';
import { CATEGORIES } from '../constants/categories';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { validateExpense } from '../utils/validators';
import { formatNumericDate } from '../utils/formatDate';
import CustomAlert from '../components/CustomAlert';
import { triggerHaptic } from '../utils/haptics';

const AddEditScreen = () => {
  const { theme, isDarkMode } = useTheme();
  const { addExpense, updateExpense, deleteExpense } = useExpenses();
  const navigation = useNavigation();
  const route = useRoute();
  
  // Checking if we're editing an old expense or starting a new one
  const editingExpense = route.params?.expense;
  const isEditing = !!editingExpense;

  // Setting up our form states
  const [title, setTitle] = useState(editingExpense?.title || '');
  const [amount, setAmount] = useState(editingExpense?.amount?.toString() || '');
  const [category, setCategory] = useState(editingExpense?.category || CATEGORIES[0].label);
  const [date, setDate] = useState(new Date(editingExpense?.date || Date.now()));
  const [notes, setNotes] = useState(editingExpense?.notes || ''); 
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Pretty alert state
  const [alertConfig, setAlertConfig] = useState({
    visible: false,
    title: '',
    message: '',
    type: 'info',
    onConfirm: null,
  });

  const showAlert = (title, message, type = 'info', onConfirm = null) => {
    setAlertConfig({ visible: true, title, message, type, onConfirm });
  };

  const closeAlert = () => {
    setAlertConfig(prev => ({ ...prev, visible: false }));
  };

  const handleSave = () => {
    const dataToValidate = { title, amount, category, date };
    const validation = validateExpense(dataToValidate);

    // Don't let the user save if the title or amount is empty
    if (!validation.isValid) {
      const firstError = Object.values(validation.errors)[0];
      showAlert('Missing Info', firstError, 'error');
      return;
    }

    const expenseData = {
      id: editingExpense?.id,
      title: title.trim(),
      amount: parseFloat(amount),
      category,
      date: date.toISOString(),
      notes: notes.trim(),
    };

    // Update if it exists, otherwise add it as a new entry
    if (isEditing) {
      updateExpense(expenseData);
    } else {
      addExpense(expenseData);
    }

    // Give the user some tactile feedback and show a success message
    triggerHaptic('success');
    showAlert(
      'Success!', 
      isEditing ? 'Expense updated successfully.' : 'New expense added to your history.', 
      'success', 
      () => navigation.goBack()
    );
  };

  const handleDelete = () => {
    showAlert(
      'Are you sure?', 
      'This transaction will be permanently removed.', 
      'warning', 
      () => {
        triggerHaptic('medium');
        deleteExpense(editingExpense.id);
        navigation.goBack();
      }
    );
  };

  const onDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      triggerHaptic('light');
      setDate(selectedDate);
    }
  };

  const selectCategory = (label) => {
    triggerHaptic('light');
    setCategory(label);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.bgPrimary }]} edges={['top', 'bottom']}>
      {/* Top Navigation Bar */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={theme.textPrimary} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.textPrimary }]}>
          {isEditing ? 'Edit Expense' : 'Add Expense'}
        </Text>
        <Image
            source={require('../assets/wallet.png')}
            style={styles.ExpenseIcon}
            resizeMode="contain"
        />
      </View>

      {/* KeyboardAvoidingView keeps the form visible when the keyboard pops up */}
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.flex}
      >
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          
          {/* Title Input */}
          <View style={styles.formGroup}>
            <Text style={[styles.label, { color: theme.textPrimary }]}>Title</Text>
            <View style={[styles.inputContainer, { backgroundColor: isDarkMode ? '#1E222E' : '#F8FAFC' }]}>
              <TextInput 
                style={[styles.input, { color: theme.textPrimary }]}
                placeholder="e.g. Shopping"
                placeholderTextColor={theme.textMuted}
                value={title}
                onChangeText={setTitle}
              />
            </View>
          </View>

          {/* Amount Input */}
          <View style={styles.formGroup}>
            <Text style={[styles.label, { color: theme.textPrimary }]}>Amount</Text>
            <View style={[styles.inputContainer, { backgroundColor: isDarkMode ? '#1E222E' : '#F8FAFC' }]}>
              <TextInput 
                style={[styles.input, { color: theme.textPrimary }]}
                placeholder="Rs 0.00"
                placeholderTextColor={theme.textMuted}
                keyboardType="decimal-pad"
                value={amount}
                onChangeText={setAmount}
              />
            </View>
          </View>

          {/* Date Picker Field - opens a calendar popover */}
          <View style={styles.formGroup}>
            <Text style={[styles.label, { color: theme.textPrimary }]}>Date</Text>
            <TouchableOpacity 
              style={[styles.inputContainer, { backgroundColor: isDarkMode ? '#1E222E' : '#F8FAFC' }]}
              onPress={() => {
                triggerHaptic('light');
                setShowDatePicker(true);
              }}
            >
              <Text style={[styles.dateText, { color: theme.textPrimary }]}>
                {formatNumericDate(date)}
              </Text>
              <Ionicons name="calendar-outline" size={20} color={theme.textMuted} />
            </TouchableOpacity>
          </View>

          {showDatePicker && (
            <DateTimePicker
              value={date}
              mode="date"
              display={Platform.OS === 'ios' ? 'inline' : 'default'}
              onChange={onDateChange}
            />
          )}

          {/* Notes: Let the user add a bit more detail if they want */}
          <View style={styles.formGroup}>
            <Text style={[styles.label, { color: theme.textPrimary }]}>Notes (Optional)</Text>
            <View style={[styles.inputContainer, { backgroundColor: isDarkMode ? '#1E222E' : '#F8FAFC', height: 80, alignItems: 'flex-start', paddingVertical: Spacing.sm }]}>
              <TextInput 
                style={[styles.input, { color: theme.textPrimary, height: '100%' }]}
                placeholder="Add details..."
                placeholderTextColor={theme.textMuted}
                value={notes}
                onChangeText={setNotes}
                multiline
              />
            </View>
          </View>

          {/* Categories Grid: Using a visual grid instead of a boring dropdown */}
          <Text style={[styles.label, { color: theme.textPrimary, marginTop: Spacing.sm }]}>Category</Text>
          <View style={styles.categoryGrid}>
            {CATEGORIES.map((cat) => {
              const isActive = category === cat.label;
              return (
                <TouchableOpacity 
                  key={cat.label}
                  style={styles.categoryItem}
                  onPress={() => selectCategory(cat.label)}
                >
                  <View style={[
                    styles.categoryIconCircle, 
                    { backgroundColor: isActive ? '#3B82F6' : (isDarkMode ? '#1E222E' : cat.color + '15') }
                  ]}>
                    <Ionicons name={cat.icon} size={24} color={isActive ? '#FFF' : cat.color} />
                  </View>
                  <Text style={[
                    styles.categoryItemText, 
                    { color: isActive ? '#3B82F6' : theme.textSecondary, fontWeight: isActive ? FontWeight.bold : FontWeight.medium }
                  ]}>
                    {cat.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Save Button: Big and easy to tap */}
          <TouchableOpacity 
            style={[styles.saveButton, { backgroundColor: '#3B82F6' }]} 
            onPress={handleSave}
            activeOpacity={0.8}
          >
            <Text style={[styles.saveButtonText, { color: '#FFF' }]}>Save Transaction</Text>
          </TouchableOpacity>

          {/* Delete Button: Only shown when editing, obviously */}
          {isEditing && (
            <TouchableOpacity 
              style={styles.deleteButton} 
              onPress={handleDelete}
            >
              <Text style={[styles.deleteButtonText, { color: theme.danger }]}>Delete Transaction</Text>
            </TouchableOpacity>
          )}
        </ScrollView>
      </KeyboardAvoidingView>

      <CustomAlert 
        {...alertConfig} 
        onClose={closeAlert} 
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  flex: { flex: 1 },
  header: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    paddingHorizontal: Spacing.md, 
    height: 60,
    paddingTop: Spacing.md,
  },
  backButton: { padding: Spacing.sm },
  headerTitle: { fontSize: FontSize.lg, fontWeight: FontWeight.bold },
  ExpenseIcon: { width: 40, height: 40},
  scrollContent: { padding: Spacing.lg, paddingBottom: 60 },
  formGroup: { marginBottom: Spacing.lg },
  label: { fontSize: FontSize.base, fontWeight: FontWeight.bold, marginBottom: Spacing.sm },
  inputContainer: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    height: 56, 
    borderRadius: Radius.lg, 
    paddingHorizontal: Spacing.md 
  },
  input: { flex: 1, fontSize: FontSize.base, fontWeight: FontWeight.semibold },
  dateText: { flex: 1, fontSize: FontSize.base, fontWeight: FontWeight.semibold },
  categoryGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginTop: Spacing.sm },
  categoryItem: { width: '23%', alignItems: 'center', marginBottom: Spacing.lg },
  categoryIconCircle: { 
    width: 56, 
    height: 56, 
    borderRadius: 28, 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginBottom: Spacing.sm 
  },
  categoryItemText: { fontSize: FontSize.xs, textAlign: 'center' },
  saveButton: { 
    height: 56, 
    borderRadius: Radius.lg, 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginTop: Spacing.md, 
    elevation: 4, 
    shadowColor: '#3B82F6', 
    shadowOffset: { width: 0, height: 4 }, 
    shadowOpacity: 0.3, 
    shadowRadius: 8 
  },
  saveButtonText: { fontSize: FontSize.md, fontWeight: FontWeight.bold },
  deleteButton: { marginTop: Spacing.xl, alignItems: 'center', padding: Spacing.md },
  deleteButtonText: { fontSize: FontSize.base, fontWeight: FontWeight.semibold },
});

export default AddEditScreen;
