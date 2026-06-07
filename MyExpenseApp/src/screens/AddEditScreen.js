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
  Alert
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useTheme } from '../context/ThemeContext';
import { useExpenses } from '../context/ExpenseContext';
import { Spacing, Radius } from '../constants/spacing';
import { CATEGORIES } from '../constants/categories';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { validateExpense } from '../utils/validators'; // Import our utility

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
  const [showDatePicker, setShowDatePicker] = useState(false);
  
  // State for validation errors
  const [errors, setErrors] = useState({});

  const handleSave = () => {
    const dataToValidate = { title, amount, category, date };
    const validation = validateExpense(dataToValidate);

    if (!validation.isValid) {
      setErrors(validation.errors);
      // Show the first error in an alert for immediate feedback
      const firstError = Object.values(validation.errors)[0];
      Alert.alert('Validation Error', firstError);
      return;
    }

    const expenseData = {
      id: editingExpense?.id,
      title: title.trim(),
      amount: parseFloat(amount),
      category,
      date: date.toISOString(),
    };

    if (isEditing) {
      updateExpense(expenseData);
    } else {
      addExpense(expenseData);
    }
    navigation.goBack();
  };

  const onDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.bgPrimary }]} edges={['bottom']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={theme.textPrimary} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.textPrimary }]}>
          {isEditing ? 'Edit Expense' : 'Add Expense'}
        </Text>
        <View style={{ width: 24 }} />
      </View>

      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          
          {/* Title Input */}
          <View style={styles.formGroup}>
            <Text style={[styles.label, { color: theme.textPrimary }]}>Title</Text>
            <View style={[
              styles.inputContainer, 
              { backgroundColor: isDarkMode ? '#1E222E' : '#F5F7FA' },
              errors.title && { borderColor: theme.danger, borderWidth: 1 }
            ]}>
              <TextInput 
                style={[styles.input, { color: theme.textPrimary }]}
                placeholder="e.g. Dinner"
                placeholderTextColor={theme.textMuted}
                value={title}
                onChangeText={(text) => {
                  setTitle(text);
                  if (errors.title) setErrors({...errors, title: null});
                }}
              />
              <Ionicons name="pencil-outline" size={20} color={theme.textMuted} />
            </View>
            {errors.title && <Text style={[styles.errorText, { color: theme.danger }]}>{errors.title}</Text>}
          </View>

          {/* Amount Input */}
          <View style={styles.formGroup}>
            <Text style={[styles.label, { color: theme.textPrimary }]}>Amount</Text>
            <View style={[
              styles.inputContainer, 
              { backgroundColor: isDarkMode ? '#1E222E' : '#F5F7FA' },
              errors.amount && { borderColor: theme.danger, borderWidth: 1 }
            ]}>
              <TextInput 
                style={[styles.input, { color: theme.textPrimary }]}
                placeholder="$0.00"
                placeholderTextColor={theme.textMuted}
                keyboardType="decimal-pad"
                value={amount}
                onChangeText={(text) => {
                  setAmount(text);
                  if (errors.amount) setErrors({...errors, amount: null});
                }}
              />
            </View>
            {errors.amount && <Text style={[styles.errorText, { color: theme.danger }]}>{errors.amount}</Text>}
          </View>

          {/* Date Picker */}
          <View style={styles.formGroup}>
            <Text style={[styles.label, { color: theme.textPrimary }]}>Date</Text>
            <TouchableOpacity 
              style={[styles.inputContainer, { backgroundColor: isDarkMode ? '#1E222E' : '#F5F7FA' }]}
              onPress={() => setShowDatePicker(true)}
            >
              <Text style={[styles.dateText, { color: theme.textPrimary }]}>
                {date.toLocaleDateString()}
              </Text>
              <Ionicons name="calendar-outline" size={20} color={theme.textMuted} />
            </TouchableOpacity>
          </View>

          {showDatePicker && (
            <DateTimePicker
              value={date}
              mode="date"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={onDateChange}
            />
          )}

          {/* Categories Grid */}
          <Text style={[styles.label, { color: theme.textPrimary, marginTop: Spacing.md }]}>Categories</Text>
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
                    { 
                      backgroundColor: isActive ? theme.bgBrand : (isDarkMode ? 'rgba(255,255,255,0.05)' : cat.color + '15'),
                      borderColor: isActive ? theme.bgBrand : 'transparent'
                    }
                  ]}>
                    <Ionicons 
                      name={cat.icon} 
                      size={24} 
                      color={isActive ? '#FFF' : cat.color} 
                    />
                  </View>
                  <Text style={[
                    styles.categoryItemText, 
                    { color: isActive ? theme.bgBrand : theme.textSecondary, fontWeight: isActive ? '700' : '500' }
                  ]}>
                    {cat.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Save Button */}
          <TouchableOpacity 
            style={[styles.saveButton, { backgroundColor: theme.bgBrand }]} 
            onPress={handleSave}
            activeOpacity={0.8}
          >
            <Text style={[styles.saveButtonText, { color: '#FFF' }]}>Save</Text>
          </TouchableOpacity>

          {isEditing && (
            <TouchableOpacity 
              style={styles.deleteButton} 
              onPress={() => {
                deleteExpense(editingExpense.id);
                navigation.goBack();
              }}
            >
              <Text style={[styles.deleteButtonText, { color: theme.danger }]}>Delete Transaction</Text>
            </TouchableOpacity>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    height: 56,
  },
  headerTitle: { fontSize: 18, fontWeight: '700' },
  scrollContent: { padding: Spacing.lg },
  formGroup: { marginBottom: Spacing.lg },
  label: { fontSize: 16, fontWeight: '600', marginBottom: Spacing.sm },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 56,
    borderRadius: Radius.md,
    paddingHorizontal: Spacing.md,
  },
  input: { flex: 1, fontSize: 16, fontWeight: '500' },
  dateText: { flex: 1, fontSize: 16, fontWeight: '500' },
  errorText: { fontSize: 12, marginTop: 4, marginLeft: 4, fontWeight: '600' },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: Spacing.sm,
  },
  categoryItem: { width: '23%', alignItems: 'center', marginBottom: Spacing.lg },
  categoryIconCircle: {
    width: 54,
    height: 54,
    borderRadius: 27,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
    borderWidth: 1,
  },
  categoryItemText: { fontSize: 11, textAlign: 'center' },
  saveButton: {
    height: 56,
    borderRadius: Radius.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Spacing.xl,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  saveButtonText: { fontSize: 18, fontWeight: '700' },
  deleteButton: { marginTop: Spacing.xl, alignItems: 'center', padding: Spacing.md },
  deleteButtonText: { fontSize: 16, fontWeight: '600' },
});

export default AddEditScreen;
