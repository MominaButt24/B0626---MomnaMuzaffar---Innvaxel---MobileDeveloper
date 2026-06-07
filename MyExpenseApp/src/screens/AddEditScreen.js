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
import { useTheme } from '../context/ThemeContext';
import { useExpenses } from '../context/ExpenseContext';
import { Spacing, Radius } from '../constants/spacing';
import { CATEGORIES } from '../constants/categories';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

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
  const [date, setDate] = useState(editingExpense?.date || new Date().toISOString().split('T')[0]);
  const [notes, setNotes] = useState(editingExpense?.notes || '');

  const handleSave = () => {
    if (!title || !amount) {
      alert('Please fill in Title and Amount');
      return;
    }

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

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.bgPrimary }]} edges={['bottom']}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          
          <View style={styles.formCard}>
            {/* Title Input */}
            <View style={styles.formGroup}>
              <Text style={[styles.label, { color: theme.textSecondary }]}>Title</Text>
              <TextInput 
                style={[styles.input, { backgroundColor: theme.bgSecondary, color: theme.textPrimary }]}
                placeholder="Dinner with friends"
                placeholderTextColor={theme.textMuted}
                value={title}
                onChangeText={setTitle}
              />
            </View>

            {/* Amount Input */}
            <View style={styles.formGroup}>
              <Text style={[styles.label, { color: theme.textSecondary }]}>Amount ($)</Text>
              <TextInput 
                style={[styles.input, { backgroundColor: theme.bgSecondary, color: theme.textPrimary }]}
                placeholder="0.00"
                placeholderTextColor={theme.textMuted}
                keyboardType="decimal-pad"
                value={amount}
                onChangeText={setAmount}
              />
            </View>

            {/* Date Input (Simple Text for now) */}
            <View style={styles.formGroup}>
              <Text style={[styles.label, { color: theme.textSecondary }]}>Date</Text>
              <TextInput 
                style={[styles.input, { backgroundColor: theme.bgSecondary, color: theme.textPrimary }]}
                placeholder="YYYY-MM-DD"
                placeholderTextColor={theme.textMuted}
                value={date}
                onChangeText={setDate}
              />
            </View>
          </View>

          {/* Category Selector */}
          <Text style={[styles.sectionLabel, { color: theme.textPrimary }]}>Category</Text>
          <View style={styles.categoryContainer}>
            {CATEGORIES.map((cat) => (
              <TouchableOpacity 
                key={cat.label}
                style={[
                  styles.categoryChip, 
                  { 
                    backgroundColor: category === cat.label ? theme.bgBrand : theme.bgSecondary,
                    borderColor: category === cat.label ? theme.bgBrand : theme.border
                  }
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

          {/* Save Button */}
          <TouchableOpacity 
            style={[styles.saveButton, { backgroundColor: theme.bgBrand }]} 
            onPress={handleSave}
            activeOpacity={0.8}
          >
            <Text style={[styles.saveButtonText, { color: theme.textInverse }]}>
              {isEditing ? 'Update Transaction' : 'Add Transaction'}
            </Text>
          </TouchableOpacity>

          {isEditing && (
            <TouchableOpacity 
              style={styles.deleteButton} 
              onPress={() => {
                deleteExpense(editingExpense.id);
                navigation.goBack();
              }}
            >
              <Ionicons name="trash-outline" size={20} color={theme.danger} />
              <Text style={[styles.deleteButtonText, { color: theme.danger }]}>Delete Transaction</Text>
            </TouchableOpacity>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: Spacing.lg,
  },
  formCard: {
    padding: Spacing.md,
    borderRadius: Radius.lg,
    marginBottom: Spacing.lg,
  },
  formGroup: {
    marginBottom: Spacing.md,
  },
  label: {
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    marginBottom: Spacing.xs,
    letterSpacing: 0.5,
  },
  sectionLabel: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: Spacing.md,
    marginLeft: Spacing.xs,
  },
  input: {
    height: 54,
    borderRadius: Radius.md,
    paddingHorizontal: Spacing.md,
    fontSize: 16,
    fontWeight: '500',
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: Spacing.xl,
  },
  categoryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    borderRadius: Radius.full,
    margin: 4,
    borderWidth: 1,
  },
  categoryText: {
    marginLeft: Spacing.xs,
    fontSize: 13,
    fontWeight: '600',
  },
  saveButton: {
    height: 56,
    borderRadius: Radius.xl,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  saveButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  deleteButton: {
    marginTop: Spacing.xl,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.md,
  },
  deleteButtonText: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: Spacing.sm,
  },
});

export default AddEditScreen;
