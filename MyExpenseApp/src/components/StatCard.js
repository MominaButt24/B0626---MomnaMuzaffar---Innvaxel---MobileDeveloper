import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { Spacing, Radius, Shadow } from '../constants/spacing';
import { Ionicons } from '@expo/vector-icons';

/**
 * StatCard component updated to follow the Sky Blue / Dream theme.
 * The card color is now adaptable to the active theme while maintaining focus.
 */
const StatCard = ({ title, amount = 0, income = 0, expenses = 0 }) => {
  const { theme } = useTheme();

  const safeAmount = Number(amount) || 0;
  const safeIncome = Number(income) || 0;
  const safeExpenses = Number(expenses) || 0;

  return (
    <View style={[
      styles.card, 
      { backgroundColor: theme.bgBrandElevated }, // Adaptable Deep Blue (Sky Dark or Midnight Blue)
      Shadow.md
    ]}>
      {/* Top Row: Title and Menu Icon */}
      <View style={styles.topRow}>
        <Text style={[styles.cardLabel, { color: 'rgba(255,255,255,0.8)' }]}>{title}</Text>
        <Ionicons name="ellipsis-horizontal" size={20} color="rgba(255,255,255,0.6)" />
      </View>

      {/* Middle Section: Main Balance Amount */}
      <View style={styles.balanceSection}>
        <Text style={[styles.balanceText, { color: '#FFFFFF' }]}>
          ${safeAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
        </Text>
      </View>

      {/* Bottom Section: Income (Blue) and Expenses (Rose/Pink from image) */}
      <View style={styles.footerSection}>
        <View style={styles.statsRow}>
          {/* Income Stat */}
          <View style={styles.statItem}>
            <View style={styles.statHeader}>
              <View style={[styles.iconCircle, { backgroundColor: '#3B82F6' }]}>
                <Ionicons name="arrow-down" size={10} color="white" />
              </View>
              <Text style={styles.statLabel}>INCOME</Text>
            </View>
            <Text style={styles.statValue}>${safeIncome.toLocaleString(undefined, { minimumFractionDigits: 2 })}</Text>
          </View>

          {/* Expenses Stat */}
          <View style={[styles.statItem, { marginLeft: Spacing.xl }]}>
            <View style={styles.statHeader}>
              <View style={[styles.iconCircle, { backgroundColor: theme.danger }]}>
                <Ionicons name="arrow-up" size={10} color="white" />
              </View>
              <Text style={styles.statLabel}>EXPENSES</Text>
            </View>
            <Text style={styles.statValue}>${safeExpenses.toLocaleString(undefined, { minimumFractionDigits: 2 })}</Text>
          </View>
        </View>

        {/* Decorative branding elements from the image style */}
        <View style={styles.logoContainer}>
          <View style={[styles.circle, { backgroundColor: 'rgba(255,255,255,0.2)', marginRight: -12 }]} />
          <View style={[styles.circle, { backgroundColor: 'rgba(255,255,255,0.1)' }]} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: Spacing.xl,
    borderRadius: Radius.xxl,
    marginHorizontal: Spacing.lg,
    marginTop: Spacing.md,
    height: 195,
    justifyContent: 'space-between',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  balanceSection: {
    marginTop: -Spacing.xs,
  },
  cardLabel: {
    fontSize: 13,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  balanceText: {
    fontSize: 34,
    fontWeight: 'bold',
    marginTop: 4,
  },
  footerSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginTop: Spacing.sm,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statItem: {
    justifyContent: 'center',
  },
  statHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  iconCircle: {
    width: 18,
    height: 18,
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 6,
  },
  statLabel: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  statValue: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  circle: {
    width: 28,
    height: 28,
    borderRadius: 14,
  },
});

export default StatCard;
