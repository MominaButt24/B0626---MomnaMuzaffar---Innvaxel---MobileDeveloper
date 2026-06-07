/**
 * Utility to group a flat list of expenses by their date.
 * Returns an array of objects suitable for a SectionList: [{ title: 'Date', data: [...] }]
 */
export const groupExpensesByDate = (expenses) => {
  const groups = expenses.reduce((groups, expense) => {
    const date = new Date(expense.date);
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    let title = '';
    
    // Check if the date is Today, Yesterday, or a specific date
    if (date.toDateString() === today.toDateString()) {
      title = 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      title = 'Yesterday';
    } else {
      title = date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
    }

    if (!groups[title]) {
      groups[title] = [];
    }
    groups[title].push(expense);
    return groups;
  }, {});

  // Convert the object into an array of sections
  return Object.keys(groups).map((date) => {
    return {
      title: date,
      data: groups[date],
    };
  });
};
