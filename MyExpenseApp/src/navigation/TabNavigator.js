import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { Shadow } from '../constants/spacing';
import { useNavigation } from '@react-navigation/native';

import HomeScreen from '../screens/HomeScreen';
import ExpensesScreen from '../screens/ExpensesScreen';
import SummaryScreen from '../screens/SummaryScreen';
import FAB from '../components/FAB';

const Tab = createBottomTabNavigator();

const Placeholder = () => <View />;

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
            backgroundColor: '#1E222E', // Solid Dark Navy for the bar
            position: 'absolute',
            bottom: 25,
            left: 20,
            right: 20,
            height: 65,
            borderRadius: 32,
            borderTopWidth: 0,
            paddingBottom: 0,
            ...Shadow.md,
            elevation: 10,
          },
          tabBarActiveTintColor: '#FFFFFF',
          tabBarInactiveTintColor: 'rgba(255,255,255,0.4)',
        })}
      >
        <Tab.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{
            tabBarIcon: ({ color, focused }) => (
              <View style={styles.iconWrapper}>
                <Ionicons name={focused ? "home" : "home-outline"} size={24} color={color} />
                {focused && <View style={styles.dot} />}
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
                <Ionicons name={focused ? "list" : "list-outline"} size={24} color={color} />
                {focused && <View style={styles.dot} />}
              </View>
            ),
          }}
        />
        
        {/* Empty middle tab to leave space for the FAB */}
        <Tab.Screen 
          name="AddPlaceholder" 
          component={Placeholder} 
          options={{
            tabBarButton: () => <View style={{ flex: 1 }} />,
          }}
        />
        
        <Tab.Screen 
          name="Summary" 
          component={SummaryScreen} 
          options={{
            tabBarIcon: ({ color, focused }) => (
              <View style={styles.iconWrapper}>
                <Ionicons name={focused ? "pie-chart" : "pie-chart-outline"} size={24} color={color} />
                {focused && <View style={styles.dot} />}
              </View>
            ),
          }}
        />
        <Tab.Screen 
          name="Profile" 
          component={Placeholder}
          options={{
            tabBarIcon: ({ color, focused }) => (
              <View style={styles.iconWrapper}>
                <Ionicons name={focused ? "person" : "person-outline"} size={24} color={color} />
                {focused && <View style={styles.dot} />}
              </View>
            ),
          }}
        />
      </Tab.Navigator>

      {/* Global FAB sitting perfectly in the center hole */}
      <FAB onPress={() => navigation.navigate('AddExpense')} />
    </View>
  );
};

const styles = StyleSheet.create({
  iconWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 8,
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#FFFFFF',
    marginTop: 4,
  }
});

export default TabNavigator;
