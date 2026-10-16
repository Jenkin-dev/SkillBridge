import { Feather, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { Path } from "react-native-svg";

import LogoSvg from "../../assets/images/logo.svg";

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const isEmailValid = (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim());
  const isFormValid = isEmailValid(email) && password.trim().length > 0;

  const handleLogin = () => {
    // Authenticate logic goes here
    router.replace("/(tabs)");
  };

  const handleGoogleSignIn = () => {
    // Google Auth logic
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          style={styles.container}
        >
          {/* Top Header: Back Arrow & Center Logo */}
          <View style={styles.header}>
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

          {/* Title */}
          <Text style={styles.title}>Welcome Back!</Text>

          {/* Form Fields */}
          <View style={styles.form}>
            {/* Email Field */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email Address</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter email address"
                placeholderTextColor="#A396A1"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>

            {/* Password Field */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Password</Text>
              <View style={styles.passwordContainer}>
                <TextInput
                  style={[styles.input, styles.passwordInput]}
                  placeholder="Enter password"
                  placeholderTextColor="#A396A1"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                />
                <TouchableOpacity
                  onPress={() => setShowPassword((prev) => !prev)}
                  hitSlop={12}
                  style={styles.eyeIcon}
                >
                  <Feather
                    name={showPassword ? "eye" : "eye-off"}
                    size={20}
                    color="#1C101B"
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Forgot Password */}
            <TouchableOpacity
              onPress={() => router.push("/forgot-password")}
              style={styles.forgotPasswordButton}
            >
              <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>

            {/* Log in Button */}
            <TouchableOpacity
              onPress={handleLogin}
              disabled={!isFormValid}
              activeOpacity={isFormValid ? 0.85 : 1}
              style={[
                styles.loginButton,
                isFormValid ? styles.buttonActive : styles.buttonDisabled,
              ]}
            >
              <Text
                style={[
                  styles.loginButtonText,
                  !isFormValid && styles.buttonTextDisabled,
                ]}
              >
                Log In
              </Text>
            </TouchableOpacity>
            {/* Divider */}
            <View style={styles.dividerContainer}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>or continue with</Text>
              <View style={styles.dividerLine} />
            </View>

            {/* Google Sign In Button */}
            <TouchableOpacity
              onPress={handleGoogleSignIn}
              activeOpacity={0.85}
              style={styles.googleButton}
            >
              <Svg
                width={20}
                height={20}
                viewBox="0 0 24 24"
                style={styles.googleIcon}
              >
                <Path
                  fill="#4285F4"
                  d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.65v3.03h3.88c2.27-2.09 3.665-5.17 3.665-9.12z"
                />
                <Path
                  fill="#34A853"
                  d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.03c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.27v3.13C3.26 21.36 7.34 24 12 24z"
                />
                <Path
                  fill="#FBBC05"
                  d="M5.28 14.29c-.25-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29V6.58H1.27C.46 8.2 0 10.04 0 12s.46 3.8 1.27 5.42l4.01-3.13z"
                />
                <Path
                  fill="#EA4335"
                  d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.64 1.27 6.58l4.01 3.13c.95-2.83 3.6-4.96 6.72-4.96z"
                />
              </Svg>
              <Text style={styles.googleButtonText}>Continue with Google</Text>
            </TouchableOpacity>

            {/* Bottom Sign Up Link */}
            <View style={styles.signupContainer}>
              <Text style={styles.signupText}>Don’t have an account? </Text>
              <TouchableOpacity onPress={() => router.push("/signup")}>
                <Text style={styles.signupLink}>Sign Up</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 48,
    marginTop: 1,
  },
  backButton: {
    width: 40,
    justifyContent: "center",
  },

  buttonActive: {
    backgroundColor: "#7A1380",
  },
  buttonDisabled: {
    backgroundColor: "#D1C2CE",
  },
  buttonTextDisabled: {
    color: "#8A7B87",
  },

  logoWrapper: {
    alignItems: "center",
    justifyContent: "center",
  },
  headerRightPlaceholder: {
    width: 40,
  },
  title: {
    fontSize: 26,
    fontWeight: "800",
    color: "#1C101B",
    marginTop: 28,
    marginBottom: 20,
    letterSpacing: -0.4,
  },
  form: {
    flex: 1,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1C101B",
    marginBottom: 8,
  },
  input: {
    height: 52,
    borderWidth: 1.2,
    borderColor: "#7A1380",
    borderRadius: 14,
    paddingHorizontal: 16,
    fontSize: 15,
    color: "#1C101B",
    backgroundColor: "#FFFFFF",
  },
  passwordContainer: {
    position: "relative",
    justifyContent: "center",
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
  forgotPasswordButton: {
    alignSelf: "flex-end",
    marginTop: 2,
    marginBottom: 26,
  },
  forgotPasswordText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#1C101B",
  },
  loginButton: {
    height: 52,
    backgroundColor: "#7A1380",
    borderRadius: 26,
    alignItems: "center",
    justifyContent: "center",
  },
  loginButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 22,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#3C303B",
  },
  dividerText: {
    marginHorizontal: 12,
    fontSize: 13,
    color: "#1C101B",
    fontWeight: "500",
  },
  googleButton: {
    height: 52,
    borderWidth: 1.2,
    borderColor: "#7A1380",
    borderRadius: 26,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
  },
  googleIcon: {
    marginRight: 10,
  },
  googleButtonText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#1C101B",
  },
  signupContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 24,
  },
  signupText: {
    fontSize: 14,
    color: "#1C101B",
  },
  signupLink: {
    fontSize: 14,
    fontWeight: "700",
    color: "#1C101B",
  },
});
