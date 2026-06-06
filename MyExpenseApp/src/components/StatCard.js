import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { Spacing, Radius, Shadow } from '../constants/spacing';

const StatCard = ({ title, amount, subtitle, type = 'primary' }) => {
  const { theme } = useTheme();

  return (
    <View style={[
      styles.container, 
      { backgroundColor: theme.bgBrand },
      Shadow.md
    ]}>
      <Text style={[styles.title, { color: theme.textOnBrand, opacity: 0.8 }]}>{title}</Text>
      <Text style={[styles.amount, { color: theme.textInverse }]}>
        ${Number(amount).toLocaleString(undefined, { minimumFractionDigits: 2 })}
      </Text>
      {subtitle && (
        <Text style={[styles.subtitle, { color: theme.textInverse, opacity: 0.9 }]}>
          {subtitle}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: Spacing.xl,
    borderRadius: Radius.card,
    marginHorizontal: Spacing.lg,
    marginTop: Spacing.md,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: Spacing.xs,
  },
  amount: {
    fontSize: 32,
    fontWeight: '800',
    marginBottom: Spacing.sm,
  },
  subtitle: {
    fontSize: 13,
    fontWeight: '500',
  },
});

export default StatCard;
