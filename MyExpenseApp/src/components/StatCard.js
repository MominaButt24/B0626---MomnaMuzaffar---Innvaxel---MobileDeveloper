import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { Spacing, Radius, Shadow } from '../constants/spacing';
import { FontSize, FontWeight } from '../constants/typography';
import { Ionicons } from '@expo/vector-icons';
import { formatCurrency } from '../utils/formatCurrency';

/**
 * StatCard component: Standardized with constants.
 * The card color is now adaptable to the active theme while maintaining focus.
 */
const StatCard = ({ title, amount = 0, income = 0, expenses = 0, onMenuPress }) => {
  const { theme } = useTheme();

  const safeAmount = Number(amount) || 0;
  const safeIncome = Number(income) || 0;
  const safeExpenses = Number(expenses) || 0;

  return (
    <View style={[
      styles.card, 
      { backgroundColor: theme.bgBrandElevated },
      Shadow.md
    ]}>
      <View style={styles.topRow}>
        <Text style={[styles.cardLabel, { color: theme.textInverse, opacity: 0.8 }]}>{title}</Text>
        <TouchableOpacity onPress={onMenuPress} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
          <Ionicons name="ellipsis-horizontal" size={FontSize.lg} color="rgba(255,255,255,0.6)" />
        </TouchableOpacity>
      </View>

      <View style={styles.balanceSection}>
        <Text style={[styles.balanceText, { color: theme.textInverse }]}>
          {formatCurrency(safeAmount)}
        </Text>
      </View>

      <View style={styles.footerSection}>
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <View style={styles.statHeader}>
              <View style={[styles.iconCircle, { backgroundColor: '#3B82F6' }]}>
                <Ionicons name="arrow-down" size={FontSize.xs} color="white" />
              </View>
              <Text style={styles.statLabel}>INCOME</Text>
            </View>
            <Text style={styles.statValue}>{formatCurrency(safeIncome)}</Text>
          </View>

          <View style={[styles.statItem, { marginLeft: Spacing.xl }]}>
            <View style={styles.statHeader}>
              <View style={[styles.iconCircle, { backgroundColor: theme.danger }]}>
                <Ionicons name="arrow-up" size={FontSize.xs} color="white" />
              </View>
              <Text style={styles.statLabel}>EXPENSES</Text>
            </View>
            <Text style={styles.statValue}>{formatCurrency(safeExpenses)}</Text>
          </View>
        </View>

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
    fontSize: FontSize.sm,
    fontWeight: FontWeight.semibold,
    textTransform: 'capitalize',
  },
  balanceText: {
    fontSize: FontSize.xxl,
    fontWeight: FontWeight.bold,
    marginTop: Spacing.xs,
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
    marginBottom: Spacing.xs,
  },
  iconCircle: {
    width: 18,
    height: 18,
    borderRadius: Radius.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.xs,
  },
  statLabel: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: FontSize.xs,
    fontWeight: FontWeight.bold,
    letterSpacing: 0.5,
  },
  statValue: {
    color: '#FFFFFF',
    fontSize: FontSize.base,
    fontWeight: FontWeight.bold,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  circle: {
    width: 28,
    height: 28,
    borderRadius: Radius.lg,
  },
});

export default StatCard;
