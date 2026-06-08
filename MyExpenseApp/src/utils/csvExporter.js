/**
 * csvExporter.js
 * 
 * This utility lets users take their data out of the app. It generates 
 * a CSV file (which you can open in Excel or Google Sheets) and 
 * triggers the phone's native sharing menu.
 * 
 * I used the legacy FileSystem API here to make sure it works 
 * smoothly with the specific version of Expo we are using.
 */

import * as FileSystem from 'expo-file-system/legacy';
import * as Sharing from 'expo-sharing';
import { Alert } from 'react-native';

export const exportExpensesToCSV = async (expenses) => {
  // Can't export nothing!
  if (!expenses || expenses.length === 0) {
    Alert.alert("No Data", "Add some expenses first to export them.");
    return;
  }

  // Creating the CSV header row
  let csvContent = "Date,Title,Category,Amount,Notes\n";
  
  // Looping through each expense to build the rows
  expenses.forEach(item => {
    const formattedDate = new Date(item.date).toLocaleDateString();
    
    // We wrap text in quotes and escape existing quotes so the CSV doesn't break
    const row = [
      formattedDate,
      `"${item.title.replace(/"/g, '""')}"`,
      `"${item.category}"`,
      item.amount,
      `"${(item.notes || '').replace(/"/g, '""')}"`
    ].join(",");
    
    csvContent += row + "\n";
  });

  // Create a unique filename with today's date
  const filename = `SpendWise_Export_${new Date().toISOString().split('T')[0]}.csv`;
  const fileUri = FileSystem.cacheDirectory + filename;

  try {
    // Save the string we built as an actual file in the app's cache
    await FileSystem.writeAsStringAsync(fileUri, csvContent, {
      encoding: 'utf8',
    });

    // Check if the phone actually supports sharing (like email or Airdrop)
    const isSharingAvailable = await Sharing.isAvailableAsync();
    if (isSharingAvailable) {
      await Sharing.shareAsync(fileUri, {
        mimeType: 'text/csv',
        dialogTitle: 'Export your expenses',
        UTI: 'public.comma-separated-values-text',
      });
    } else {
      Alert.alert("Sharing Unavailable", "Sharing is not supported on this device.");
    }
  } catch (error) {
    console.error("Export failed:", error);
    Alert.alert("Export Error", "Failed to generate CSV file.");
  }
};
