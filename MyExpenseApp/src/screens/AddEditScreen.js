import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  ScrollView, 
  KeyboardAvoidingView, 
  Platform 
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

/**
 * AddEditScreen: Fully standardized using constants for styling.
 * Adapts to system Light/Dark theme.
 */
const AddEditScreen = () => {
  const { theme, isDarkMode } = useTheme();
  const { addExpense, updateExpense, deleteExpense } = useExpenses();
  const navigation = useNavigation();
  const route = useRoute();
  
  const editingExpense = route.params?.expense;
  const isEditing = !!editingExpense;

  const [title, setTitle] = useState(editingExpense?.title || '');
  const [amount, setAmount] = useState(editingExpense?.amount?.toString() || '');
  const [category, setCategory] = useState(editingExpense?.category || CATEGORIES[0].label);
  const [date, setDate] = useState(new Date(editingExpense?.date || Date.now()));
  const [notes, setNotes] = useState(editingExpense?.notes || ''); 
  const [showDatePicker, setShowDatePicker] = useState(false);
  
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

    if (isEditing) {
      updateExpense(expenseData);
    } else {
      addExpense(expenseData);
    }

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
        deleteExpense(editingExpense.id);
        navigation.goBack();
      }
    );
  };

  const onDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) setDate(selectedDate);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.bgPrimary }]} edges={['top', 'bottom']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={theme.textPrimary} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.textPrimary }]}>
          {isEditing ? 'Edit Expense' : 'Add Expense'}
        </Text>
        <View style={{ width: 40 }} /> 
      </View>

      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.flex}
      >
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          
          <View style={styles.formGroup}>
            <Text style={[styles.label, { color: theme.textPrimary }]}>Title</Text>
            <View style={[styles.inputContainer, { backgroundColor: theme.bgSecondary }]}>
              <TextInput 
                style={[styles.input, { color: theme.textPrimary }]}
                placeholder="e.g. Shopping"
                placeholderTextColor={theme.textMuted}
                value={title}
                onChangeText={setTitle}
              />
            </View>
          </View>

          <View style={styles.formGroup}>
            <Text style={[styles.label, { color: theme.textPrimary }]}>Amount</Text>
            <View style={[styles.inputContainer, { backgroundColor: theme.bgSecondary }]}>
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

          <View style={styles.formGroup}>
            <Text style={[styles.label, { color: theme.textPrimary }]}>Date</Text>
            <TouchableOpacity 
              style={[styles.inputContainer, { backgroundColor: theme.bgSecondary }]}
              onPress={() => setShowDatePicker(true)}
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

          <View style={styles.formGroup}>
            <Text style={[styles.label, { color: theme.textPrimary }]}>Notes (Optional)</Text>
            <View style={[styles.inputContainer, { backgroundColor: theme.bgSecondary, height: 80, alignItems: 'flex-start', paddingVertical: Spacing.sm }]}>
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

          <Text style={[styles.label, { color: theme.textPrimary, marginTop: Spacing.sm }]}>Category</Text>
          <View style={styles.categoryGrid}>
            {CATEGORIES.map((cat) => {
              const isActive = category === cat.label;
              return (
                <TouchableOpacity 
                  key={cat.label}
                  style={styles.categoryItem}
                  onPress={() => setCategory(cat.label)}
                >
                  <View style={[
                    styles.categoryIconCircle, 
                    { backgroundColor: isActive ? theme.bgBrand : (isDarkMode ? theme.bgTertiary : cat.color + '15') }
                  ]}>
                    <Ionicons name={cat.icon} size={24} color={isActive ? theme.textInverse : cat.color} />
                  </View>
                  <Text style={[
                    styles.categoryItemText, 
                    { color: isActive ? theme.bgBrand : theme.textSecondary, fontWeight: isActive ? FontWeight.bold : FontWeight.medium }
                  ]}>
                    {cat.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <TouchableOpacity 
            style={[styles.saveButton, { backgroundColor: theme.bgBrand }]} 
            onPress={handleSave}
            activeOpacity={0.8}
          >
            <Text style={[styles.saveButtonText, { color: theme.textInverse }]}>Save Transaction</Text>
          </TouchableOpacity>

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
    height: 60 
  },
  backButton: { padding: Spacing.sm },
  headerTitle: { fontSize: FontSize.lg, fontWeight: FontWeight.bold },
  scrollContent: { padding: Spacing.lg, paddingBottom: 100 },
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
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 4 }, 
    shadowOpacity: 0.1, 
    shadowRadius: 8 
  },
  saveButtonText: { fontSize: FontSize.md, fontWeight: FontWeight.bold },
  deleteButton: { marginTop: Spacing.xl, alignItems: 'center', padding: Spacing.md },
  deleteButtonText: { fontSize: FontSize.base, fontWeight: FontWeight.semibold },
});

export default AddEditScreen;
