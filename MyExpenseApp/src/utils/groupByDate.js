/**
 * groupByDate.js
 * 
 * This utility is what makes the History screen look organized. 
 * Instead of one giant list, it groups expenses by day, so you 
 * see headers like "Today", "Yesterday", or "Oct 12, 2023".
 * 
 * It converts a flat array into a format that the React Native 
 * SectionList component loves.
 */

export const groupExpensesByDate = (expenses) => {
  // We use reduce to bucket the expenses by their date string
  const groups = expenses.reduce((groups, expense) => {
    const date = new Date(expense.date);
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    let title = '';
    
    // We check if the date is Today or Yesterday for a better user experience
    if (date.toDateString() === today.toDateString()) {
      title = 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      title = 'Yesterday';
    } else {
      // Otherwise, we just format it as a standard date
      title = date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
    }

    // If this date "bucket" doesn't exist yet, create it
    if (!groups[title]) {
      groups[title] = [];
    }
    groups[title].push(expense);
    return groups;
  }, {});

  // SectionList needs an array of objects with 'title' and 'data' keys
  return Object.keys(groups).map((date) => {
    return {
      title: date,
      data: groups[date],
    };
  });
};
