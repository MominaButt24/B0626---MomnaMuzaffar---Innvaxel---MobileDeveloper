import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ExpenseContext = createContext();

const EXPENSES_KEY = '@my_expenses';
const INCOME_KEY = '@my_income';
const ONBOARDING_KEY = '@onboarding_complete';
const USER_NAME_KEY = '@user_name';

export const ExpenseProvider = ({ children }) => {
  const [expenses, setExpenses] = useState([]);
  const [income, setIncomeState] = useState(5000); 
  const [userName, setUserNameState] = useState('');
  const [isFirstLaunch, setIsFirstLaunch] = useState(null); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [storedExpenses, storedIncome, onboardingComplete, storedName] = await Promise.all([
          AsyncStorage.getItem(EXPENSES_KEY),
          AsyncStorage.getItem(INCOME_KEY),
          AsyncStorage.getItem(ONBOARDING_KEY),
          AsyncStorage.getItem(USER_NAME_KEY)
        ]);

        if (storedExpenses) setExpenses(JSON.parse(storedExpenses));
        if (storedIncome) setIncomeState(Number(storedIncome));
        if (storedName) setUserNameState(storedName);
        setIsFirstLaunch(onboardingComplete === null); 
      } catch (e) {
        console.error('Failed to load data', e);
        setIsFirstLaunch(false); 
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  useEffect(() => {
    const saveData = async () => {
      try {
        await Promise.all([
          AsyncStorage.setItem(EXPENSES_KEY, JSON.stringify(expenses)),
          AsyncStorage.setItem(INCOME_KEY, income.toString()),
          AsyncStorage.setItem(USER_NAME_KEY, userName)
        ]);
      } catch (e) {
        console.error('Failed to save data', e);
      }
    };
    if (!loading) saveData();
  }, [expenses, income, userName, loading]);

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

  const completeOnboarding = async (name) => {
    try {
      await AsyncStorage.setItem(ONBOARDING_KEY, 'true');
      if (name) {
        await AsyncStorage.setItem(USER_NAME_KEY, name);
        setUserNameState(name);
      }
      setIsFirstLaunch(false);
    } catch (e) {
      console.error('Failed to save onboarding status', e);
    }
  };

  // NEW: Reset function to clear storage and update state immediately
  const resetOnboarding = async () => {
    try {
      await AsyncStorage.removeItem(ONBOARDING_KEY);
      await AsyncStorage.removeItem(USER_NAME_KEY);
      setUserNameState('');
      setIsFirstLaunch(true);
    } catch (e) {
      console.error('Failed to reset onboarding', e);
    }
  };

  const totalExpenses = expenses.reduce((sum, item) => sum + Number(item.amount), 0);
  const balance = income - totalExpenses;

  return (
    <ExpenseContext.Provider value={{ 
      expenses, 
      loading, 
      isFirstLaunch,
      userName,
      addExpense, 
      updateExpense, 
      deleteExpense,
      totalExpenses,
      totalIncome: income,
      balance,
      setIncome,
      completeOnboarding,
      resetOnboarding
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
