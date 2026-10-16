import { Feather, Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  ScrollView,
  StatusBar,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SettingsScreen() {
  const router = useRouter();

  // Notification Toggles
  const [jobAlerts, setJobAlerts] = useState(true);
  const [weeklySummary, setWeeklySummary] = useState(true);

  // Security & Privacy Toggles
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
  const [recruiterNetwork, setRecruiterNetwork] = useState(true);

  const handleLogout = () => {
    Alert.alert("Log Out", "Are you sure you want to log out of SkillBridge?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Log Out",
        style: "destructive",
        onPress: async () => {
          // Keep 'already_onboarded' = 'true' so returning user hits /login
          router.replace("/login");
        },
      },
    ]);
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      "Delete Account",
      "This will permanently delete your CV, matched jobs, and profile history. This action cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete Permanently",
          style: "destructive",
          onPress: async () => {
            await AsyncStorage.clear();
            router.replace("/onboarding");
          },
        },
      ],
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />

      {/* Header Bar */}
      <View style={styles.headerBar}>
        <TouchableOpacity
          onPress={() => router.back()}
          hitSlop={12}
          style={styles.backBtn}
        >
          <Ionicons name="chevron-back" size={26} color="#7A1380" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.bellBtn} hitSlop={12}>
          <Ionicons name="notifications" size={22} color="#7A1380" />
        </TouchableOpacity>
      </View>

      <View style={styles.titleContainer}>
        <Text style={styles.pageTitle}>Settings</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ================= 1. Account and security ================= */}
        <Text style={styles.sectionHeader}>Account and security</Text>
        <View style={styles.card}>
          {/* Password Reset */}
          <TouchableOpacity
            style={styles.rowItem}
            activeOpacity={0.7}
            onPress={() => router.push("/forgot-password")}
          >
            <View style={styles.rowTextContainer}>
              <Text style={styles.rowTitle}>Password reset</Text>
              <Text style={styles.rowSubtitle}>Last changed 2 months ago</Text>
            </View>
            <Feather name="chevron-right" size={18} color="#7A1380" />
          </TouchableOpacity>

          <View style={styles.divider} />

          {/* Two-Factor Authentication */}
          <View style={styles.rowItem}>
            <View style={styles.rowTextContainer}>
              <Text style={styles.rowTitle}>Two–factor authentication</Text>
              <Text style={styles.rowSubtitle}>
                Protect sign-in with a code
              </Text>
            </View>
            <TouchableOpacity
              style={[
                styles.pillBadge,
                twoFactorEnabled ? styles.pillActive : styles.pillInactive,
              ]}
              onPress={() => setTwoFactorEnabled((prev) => !prev)}
              activeOpacity={0.8}
            >
              <Text
                style={[
                  styles.pillText,
                  twoFactorEnabled
                    ? styles.pillTextActive
                    : styles.pillTextInactive,
                ]}
              >
                {twoFactorEnabled ? "On" : "Off"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* ================= 2. Notifications ================= */}
        <Text style={styles.sectionHeader}>Notifications</Text>
        <View style={styles.card}>
          {/* Job match alerts */}
          <View style={styles.rowItem}>
            <View style={styles.rowTextContainer}>
              <Text style={styles.rowTitle}>Job match alerts</Text>
              <Text style={styles.rowSubtitle}>
                When a new opportunity fits you
              </Text>
            </View>
            <Switch
              value={jobAlerts}
              onValueChange={setJobAlerts}
              trackColor={{ false: "#D1C2CE", true: "#7A1380" }}
              thumbColor="#FFFFFF"
            />
          </View>

          <View style={styles.divider} />

          {/* Weekly progress summary */}
          <View style={styles.rowItem}>
            <View style={styles.rowTextContainer}>
              <Text style={styles.rowTitle}>Weekly progress summary</Text>
              <Text style={styles.rowSubtitle}>Every Monday, 8:00 am</Text>
            </View>
            <Switch
              value={weeklySummary}
              onValueChange={setWeeklySummary}
              trackColor={{ false: "#D1C2CE", true: "#7A1380" }}
              thumbColor="#FFFFFF"
            />
          </View>
        </View>

        {/* ================= 3. Privacy and data ================= */}
        <Text style={styles.sectionHeader}>Privacy and data</Text>
        <View style={styles.card}>
          {/* Data retention */}
          <TouchableOpacity style={styles.rowItem} activeOpacity={0.7}>
            <View style={styles.rowTextContainer}>
              <Text style={styles.rowTitle}>Data retention</Text>
              <Text style={styles.rowSubtitle}>Keep my CV for 12 months</Text>
            </View>
            <Feather name="chevron-right" size={18} color="#7A1380" />
          </TouchableOpacity>

          <View style={styles.divider} />

          {/* Delete account */}
          <TouchableOpacity
            style={styles.rowItem}
            activeOpacity={0.7}
            onPress={handleDeleteAccount}
          >
            <View style={styles.rowTextContainer}>
              <Text style={styles.rowTitle}>Delete account</Text>
              <Text style={styles.rowSubtitle}>
                Permanently removes your CV and data
              </Text>
            </View>
            <Feather name="chevron-right" size={18} color="#7A1380" />
          </TouchableOpacity>

          <View style={styles.divider} />

          {/* Recruiter Visibility Network */}
          <View style={styles.rowItem}>
            <View style={styles.rowTextContainer}>
              <Text style={styles.rowTitle}>Recruiter Visibility Network</Text>
              <Text style={styles.rowSubtitle}>
                Allow vetted employers (e.g Flutterwave, Sterling, Moniepoint)
                to discover your profile
              </Text>
            </View>
            <Switch
              value={recruiterNetwork}
              onValueChange={setRecruiterNetwork}
              trackColor={{ false: "#D1C2CE", true: "#7A1380" }}
              thumbColor="#FFFFFF"
            />
          </View>
        </View>

        {/* ================= 4. Help and support ================= */}
        <Text style={styles.sectionHeader}>Help and support</Text>
        <View style={styles.card}>
          {/* FAQs */}
          <TouchableOpacity style={styles.rowItem} activeOpacity={0.7}>
            <View style={styles.rowTextContainer}>
              <Text style={styles.rowTitle}>FAQs</Text>
            </View>
            <Feather name="chevron-right" size={18} color="#7A1380" />
          </TouchableOpacity>

          <View style={styles.divider} />

          {/* Contact support */}
          <TouchableOpacity style={styles.rowItem} activeOpacity={0.7}>
            <View style={styles.rowTextContainer}>
              <Text style={styles.rowTitle}>Contact support</Text>
              <Text style={styles.rowSubtitle}>
                Raise a ticket. We reply within 2 working days
              </Text>
            </View>
            <Feather name="chevron-right" size={18} color="#7A1380" />
          </TouchableOpacity>
        </View>

        {/* Log out CTA */}
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
          activeOpacity={0.85}
        >
          <Text style={styles.logoutText}>Log out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  headerBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    height: 44,
  },
  backBtn: {
    width: 36,
    justifyContent: "center",
  },
  bellBtn: {
    width: 36,
    alignItems: "flex-end",
    justifyContent: "center",
  },
  titleContainer: {
    paddingHorizontal: 20,
    paddingBottom: 8,
  },
  pageTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: "#1C101B",
    letterSpacing: -0.4,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 40,
  },
  sectionHeader: {
    fontSize: 15,
    fontWeight: "800",
    color: "#1C101B",
    marginBottom: 10,
    marginTop: 14,
    letterSpacing: -0.2,
  },
  card: {
    borderWidth: 1.2,
    borderColor: "#7A1380",
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    paddingVertical: 4,
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  rowItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
  },
  rowTextContainer: {
    flex: 1,
    marginRight: 12,
  },
  rowTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#1C101B",
    marginBottom: 3,
  },
  rowSubtitle: {
    fontSize: 12,
    color: "#5B4E5A",
    lineHeight: 16,
  },
  divider: {
    height: 1,
    backgroundColor: "#EBDDE9",
  },
  pillBadge: {
    paddingVertical: 4,
    paddingHorizontal: 16,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  pillActive: {
    backgroundColor: "#7A1380",
  },
  pillInactive: {
    backgroundColor: "#D1C2CE",
  },
  pillText: {
    fontSize: 12,
    fontWeight: "700",
  },
  pillTextActive: {
    color: "#FFFFFF",
  },
  pillTextInactive: {
    color: "#8A7B87",
  },
  logoutButton: {
    height: 48,
    borderRadius: 10,
    borderWidth: 1.2,
    borderColor: "#D32F2F",
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 22,
    marginBottom: 12,
  },
  logoutText: {
    fontSize: 15,
    fontWeight: "800",
    color: "#D32F2F",
  },
});
