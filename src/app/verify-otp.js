import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
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

const OTP_LENGTH = 6;
const INITIAL_TIMER = 45;

export default function VerifyOtpScreen() {
  const router = useRouter();
  const { email } = useLocalSearchParams();

  const [otp, setOtp] = useState(new Array(OTP_LENGTH).fill(""));
  const [timer, setTimer] = useState(INITIAL_TIMER);
  const inputRefs = useRef([]);

  // Countdown timer logic
  useEffect(() => {
    let interval = null;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timer]);

  // Mask email e.g. ej****@gmail.com
  const maskEmail = (rawEmail) => {
    if (!rawEmail || !rawEmail.includes("@")) return "ej****@gmail.com";
    const [name, domain] = rawEmail.split("@");
    if (name.length <= 2) return `${name}****@${domain}`;
    return `${name.slice(0, 2)}****@${domain}`;
  };

  const handleChangeText = (text, index) => {
    const cleanedText = text.replace(/[^0-9]/g, "");
    const newOtp = [...otp];

    if (cleanedText.length > 1) {
      // Handles pasting full OTP
      const pasted = cleanedText.slice(0, OTP_LENGTH).split("");
      for (let i = 0; i < OTP_LENGTH; i++) {
        newOtp[i] = pasted[i] || "";
      }
      setOtp(newOtp);
      const nextIndex = Math.min(pasted.length, OTP_LENGTH - 1);
      inputRefs.current[nextIndex]?.focus();
      return;
    }

    newOtp[index] = cleanedText;
    setOtp(newOtp);

    // Auto-advance to next box
    if (cleanedText && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };
  const isOtpComplete = otp.every((digit) => digit.trim().length === 1);
  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleResend = () => {
    if (timer === 0) {
      setTimer(INITIAL_TIMER);
      // Trigger API call to resend OTP code
    }
  };

  const handleVerify = () => {
    const code = otp.join("");
    if (code.length < OTP_LENGTH) return;

    // Navigate to set-new-password screen
    // router.push({ pathname: '/reset-new-password', params: { email, code } });
  };

  const formatTimer = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="dark-content" />

        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.container}
        >
          {/* Top Bar */}
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
            <Text style={styles.title}>Enter 6–digit Code</Text>
            <Text style={styles.subtitle}>
              We sent a code to {maskEmail(email)}
            </Text>

            {/* 6 Digit Input Boxes */}
            <View style={styles.otpRow}>
              {otp.map((digit, index) => (
                <TextInput
                  key={index}
                  ref={(ref) => (inputRefs.current[index] = ref)}
                  style={[styles.otpBox, digit ? styles.otpBoxFilled : null]}
                  value={digit}
                  onChangeText={(text) => handleChangeText(text, index)}
                  onKeyPress={(e) => handleKeyPress(e, index)}
                  keyboardType="number-pad"
                  maxLength={1}
                  selectTextOnFocus
                  textAlign="center"
                />
              ))}
            </View>

            {/* Resend Link & Timer */}
            <View style={styles.resendRow}>
              <Text style={styles.resendLabel}>Didn’t get code? </Text>
              <TouchableOpacity
                onPress={handleResend}
                disabled={timer > 0}
                hitSlop={8}
              >
                <Text
                  style={[
                    styles.resendAction,
                    timer === 0 && styles.resendActive,
                  ]}
                >
                  Resend {timer > 0 ? `(${formatTimer(timer)})` : ""}
                </Text>
              </TouchableOpacity>
            </View>

            {/* Verify CTA Button */}
            <TouchableOpacity
              onPress={handleVerify}
              disabled={!isOtpComplete}
              activeOpacity={isOtpComplete ? 0.85 : 1}
              style={[
                styles.button,
                isOtpComplete ? styles.buttonActive : styles.buttonDisabled,
              ]}
            >
              <Text
                style={[
                  styles.buttonText,
                  !isOtpComplete && styles.buttonTextDisabled,
                ]}
              >
                Verify & Continue
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
  buttonActive: {
    backgroundColor: "#7A1380",
  },
  buttonDisabled: {
    backgroundColor: "#f3efd2",
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
  otpRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  otpBox: {
    width: 46,
    height: 48,
    borderRadius: 8,
    borderWidth: 1.2,
    borderColor: "#7A1380",
    backgroundColor: "#FCECEB",
    fontSize: 18,
    fontWeight: "700",
    color: "#1C101B",
  },
  otpBoxFilled: {
    backgroundColor: "#FCECEB",
    borderColor: "#7A1380",
  },
  resendRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 32,
  },
  resendLabel: {
    fontSize: 14,
    color: "#1C101B",
    fontWeight: "500",
  },
  resendAction: {
    fontSize: 14,
    color: "#7A1380",
    fontWeight: "700",
  },
  resendActive: {
    textDecorationLine: "underline",
  },
  button: {
    height: 52,
    borderRadius: 26,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonActive: {
    backgroundColor: "#7A1380",
  },
  buttonDisabled: {
    backgroundColor: "#D1C2CE", // matches the muted disabled state used across the app
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  buttonTextDisabled: {
    color: "#8A7B87", // soft readable contrast against the disabled gray
  },
});
