/**
 * CustomAlert.js
 * 
 * Standard system alerts look a bit boring and don't match the app's theme.
 * I created this component to have full control over how popups look.
 * 
 * It supports different 'types' (success, error, warning) and automatically 
 * triggers the right vibration (haptic) so users "feel" the alert.
 */

import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, Animated, Dimensions } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { Spacing, Radius, Shadow } from '../constants/spacing';
import { FontSize, FontWeight } from '../constants/typography';
import { Ionicons } from '@expo/vector-icons';
import { triggerHaptic } from '../utils/haptics';

const { width } = Dimensions.get('window');

const CustomAlert = ({ 
  visible, 
  title, 
  message, 
  onClose, 
  onConfirm, 
  confirmText = "OK", 
  cancelText = "Cancel",
  type = "info"
}) => {
  const { theme, isDarkMode } = useTheme();
  
  // Using an Animated value for a smooth "springy" entrance
  const [scaleValue] = React.useState(new Animated.Value(0));

  React.useEffect(() => {
    if (visible) {
      // Whenever the alert pops up, give the user a little physical feedback
      triggerHaptic(type);

      // Simple spring animation to make it pop out nicely
      Animated.spring(scaleValue, {
        toValue: 1,
        friction: 8,
        useNativeDriver: true,
      }).start();
    } else {
      // Reset scale when hidden
      scaleValue.setValue(0);
    }
  }, [visible, type]);

  if (!visible) return null;

  // Helper to pick the right icon and color based on what's happening
  const getIcon = () => {
    switch (type) {
      case 'success': return { name: 'checkmark-circle', color: theme.success };
      case 'error': return { name: 'close-circle', color: theme.danger };
      case 'warning': return { name: 'warning', color: theme.warning };
      default: return { name: 'information-circle', color: theme.info || '#3B82F6' };
    }
  };

  const icon = getIcon();

  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.overlay}>
        <Animated.View style={[
          styles.alertContainer, 
          { backgroundColor: theme.cardBg, transform: [{ scale: scaleValue }] },
          Shadow.md
        ]}>
          <View style={styles.content}>
            {/* Big icon at the top so the user immediately knows the status */}
            <Ionicons name={icon.name} size={50} color={icon.color} style={styles.icon} />
            <Text style={[styles.title, { color: theme.textPrimary }]}>{title}</Text>
            <Text style={[styles.message, { color: theme.textSecondary }]}>{message}</Text>
          </View>

          <View style={[styles.buttonRow, { borderTopColor: isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' }]}>
            {/* If we have a confirm action, show a 'Cancel' button alongside it */}
            {onConfirm && (
              <TouchableOpacity 
                style={[styles.button, styles.cancelButton, { borderRightColor: isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' }]} 
                onPress={() => {
                  triggerHaptic('light');
                  onClose();
                }}
              >
                <Text style={[styles.buttonText, { color: theme.textSecondary }]}>{cancelText}</Text>
              </TouchableOpacity>
            )}
            
            {/* The primary action button */}
            <TouchableOpacity 
              style={styles.button} 
              onPress={() => {
                triggerHaptic('medium');
                if (onConfirm) onConfirm();
                else onClose();
              }}
            >
              <Text style={[styles.buttonText, { color: theme.textBrand, fontWeight: FontWeight.bold }]}>
                {confirmText}
              </Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)', // Dim the background to focus on the alert
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.xl,
  },
  alertContainer: {
    width: '100%',
    maxWidth: 320,
    borderRadius: Radius.xl,
    overflow: 'hidden',
  },
  content: {
    padding: Spacing.xl,
    alignItems: 'center',
  },
  icon: {
    marginBottom: Spacing.md,
  },
  title: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.bold,
    textAlign: 'center',
    marginBottom: Spacing.sm,
  },
  message: {
    fontSize: FontSize.base,
    textAlign: 'center',
    lineHeight: 22,
  },
  buttonRow: {
    flexDirection: 'row',
    borderTopWidth: 1,
  },
  button: {
    flex: 1,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelButton: {
    borderRightWidth: 1,
  },
  buttonText: {
    fontSize: FontSize.base,
  },
});

export default CustomAlert;
