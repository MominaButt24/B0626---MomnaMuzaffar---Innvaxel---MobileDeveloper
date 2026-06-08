/**
 * ExpenseContext.js
 * 
 * This file is basically the "brain" of the app. It handles all the data 
 * like how much we spent, what our income is, and if we've seen the 
 * onboarding screens yet. 
 * 
 * I put this in a Context so I don't have to pass 'expenses' through 
 * every single component. Any screen can just grab what it needs.
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Creating the context - think of this as the global storage bucket
const ExpenseContext = createContext();

// Storage keys - I used constants here so I don't make typos later
const EXPENSES_KEY = '@my_expenses';
const INCOME_KEY = '@my_income';
const ONBOARDING_KEY = '@onboarding_complete';
const USER_NAME_KEY = '@user_name';

export const ExpenseProvider = ({ children }) => {
  const [expenses, setExpenses] = useState([]);
  const [income, setIncomeState] = useState(5000); // Default income just so it's not zero
  const [userName, setUserNameState] = useState('');
  const [isFirstLaunch, setIsFirstLaunch] = useState(null); 
  const [loading, setLoading] = useState(true);

  // 1. Loading data when the app starts
  // We go check the phone's memory to see if we have saved data from last time
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
        
        // If 'onboardingComplete' is null, it's their very first time opening the app
        setIsFirstLaunch(onboardingComplete === null); 
      } catch (e) {
        console.error('Oops! Something went wrong loading data', e);
        setIsFirstLaunch(false); 
      } finally {
        // Once we're done checking storage, we stop the loading spinner
        setLoading(false);
      }
    };
    loadData();
  }, []);

  // 2. Saving data automatically
  // Every time something changes (expenses, income, name), we save it to the phone 
  // so the user doesn't lose their data when they close the app.
  useEffect(() => {
    const saveData = async () => {
      try {
        await Promise.all([
          AsyncStorage.setItem(EXPENSES_KEY, JSON.stringify(expenses)),
          AsyncStorage.setItem(INCOME_KEY, income.toString()),
          AsyncStorage.setItem(USER_NAME_KEY, userName)
        ]);
      } catch (e) {
        console.error('Failed to save data to storage', e);
      }
    };
    
    // Only save if we aren't in the middle of loading (to avoid overwriting with empty stuff)
    if (!loading) saveData();
  }, [expenses, income, userName, loading]);

  // --- ACTIONS ---
  // These are the functions that components will call to modify data

  const addExpense = (expense) => {
    // I'm using Date.now() as a quick way to get a unique ID for every new expense
    setExpenses(prev => [{ ...expense, id: Date.now().toString() }, ...prev]);
  };

  const updateExpense = (updatedExpense) => {
    // Finds the old expense by ID and replaces it with the new details
    setExpenses(prev => prev.map(item => item.id === updatedExpense.id ? updatedExpense : item));
  };

  const deleteExpense = (id) => {
    // Keeps everything EXCEPT the one we want to remove
    setExpenses(prev => prev.filter(item => item.id !== id));
  };

  const setIncome = (value) => {
    setIncomeState(Number(value));
  };

  // This runs when the user finishes the setup/onboarding screens
  const completeOnboarding = async (name) => {
    try {
      await AsyncStorage.setItem(ONBOARDING_KEY, 'true');
      if (name) {
        await AsyncStorage.setItem(USER_NAME_KEY, name);
        setUserNameState(name);
      }
      setIsFirstLaunch(false);
    } catch (e) {
      console.error('Could not save onboarding status', e);
    }
  };

  // A reset button—mostly for testing or if the user wants to start over from scratch
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

  // --- CALCULATIONS ---
  // Calculating these here so I don't have to repeat the math in every screen.
  // This makes the UI code much cleaner.
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

/**
 * useExpenses Hook
 * This is what we use in our screens to grab the expense data and functions.
 * I kept this here so we don't need a separate file for a tiny hook.
 */
export const useExpenses = () => {
  const context = useContext(ExpenseContext);
  if (!context) {
    throw new Error('useExpenses must be used within an ExpenseProvider. Check your App.js!');
  }
  return context;
};
