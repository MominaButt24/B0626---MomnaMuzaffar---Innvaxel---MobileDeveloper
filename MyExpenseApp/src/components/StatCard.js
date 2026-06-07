import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { Spacing, Radius, Shadow } from '../constants/spacing';
import { Ionicons } from '@expo/vector-icons';
import { formatCurrency } from '../utils/formatCurrency';

/**
 * StatCard component updated to follow the Sky Blue / Dream theme.
 * Uses formatCurrency utility for consistent formatting.
 * The menu icon triggers the budget update modal.
 */
const StatCard = ({ title, amount = 0, income = 0, expenses = 0, onMenuPress }) => {
  const { theme } = useTheme();

  return (
    <View style={[
      styles.card, 
      { backgroundColor: theme.bgBrandElevated }, // Adaptable to Sky Deep or Midnight Dark
      Shadow.md
    ]}>
      {/* Top Row: Title and Menu Icon */}
      <View style={styles.topRow}>
        <Text style={[styles.cardLabel, { color: 'rgba(255,255,255,0.8)' }]}>{title}</Text>
        <TouchableOpacity onPress={onMenuPress} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
          <Ionicons name="ellipsis-horizontal" size={20} color="rgba(255,255,255,0.6)" />
        </TouchableOpacity>
      </View>

      {/* Middle Section: Main Balance */}
      <View style={styles.balanceSection}>
        <Text style={[styles.balanceText, { color: '#FFFFFF' }]}>
          {formatCurrency(amount)}
        </Text>
      </View>

      {/* Bottom Section: Income and Expenses */}
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
            <Text style={styles.statValue}>{formatCurrency(income)}</Text>
          </View>

          {/* Expenses Stat */}
          <View style={[styles.statItem, { marginLeft: Spacing.xl }]}>
            <View style={styles.statHeader}>
              <View style={[styles.iconCircle, { backgroundColor: theme.danger }]}>
                <Ionicons name="arrow-up" size={10} color="white" />
              </View>
              <Text style={styles.statLabel}>EXPENSES</Text>
            </View>
            <Text style={styles.statValue}>{formatCurrency(expenses)}</Text>
          </View>
        </View>

        {/* Decorative branding elements */}
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
