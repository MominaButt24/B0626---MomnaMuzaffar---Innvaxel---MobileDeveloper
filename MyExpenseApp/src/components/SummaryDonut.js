import React from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';
import Svg, { G, Circle } from 'react-native-svg';
import { useTheme } from '../context/ThemeContext';

const { width } = Dimensions.get('window');
const PI = Math.PI;

const SummaryDonut = ({ data, total }) => {
  const { theme, isDarkMode } = useTheme();
  
  if (!data || data.length === 0 || total === 0) return null;

  const size = width * 0.65;
  const strokeWidth = 30;
  const center = size / 2;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * PI * radius;

  let currentOffset = 0;

  return (
    <View style={styles.container}>
      <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <G rotation="-90" origin={`${center}, ${center}`}>
          {/* Background Track */}
          <Circle
            cx={center}
            cy={center}
            r={radius}
            stroke={isDarkMode ? 'rgba(255,255,255,0.05)' : '#F1F5F9'}
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          
          {/* Segments */}
          {data.map((item) => {
            const percentage = (item.amount / total) * 100;
            const strokeDashoffset = circumference - (circumference * percentage) / 100;
            const rotationOffset = (currentOffset / total) * 360;
            currentOffset += item.amount;

            return (
              <Circle
                key={item.category}
                cx={center}
                cy={center}
                r={radius}
                stroke={item.color}
                strokeWidth={strokeWidth}
                strokeDasharray={`${circumference} ${circumference}`}
                strokeDashoffset={strokeDashoffset}
                fill="transparent"
                transform={`rotate(${rotationOffset}, ${center}, ${center})`}
              />
            );
          })}
        </G>
      </Svg>
      
      {/* Center Label */}
      <View style={styles.centerText}>
        <Text style={[styles.label, { color: theme.textSecondary }]}>Total</Text>
        <Text style={[styles.totalAmount, { color: theme.textPrimary }]}>
          ${total > 9999 ? (total/1000).toFixed(1) + 'k' : Math.round(total)}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerText: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  totalAmount: {
    fontSize: 24,
    fontWeight: '800',
  }
});

export default SummaryDonut;
