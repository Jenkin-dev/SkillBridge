import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

// Top center logo SVG
import { SafeAreaView } from "react-native-safe-area-context";
import LogoSvg from "../../assets/images/logo.svg";

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");

  const handleSendCode = () => {
    if (!email.trim()) return;
    // Route to your OTP verification screen
    // router.push({ pathname: '/verify-otp', params: { email } });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="dark-content" />

        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.container}
        >
          {/* Header Bar */}
          <View style={styles.headerBar}>
            <TouchableOpacity
              onPress={() => router.back()}
              hitSlop={12}
              style={styles.backButton}
            >
              <Ionicons name="chevron-back" size={28} color="#7A1380" />
            </TouchableOpacity>

            <View style={styles.logoWrapper}>
              <LogoSvg width={30} height={30} fill="#7A1380" />
            </View>

            <View style={styles.headerRightPlaceholder} />
          </View>

          {/* Heading Content */}
          <View style={styles.content}>
            <Text style={styles.title}>Reset Password</Text>
            <Text style={styles.subtitle}>
              Enter your registered email to receive a 6-digit verification code
            </Text>

            {/* Email Field */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email Address</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g. name@example.com"
                placeholderTextColor="#A894A6"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>

            {/* Submit CTA */}
            <TouchableOpacity
              onPress={handleSendCode}
              activeOpacity={0.85}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Send Verification Code</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FCECEB", // consistent brand light/pink background
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  headerBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 48,
    marginTop: 4,
  },
  backButton: {
    width: 40,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  logoWrapper: {
    alignItems: "center",
    justifyContent: "center",
  },
  headerRightPlaceholder: {
    width: 40,
  },
  content: {
    marginTop: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "800",
    color: "#1C101B",
    letterSpacing: -0.4,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: "#4B3F4B",
    lineHeight: 20,
    marginBottom: 24,
  },
  inputGroup: {
    marginBottom: 28,
  },
  label: {
    fontSize: 13,
    fontWeight: "700",
    color: "#1C101B",
    marginBottom: 8,
  },
  input: {
    height: 50,
    borderRadius: 12,
    borderWidth: 1.2,
    borderColor: "#7A1380",
    backgroundColor: "#FCECEB",
    paddingHorizontal: 16,
    fontSize: 15,
    color: "#1C101B",
  },
  button: {
    height: 52,
    borderRadius: 26,
    backgroundColor: "#7A1380",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#FFFFFF",
  },
});
