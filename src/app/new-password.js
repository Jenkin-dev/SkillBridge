import { Feather, Ionicons } from "@expo/vector-icons";
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
import { SafeAreaView } from "react-native-safe-area-context";

import LogoSvg from "../../assets/images/logo.svg";

export default function NewPasswordScreen() {
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Validation: both fields non-empty, matching, and min 6 characters
  const isFormValid =
    password.trim().length >= 6 &&
    confirmPassword.trim().length >= 6 &&
    password === confirmPassword;

  const handleResetPassword = () => {
    if (!isFormValid) return;

    // Reset password API logic goes here

    // Route to dashboard or login
    router.replace("/(tabs)");
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="dark-content" />

        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          style={styles.container}
        >
          {/* Top Bar: Back Arrow & Center Logo */}
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
            <Text style={styles.title}>Create New Password</Text>
            <Text style={styles.subtitle}>
              Set a new password for your account.
            </Text>

            {/* New Password Field */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>New password</Text>
              <View style={styles.passwordContainer}>
                <TextInput
                  style={[styles.input, styles.passwordInput]}
                  placeholder="Enter new password"
                  placeholderTextColor="#A894A6"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                  autoCorrect={false}
                />
                <TouchableOpacity
                  onPress={() => setShowPassword((prev) => !prev)}
                  hitSlop={12}
                  style={styles.eyeIcon}
                >
                  <Feather
                    name={showPassword ? "eye" : "eye-off"}
                    size={20}
                    color="#4B3F4B"
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Confirm New Password Field */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Confirm New Password</Text>
              <View style={styles.passwordContainer}>
                <TextInput
                  style={[styles.input, styles.passwordInput]}
                  placeholder="Re-enter new password"
                  placeholderTextColor="#A894A6"
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  secureTextEntry={!showConfirmPassword}
                  autoCapitalize="none"
                  autoCorrect={false}
                />
                <TouchableOpacity
                  onPress={() => setShowConfirmPassword((prev) => !prev)}
                  hitSlop={12}
                  style={styles.eyeIcon}
                >
                  <Feather
                    name={showConfirmPassword ? "eye" : "eye-off"}
                    size={20}
                    color="#4B3F4B"
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Submit Button */}
            <TouchableOpacity
              onPress={handleResetPassword}
              disabled={!isFormValid}
              activeOpacity={isFormValid ? 0.85 : 1}
              style={[
                styles.button,
                isFormValid ? styles.buttonActive : styles.buttonDisabled,
              ]}
            >
              <Text
                style={[
                  styles.buttonText,
                  !isFormValid && styles.buttonTextDisabled,
                ]}
              >
                Reset Password & Log in
              </Text>
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
    backgroundColor: "#FCECEB",
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
    marginBottom: 28,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 13,
    fontWeight: "700",
    color: "#1C101B",
    marginBottom: 8,
  },
  passwordContainer: {
    position: "relative",
    justifyContent: "center",
  },
  input: {
    height: 52,
    borderRadius: 14,
    borderWidth: 1.2,
    borderColor: "#7A1380",
    backgroundColor: "#FCECEB",
    paddingHorizontal: 16,
    fontSize: 15,
    color: "#1C101B",
  },
  passwordInput: {
    paddingRight: 48,
  },
  eyeIcon: {
    position: "absolute",
    right: 16,
    height: "100%",
    justifyContent: "center",
  },
  button: {
    height: 52,
    borderRadius: 26,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 16,
  },
  buttonActive: {
    backgroundColor: "#7A1380",
  },
  buttonDisabled: {
    backgroundColor: "#D1C2CE",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  buttonTextDisabled: {
    color: "#8A7B87",
  },
});
