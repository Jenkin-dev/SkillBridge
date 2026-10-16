import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />

      {/* Top Header */}
      <View style={styles.headerBar}>
        <Text style={styles.greetingText}>Hello, Amara</Text>

        <View style={styles.headerRightIcons}>
          <TouchableOpacity style={styles.iconBtn} hitSlop={10}>
            <Ionicons name="notifications" size={24} color="#7A1380" />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.iconBtn, { marginLeft: 16 }]}
            hitSlop={10}
          >
            <Ionicons name="settings" size={24} color="#7A1380" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Target Goal Header Row */}
        <View style={styles.targetGoalRow}>
          <Text style={styles.targetGoalLabel}>
            Target Goal:{" "}
            <Text style={styles.targetGoalValue}>Junior Data Analyst</Text>
          </Text>

          <TouchableOpacity
            style={styles.editBtn}
            onPress={() => router.push("/career-path")}
            hitSlop={8}
          >
            <MaterialCommunityIcons
              name="pencil-outline"
              size={18}
              color="#7A1380"
            />
            <Text style={styles.editText}>Edit</Text>
          </TouchableOpacity>
        </View>

        {/* 1. Career Readiness Score Card */}
        <View style={styles.card}>
          <Text style={styles.cardHeading}>Career Readiness Score</Text>

          {/* Progress Bar 68% */}
          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: "68%" }]} />
          </View>

          <Text style={styles.readinessTitle}>68% Target Role Ready</Text>
          <Text style={styles.readinessSubtitle}>
            You have 3 of 9 target skills verified.
          </Text>

          {/* View Skill Matrix Button */}
          <TouchableOpacity
            style={styles.matrixBtn}
            activeOpacity={0.8}
            onPress={() => router.push("/(tabs)/skills")}
          >
            <Text style={styles.matrixBtnText}>View Skill Matrix</Text>
            <Feather name="arrow-right" size={16} color="#1C101B" />
          </TouchableOpacity>
        </View>

        {/* 2. Quick Stats Section */}
        <Text style={styles.sectionTitle}>Quick Stats</Text>

        <View style={styles.statsRow}>
          {/* Possessed Box */}
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>3 Possessed</Text>
            <View style={styles.statStatusRow}>
              <View style={styles.verifiedIconBox}>
                <Ionicons name="checkmark" size={12} color="#FFFFFF" />
              </View>
              <Text style={styles.statStatusText}>Verified</Text>
            </View>
          </View>

          {/* Skill Gaps Box */}
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>6 Skill Gaps</Text>
            <View style={styles.statStatusRow}>
              <Ionicons name="warning" size={16} color="#E5B800" />
              <Text style={[styles.statStatusText, { marginLeft: 4 }]}>
                High Priority
              </Text>
            </View>
          </View>
        </View>

        {/* 3. Active Roadmap Section */}
        <Text style={styles.sectionTitle}>Active Roadmap</Text>

        <View style={styles.card}>
          <View style={styles.roadmapHeaderRow}>
            <Ionicons name="play" size={18} color="#7A1380" />
            <Text style={styles.roadmapTitle}>
              Day 12 of 30: Master SQL Join Queries
            </Text>
          </View>

          {/* Progress Bar 40% */}
          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: "40%" }]} />
          </View>

          <Text style={styles.roadmapProgressText}>Progress: 40% Complete</Text>
        </View>
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
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 14,
  },
  greetingText: {
    fontSize: 24,
    fontWeight: "800",
    color: "#1C101B",
    letterSpacing: -0.3,
  },
  headerRightIcons: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconBtn: {
    padding: 2,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 110, // accounts for the floating bottom tab bar
  },
  targetGoalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 16,
  },
  targetGoalLabel: {
    fontSize: 14,
    color: "#1C101B",
    fontWeight: "600",
  },
  targetGoalValue: {
    fontWeight: "600",
    color: "#1C101B",
  },
  editBtn: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#7A1380",
    paddingBottom: 1,
  },
  editText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#1C101B",
    marginLeft: 4,
  },
  card: {
    borderWidth: 1.2,
    borderColor: "#7A1380",
    borderRadius: 8,
    padding: 16,
    backgroundColor: "#FFFFFF",
    marginBottom: 20,
  },
  cardHeading: {
    fontSize: 15,
    fontWeight: "800",
    color: "#1C101B",
    marginBottom: 12,
  },
  progressTrack: {
    height: 8,
    borderRadius: 4,
    backgroundColor: "#E4CFE2",
    overflow: "hidden",
    marginBottom: 14,
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#7A1380",
    borderRadius: 4,
  },
  readinessTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: "#1C101B",
    marginBottom: 4,
  },
  readinessSubtitle: {
    fontSize: 13,
    color: "#4B3F4B",
    marginBottom: 14,
  },
  matrixBtn: {
    borderWidth: 1.2,
    borderColor: "#7A1380",
    borderRadius: 4,
    paddingVertical: 8,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
  },
  matrixBtnText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#1C101B",
    marginRight: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#1C101B",
    marginBottom: 12,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 22,
  },
  statBox: {
    width: "48%",
    borderWidth: 1.2,
    borderColor: "#7A1380",
    borderRadius: 8,
    padding: 14,
    backgroundColor: "#FFFFFF",
  },
  statNumber: {
    fontSize: 14,
    fontWeight: "700",
    color: "#1C101B",
    marginBottom: 8,
  },
  statStatusRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  verifiedIconBox: {
    width: 16,
    height: 16,
    borderRadius: 3,
    backgroundColor: "#27AE60",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 6,
  },
  statStatusText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#1C101B",
  },
  roadmapHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
  },
  roadmapTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#1C101B",
    marginLeft: 8,
    flex: 1,
  },
  roadmapProgressText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#1C101B",
  },
});
