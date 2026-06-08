/**
 * haptics.js
 * 
 * This utility handles the physical "vibration" feedback of the app.
 * It's subtle but makes a huge difference—it makes buttons feel like 
 * they are actually being pressed and confirms when an action (like 
 * saving or deleting) was successful.
 */

import * as Haptics from 'expo-haptics';
import { Platform } from 'react-native';

export const triggerHaptic = (type = 'light') => {
  // We check for Web because haptics don't exist in a browser
  if (Platform.OS === 'web') return;

  switch (type) {
    case 'success':
      // The "Ta-da!" of vibrations—used for successful saves
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      break;
    case 'error':
      // A distinct double-pulse to warn the user something went wrong
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      break;
    case 'warning':
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
      break;
    case 'heavy':
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
      break;
    case 'medium':
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      break;
    default:
      // A tiny, soft tap—great for small UI interactions
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      break;
  }
};
