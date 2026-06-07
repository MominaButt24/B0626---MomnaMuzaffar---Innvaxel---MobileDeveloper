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
import { useExpenses } from '../context/ExpenseContext';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

/**
 * OnboardingScreen: The first screen a new user sees.
 * Branded as "SpendWise" to match the splash screen.
 */
const OnboardingScreen = () => {
  const { theme, isDarkMode } = useTheme();
  const { completeOnboarding } = useExpenses(); 
  const [name, setName] = useState('');

  const handleGetStarted = () => {
    if (!name.trim()) {
      alert('Please enter your name to continue.');
      return;
    }
    completeOnboarding(name.trim());
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.bgPrimary }]}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {/* Visual Illustration Area */}
          <View style={styles.imageContainer}>
            <View style={[styles.circle, { backgroundColor: theme.bgSecondary, width: width * 0.7, height: width * 0.7, borderRadius: (width * 0.7) / 2 }]}>
              <View style={[styles.innerCircle, { backgroundColor: theme.bgBrand, width: width * 0.45, height: width * 0.45, borderRadius: (width * 0.45) / 2 }]}>
                <Ionicons name="wallet-outline" size={width * 0.2} color="#FFFFFF" />
              </View>
            </View>
          </View>

          {/* Welcome Text */}
          <View style={styles.textSection}>
            <Text style={[styles.title, { color: theme.textPrimary }]}>
              Welcome to{"\n"}SpendWise
            </Text>
            <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
              What should I call you?
            </Text>
          </View>

          {/* Name Input Field */}
          <View style={styles.inputWrapper}>
            <View style={[styles.inputContainer, { backgroundColor: isDarkMode ? '#1E222E' : '#F8FAFC' }]}>
              <Ionicons name="person-outline" size={20} color={theme.textMuted} style={{ marginRight: 12 }} />
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

          {/* Bottom Button */}
          <View style={styles.footer}>
            <TouchableOpacity 
              style={[styles.button, { backgroundColor: theme.bgBrand }]} 
              onPress={handleGetStarted}
              activeOpacity={0.8}
            >
              <Text style={styles.buttonText}>Get Started</Text>
              <Ionicons name="arrow-forward" size={20} color="#FFFFFF" style={{ marginLeft: 8 }} />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { flexGrow: 1, padding: Spacing.xl, alignItems: 'center', justifyContent: 'center' },
  imageContainer: { marginBottom: Spacing.xl, justifyContent: 'center', alignItems: 'center' },
  circle: { justifyContent: 'center', alignItems: 'center' },
  innerCircle: { justifyContent: 'center', alignItems: 'center', elevation: 10, shadowColor: '#000', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.1, shadowRadius: 20 },
  textSection: { alignItems: 'center', marginBottom: Spacing.xl },
  title: { fontSize: 28, fontWeight: '800', textAlign: 'center', marginBottom: Spacing.sm, lineHeight: 36 },
  subtitle: { fontSize: 18, fontWeight: '600', textAlign: 'center' },
  inputWrapper: { width: '100%', marginBottom: Spacing.xxl },
  inputContainer: { flexDirection: 'row', alignItems: 'center', height: 60, borderRadius: Radius.lg, paddingHorizontal: Spacing.lg, borderWidth: 1, borderColor: 'rgba(0,0,0,0.05)' },
  input: { flex: 1, fontSize: 18, fontWeight: '600' },
  footer: { width: '100%', marginTop: 'auto' },
  button: { height: 60, borderRadius: Radius.lg, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', elevation: 5, shadowColor: '#3B82F6', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 10 },
  buttonText: { color: '#FFFFFF', fontSize: 18, fontWeight: '700' },
});

export default OnboardingScreen;
