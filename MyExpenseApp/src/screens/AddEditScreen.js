import React, { useState, useEffect } from 'react';
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
import { useTheme } from '../context/ThemeContext';
import { useExpenses } from '../context/ExpenseContext';
import { Spacing, Radius } from '../constants/spacing';
import { CATEGORIES } from '../constants/categories';
import { useNavigation, useRoute } from '@react-navigation/native';

const AddEditScreen = () => {
  const { theme } = useTheme();
  const { addExpense, updateExpense, deleteExpense } = useExpenses();
  const navigation = useNavigation();
  const route = useRoute();
  
  const editingExpense = route.params?.expense;
  const isEditing = !!editingExpense;

  const [title, setTitle] = useState(editingExpense?.title || '');
  const [amount, setAmount] = useState(editingExpense?.amount?.toString() || '');
  const [category, setCategory] = useState(editingExpense?.category || CATEGORIES[0].label);
  const [date, setDate] = useState(editingExpense?.date || new Date().toISOString());
  const [notes, setNotes] = useState(editingExpense?.notes || '');

  const handleSave = () => {
    if (!title || !amount) return;

    const expenseData = {
      id: editingExpense?.id,
      title,
      amount: parseFloat(amount),
      category,
      date,
      notes,
    };

    if (isEditing) {
      updateExpense(expenseData);
    } else {
      addExpense(expenseData);
    }
    navigation.goBack();
  };

  const handleDelete = () => {
    deleteExpense(editingExpense.id);
    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[styles.container, { backgroundColor: theme.bgPrimary }]}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.formGroup}>
          <Text style={[styles.label, { color: theme.textSecondary }]}>Title</Text>
          <TextInput 
            style={[styles.input, { backgroundColor: theme.bgSecondary, color: theme.textPrimary }]}
            placeholder="e.g. Dinner"
            placeholderTextColor={theme.textMuted}
            value={title}
            onChangeText={setTitle}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={[styles.label, { color: theme.textSecondary }]}>Amount</Text>
          <TextInput 
            style={[styles.input, { backgroundColor: theme.bgSecondary, color: theme.textPrimary }]}
            placeholder="0.00"
            placeholderTextColor={theme.textMuted}
            keyboardType="decimal-pad"
            value={amount}
            onChangeText={setAmount}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={[styles.label, { color: theme.textSecondary }]}>Category</Text>
          <View style={styles.categoryContainer}>
            {CATEGORIES.map((cat) => (
              <TouchableOpacity 
                key={cat.label}
                style={[
                  styles.categoryChip, 
                  { backgroundColor: category === cat.label ? theme.bgBrand : theme.bgSecondary }
                ]}
                onPress={() => setCategory(cat.label)}
              >
                <Text style={{ fontSize: 16 }}>{cat.emoji}</Text>
                <Text style={[
                  styles.categoryText, 
                  { color: category === cat.label ? theme.textInverse : theme.textPrimary }
                ]}>
                  {cat.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <TouchableOpacity 
          style={[styles.saveButton, { backgroundColor: theme.bgBrand }]} 
          onPress={handleSave}
        >
          <Text style={[styles.saveButtonText, { color: theme.textInverse }]}>
            {isEditing ? 'Update Expense' : 'Save Expense'}
          </Text>
        </TouchableOpacity>

        {isEditing && (
          <TouchableOpacity 
            style={styles.deleteButton} 
            onPress={handleDelete}
          >
            <Text style={[styles.deleteButtonText, { color: theme.danger }]}>Delete Expense</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: Spacing.lg,
  },
  formGroup: {
    marginBottom: Spacing.xl,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: Spacing.sm,
  },
  input: {
    height: 50,
    borderRadius: Radius.md,
    paddingHorizontal: Spacing.md,
    fontSize: 16,
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -Spacing.xs,
  },
  categoryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    borderRadius: Radius.full,
    margin: Spacing.xs,
  },
  categoryText: {
    marginLeft: Spacing.xs,
    fontSize: 12,
    fontWeight: '600',
  },
  saveButton: {
    height: 56,
    borderRadius: Radius.lg,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Spacing.xl,
  },
  saveButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  deleteButton: {
    marginTop: Spacing.lg,
    alignItems: 'center',
    padding: Spacing.md,
  },
  deleteButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});

export default AddEditScreen;
