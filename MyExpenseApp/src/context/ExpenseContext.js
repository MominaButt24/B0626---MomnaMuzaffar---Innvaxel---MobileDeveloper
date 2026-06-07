import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ExpenseContext = createContext();

const EXPENSES_KEY = '@my_expenses';
const INCOME_KEY = '@my_income';

export const ExpenseProvider = ({ children }) => {
  const [expenses, setExpenses] = useState([]);
  const [income, setIncomeState] = useState(5000); // Default if nothing is saved
  const [loading, setLoading] = useState(true);

  // Load both expenses and income on mount
  useEffect(() => {
    const loadData = async () => {
      try {
        const [storedExpenses, storedIncome] = await Promise.all([
          AsyncStorage.getItem(EXPENSES_KEY),
          AsyncStorage.getItem(INCOME_KEY)
        ]);

        if (storedExpenses) setExpenses(JSON.parse(storedExpenses));
        if (storedIncome) setIncomeState(Number(storedIncome));
      } catch (e) {
        console.error('Failed to load data', e);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  // Save data whenever it changes
  useEffect(() => {
    const saveData = async () => {
      try {
        await Promise.all([
          AsyncStorage.setItem(EXPENSES_KEY, JSON.stringify(expenses)),
          AsyncStorage.setItem(INCOME_KEY, income.toString())
        ]);
      } catch (e) {
        console.error('Failed to save data', e);
      }
    };
    if (!loading) saveData();
  }, [expenses, income, loading]);

  const addExpense = (expense) => {
    setExpenses(prev => [{ ...expense, id: Date.now().toString() }, ...prev]);
  };

  const updateExpense = (updatedExpense) => {
    setExpenses(prev => prev.map(item => item.id === updatedExpense.id ? updatedExpense : item));
  };

  const deleteExpense = (id) => {
    setExpenses(prev => prev.filter(item => item.id !== id));
  };

  const setIncome = (value) => {
    setIncomeState(Number(value));
  };

  const totalExpenses = expenses.reduce((sum, item) => sum + Number(item.amount), 0);
  const balance = income - totalExpenses;

  return (
    <ExpenseContext.Provider value={{ 
      expenses, 
      loading, 
      addExpense, 
      updateExpense, 
      deleteExpense,
      totalExpenses,
      totalIncome: income,
      balance,
      setIncome
    }}>
      {children}
    </ExpenseContext.Provider>
  );
};

export const useExpenses = () => {
  const context = useContext(ExpenseContext);
  if (!context) throw new Error('useExpenses must be used within an ExpenseProvider');
  return context;
};
