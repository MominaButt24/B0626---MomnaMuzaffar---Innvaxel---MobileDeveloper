/**
 * Validators for Expense Entry
 * Keeping these separate allows for easy unit testing and reuse.
 */

export const validateExpense = (data) => {
  const errors = {};

  if (!data.title || data.title.trim() === '') {
    errors.title = 'Title is required';
  } else if (data.title.trim().length < 3) {
    errors.title = 'Title must be at least 3 characters';
  }

  const amountNum = parseFloat(data.amount);
  if (!data.amount || isNaN(amountNum)) {
    errors.amount = 'Valid amount is required';
  } else if (amountNum <= 0) {
    errors.amount = 'Amount must be greater than zero';
  }

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
