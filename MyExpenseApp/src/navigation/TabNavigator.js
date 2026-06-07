import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { Shadow } from '../constants/spacing';
import { useNavigation } from '@react-navigation/native';

import HomeScreen from '../screens/HomeScreen';
import ExpensesScreen from '../screens/ExpensesScreen';
import SummaryScreen from '../screens/SummaryScreen';
import FAB from '../components/FAB';

const Tab = createBottomTabNavigator();

const Placeholder = () => null;

const TabNavigator = () => {
  const { theme, isDarkMode } = useTheme();
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1 }}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: isDarkMode ? '#1E222E' : '#FFFFFF',
            position: 'absolute',
            bottom: 25,
            left: 20,
            right: 20,
            height: 70,
            borderRadius: 35,
            borderTopWidth: 0,
            paddingBottom: 0,
            ...Shadow.md,
            elevation: 5,
          },
          // Centering items vertically within the tab bar
          tabBarItemStyle: {
            height: 70,
            justifyContent: 'center',
            alignItems: 'center',
          },
          tabBarActiveTintColor: theme.textBrand,
          tabBarInactiveTintColor: isDarkMode ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.2)',
        })}
      >
        <Tab.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{
            tabBarIcon: ({ color, focused }) => (
              <View style={styles.iconWrapper}>
                <Ionicons name={focused ? "home" : "home-outline"} size={26} color={color} />
                {focused && <View style={[styles.dot, { backgroundColor: color }]} />}
              </View>
            ),
          }}
        />
        <Tab.Screen 
          name="Expenses" 
          component={ExpensesScreen} 
          options={{
            tabBarIcon: ({ color, focused }) => (
              <View style={styles.iconWrapper}>
                <Ionicons name={focused ? "list" : "list-outline"} size={26} color={color} />
                {focused && <View style={[styles.dot, { backgroundColor: color }]} />}
              </View>
            ),
          }}
        />
        <Tab.Screen 
          name="Summary" 
          component={SummaryScreen} 
          options={{
            tabBarIcon: ({ color, focused }) => (
              <View style={styles.iconWrapper}>
                <Ionicons name={focused ? "pie-chart" : "pie-chart-outline"} size={26} color={color} />
                {focused && <View style={[styles.dot, { backgroundColor: color }]} />}
              </View>
            ),
          }}
        />
        
        {/* Placeholder slot to create space for the FAB on the extreme right */}
        <Tab.Screen 
          name="AddPlaceholder" 
          component={Placeholder} 
          options={{
            tabBarButton: () => <View style={{ flex: 1 }} />,
          }}
        />
      </Tab.Navigator>

      {/* FAB perfectly aligned with the rightmost slot */}
      <FAB onPress={() => navigation.navigate('AddExpense')} />
    </View>
  );
};

const styles = StyleSheet.create({
  iconWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    marginTop: 4,
    position: 'absolute',
    bottom: -12, // Positioned below the icon
  }
});

export default TabNavigator;
