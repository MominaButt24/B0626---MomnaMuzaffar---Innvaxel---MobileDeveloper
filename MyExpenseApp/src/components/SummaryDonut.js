/**
 * SummaryDonut.js
 * 
 * This is the visual star of the Summary screen. It's a custom-built SVG donut 
 * chart that shows the breakdown of expenses by category.
 * 
 * I used SVG (Circle and G components) here instead of a library to keep 
 * the app light and have total control over the math behind the segments.
 */

import React from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';
import Svg, { G, Circle } from 'react-native-svg';
import { useTheme } from '../context/ThemeContext';

const { width } = Dimensions.get('window');
const PI = Math.PI;

const SummaryDonut = ({ data, total }) => {
  const { theme, isDarkMode } = useTheme();
  
  // If there's no data, don't bother rendering anything
  if (!data || data.length === 0 || total === 0) return null;

  // Chart math: setting the size based on the screen width
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
          {/* 
              Background Track: This is the grey/dark ring that sits behind 
              the colored segments. 
          */}
          <Circle
            cx={center}
            cy={center}
            r={radius}
            stroke={isDarkMode ? 'rgba(255,255,255,0.05)' : '#F1F5F9'}
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          
          {/* 
              Colored Segments: We loop through the data and use 'strokeDashoffset' 
              to draw each slice of the pie based on its percentage of the total.
          */}
          {data.map((item) => {
            const percentage = (item.amount / total) * 100;
            const strokeDashoffset = circumference - (circumference * percentage) / 100;
            const rotationOffset = (currentOffset / total) * 360;
            
            // We increment the offset so the next segment starts where this one ends
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
      
      {/* 
          Center Label: Positioned absolutely in the middle of the hole 
          to show the grand total. 
      */}
      <View style={styles.centerText}>
        <Text style={[styles.label, { color: theme.textSecondary }]}>Total</Text>
        <Text style={[styles.totalAmount, { color: theme.textPrimary }]}>
          {/* If the number is huge, we abbreviate it (e.g., 10.5k) so it doesn't break the layout */}
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
