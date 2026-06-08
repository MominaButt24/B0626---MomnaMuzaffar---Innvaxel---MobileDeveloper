import * as FileSystem from 'expo-file-system/legacy';
import * as Sharing from 'expo-sharing';
import { Alert } from 'react-native';

/**
 * Utility to export expenses to a CSV file.
 * Uses the legacy API path as recommended for Expo 54 compatibility.
 */
export const exportExpensesToCSV = async (expenses) => {
  if (!expenses || expenses.length === 0) {
    Alert.alert("No Data", "Add some expenses first to export them.");
    return;
  }

  let csvContent = "Date,Title,Category,Amount,Notes\n";
  expenses.forEach(item => {
    const formattedDate = new Date(item.date).toLocaleDateString();
    const row = [
      formattedDate,
      `"${item.title.replace(/"/g, '""')}"`,
      `"${item.category}"`,
      item.amount,
      `"${(item.notes || '').replace(/"/g, '""')}"`
    ].join(",");
    csvContent += row + "\n";
  });

  const filename = `SpendWise_Export_${new Date().toISOString().split('T')[0]}.csv`;
  const fileUri = FileSystem.cacheDirectory + filename;

  try {
    // Write using the legacy method
    await FileSystem.writeAsStringAsync(fileUri, csvContent, {
      encoding: 'utf8',
    });

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
