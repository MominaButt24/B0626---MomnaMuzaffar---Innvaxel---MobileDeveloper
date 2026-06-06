import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ExpenseContext = createContext();

const STORAGE_KEY = '@my_expenses';

export const ExpenseProvider = ({ children }) => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load expenses from AsyncStorage on mount
  useEffect(() => {
    const loadExpenses = async () => {
      try {
        const storedExpenses = await AsyncStorage.getItem(STORAGE_KEY);
        if (storedExpenses) {
          setExpenses(JSON.parse(storedExpenses));
        }
      } catch (e) {
        console.error('Failed to load expenses', e);
      } finally {
        setLoading(false);
      }
    };
    loadExpenses();
  }, []);

  // Persist expenses whenever they change
  useEffect(() => {
    const saveExpenses = async () => {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
      } catch (e) {
        console.error('Failed to save expenses', e);
      }
    };
    if (!loading) {
      saveExpenses();
    }
  }, [expenses, loading]);

  const addExpense = (expense) => {
    setExpenses(prev => [
      { ...expense, id: Date.now().toString() },
      ...prev
    ]);
  };

  const updateExpense = (updatedExpense) => {
    setExpenses(prev => 
      prev.map(item => item.id === updatedExpense.id ? updatedExpense : item)
    );
  };

  const deleteExpense = (id) => {
    setExpenses(prev => prev.filter(item => item.id !== id));
  };

  const totalSpent = expenses.reduce((sum, item) => sum + Number(item.amount), 0);

  return (
    <ExpenseContext.Provider value={{ 
      expenses, 
      loading, 
      addExpense, 
      updateExpense, 
      deleteExpense,
      totalSpent 
    }}>
      {children}
    </ExpenseContext.Provider>
  );
};

export const useExpenses = () => {
  const context = useContext(ExpenseContext);
  if (!context) {
    throw new Error('useExpenses must be used within an ExpenseProvider');
  }
  return context;
};
