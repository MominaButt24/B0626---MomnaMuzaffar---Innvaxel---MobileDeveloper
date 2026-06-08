/**
 * validators.js
 * 
 * We don't want the user to save "junk" data, like an expense with 
 * no name or a zero price. This utility checks the form before 
 * it ever reaches the database.
 */

export const validateExpense = (data) => {
  const errors = {};

  // Check if the title is empty or too short
  if (!data.title || data.title.trim() === '') {
    errors.title = 'Title is required';
  } else if (data.title.trim().length < 3) {
    errors.title = 'Title must be at least 3 characters';
  }

  // Make sure the amount is actually a positive number
  const amountNum = parseFloat(data.amount);
  if (!data.amount || isNaN(amountNum)) {
    errors.amount = 'Valid amount is required';
  } else if (amountNum <= 0) {
    errors.amount = 'Amount must be greater than zero';
  }

  // Category and Date are mandatory too
  if (!data.category) {
    errors.category = 'Please select a category';
  }

  if (!data.date) {
    errors.date = 'Date is required';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
