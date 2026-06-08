/**
 * OnboardingScreen.js
 * 
 * This is the first-time user experience. It's designed to be clean and welcoming.
 * We collect the user's name here to personalize the dashboard, making the app 
 * feel more like a personal financial assistant rather than just a spreadsheet.
 */

import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Dimensions, 
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../context/ThemeContext';
import { Spacing, Radius } from '../constants/spacing';
import { FontSize, FontWeight } from '../constants/typography';
import { useExpenses } from '../context/ExpenseContext';
import { Ionicons } from '@expo/vector-icons';
import CustomAlert from '../components/CustomAlert';

const { width } = Dimensions.get('window');

const OnboardingScreen = () => {
  // Grabbing the theme and the function to save the user's name
  const { theme, isDarkMode } = useTheme();
  const { completeOnboarding } = useExpenses(); 
  const [name, setName] = useState('');
  const [alertVisible, setAlertVisible] = useState(false);

  const handleGetStarted = () => {
    // Basic check: don't let them in without a name!
    if (!name.trim()) {
      setAlertVisible(true);
      return;
    }
    // Tell the global state that we're officially done with the welcome tour
    completeOnboarding(name.trim());
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.bgPrimary }]}>
      {/* 
          KeyboardAvoidingView is crucial here so the input doesn't get 
          covered up when the keyboard opens on smaller phones.
      */}
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.flex}
      >
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          
          {/* 
              Visual Area: I used simple geometric shapes and a brand icon 
              to make the screen feel modern and high-end. 
          */}
          <View style={styles.imageContainer}>
            <View style={[styles.circle, { backgroundColor: theme.bgSecondary, width: width * 0.7, height: width * 0.7, borderRadius: (width * 0.7) / 2 }]}>
              <View style={[styles.innerCircle, { backgroundColor: theme.bgBrand, width: width * 0.45, height: width * 0.45, borderRadius: (width * 0.45) / 2 }]}>
                <Ionicons name="wallet-outline" size={width * 0.2} color="#FFFFFF" />
              </View>
            </View>
          </View>

          {/* Welcome Text Section */}
          <View style={styles.textSection}>
            <Text style={[styles.title, { color: theme.textPrimary }]}>
              Welcome to{"\n"}SpendWise
            </Text>
            <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
              What should I call you?
            </Text>
          </View>

          {/* Personalized Name Input */}
          <View style={styles.inputWrapper}>
            <View style={[styles.inputContainer, { backgroundColor: isDarkMode ? '#1E222E' : '#F8FAFC' }]}>
              <Ionicons name="person-outline" size={20} color={theme.textMuted} style={{ marginRight: Spacing.md }} />
              <TextInput
                style={[styles.input, { color: theme.textPrimary }]}
                placeholder="Enter your name"
                placeholderTextColor={theme.textMuted}
                value={name}
                onChangeText={setName}
                autoCorrect={false}
              />
            </View>
          </View>

          {/* The "Get Started" Button: Big, bright, and easy to hit */}
          <View style={styles.footer}>
            <TouchableOpacity 
              style={[styles.button, { backgroundColor: theme.bgBrand }]} 
              onPress={handleGetStarted}
              activeOpacity={0.8}
            >
              <Text style={styles.buttonText}>Get Started</Text>
              <Ionicons name="arrow-forward" size={20} color="#FFFFFF" style={{ marginLeft: Spacing.sm }} />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Nice custom popup if they forget to type their name */}
      <CustomAlert 
        visible={alertVisible}
        title="Whoops!"
        message="Please enter your name so we can personalize your experience."
        type="warning"
        onClose={() => setAlertVisible(false)}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  flex: { flex: 1 },
  scrollContent: { flexGrow: 1, padding: Spacing.xl, alignItems: 'center', justifyContent: 'center' },
  imageContainer: { marginBottom: Spacing.xl, justifyContent: 'center', alignItems: 'center' },
  circle: { justifyContent: 'center', alignItems: 'center' },
  innerCircle: { justifyContent: 'center', alignItems: 'center', elevation: 10, shadowColor: '#000', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.1, shadowRadius: 20 },
  textSection: { alignItems: 'center', marginBottom: Spacing.xl },
  title: { fontSize: FontSize.xxl, fontWeight: FontWeight.bold, textAlign: 'center', marginBottom: Spacing.sm, lineHeight: 36 },
  subtitle: { fontSize: FontSize.md, fontWeight: FontWeight.semibold, textAlign: 'center' },
  inputWrapper: { width: '100%', marginBottom: Spacing.xxl },
  inputContainer: { flexDirection: 'row', alignItems: 'center', height: 60, borderRadius: Radius.lg, paddingHorizontal: Spacing.lg, borderWidth: 1, borderColor: 'rgba(0,0,0,0.05)' },
  input: { flex: 1, fontSize: FontSize.md, fontWeight: FontWeight.semibold },
  footer: { width: '100%', marginTop: 'auto' },
  button: { height: 60, borderRadius: Radius.lg, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', elevation: 5, shadowColor: '#3B82F6', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 10 },
  buttonText: { color: '#FFFFFF', fontSize: FontSize.base, fontWeight: FontWeight.bold },
});

export default OnboardingScreen;
