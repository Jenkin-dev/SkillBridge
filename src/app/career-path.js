import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  ScrollView,
  Modal,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons, Feather } from "@expo/vector-icons";

import LogoSvg from "../../assets/images/logo.svg";

const INITIAL_PATHS = [
  {
    id: "1",
    title: "Junior Data Analyst, 87%",
    company: "TechCorp, Lagos",
    bullets: [
      "Strong Excel and reporting skills",
      "Research Assistant experience (8 months)",
    ],
    selected: true,
  },
  {
    id: "2",
    title: "Operations Analyst",
    company: "Example Ltd, Lagos",
    bullets: [
      "Project coordination from your volunteer work",
      "Clear reporting and communication",
    ],
    selected: true,
  },
];

export default function CareerPathScreen() {
  const router = useRouter();

  const [careerPaths, setCareerPaths] = useState(INITIAL_PATHS);
  const [modalVisible, setModalVisible] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newCompany, setNewCompany] = useState("");

  const toggleSelect = (id) => {
    setCareerPaths((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, selected: !item.selected } : item,
      ),
    );
  };

  const handleAddCustomPath = () => {
    if (!newTitle.trim()) return;

    setCareerPaths((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        title: newTitle.trim(),
        company: newCompany.trim() || "Preferred Industry",
        bullets: ["User custom selection"],
        selected: true,
      },
    ]);

    setNewTitle("");
    setNewCompany("");
    setModalVisible(false);
  };

  const hasSelection = careerPaths.some((item) => item.selected);

  const handleConfirm = () => {
    if (!hasSelection) return;
    // Replace stack to tab navigation dashboard
    router.replace("/(tabs)");
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
          <Ionicons name="chevron-back" size={28} color="#7A1380" />
        </TouchableOpacity>

        <View style={styles.logoWrapper}>
          <LogoSvg width={30} height={30} fill="#7A1380" />
        </View>

        <View style={styles.headerRightPlaceholder} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Top Career Path</Text>

        {/* Grouped Career Card Container */}
        <View style={styles.cardContainer}>
          {careerPaths.map((item, index) => (
            <View key={item.id}>
              <TouchableOpacity
                style={styles.careerItem}
                onPress={() => toggleSelect(item.id)}
                activeOpacity={0.85}
              >
                {/* Header Row: Checkbox + Title */}
                <View style={styles.itemHeaderRow}>
                  <View
                    style={[
                      styles.checkbox,
                      item.selected && styles.checkboxSelected,
                    ]}
                  >
                    {item.selected && (
                      <Ionicons name="checkmark" size={13} color="#FFFFFF" />
                    )}
                  </View>
                  <Text style={styles.itemTitle}>{item.title}</Text>
                </View>

                {/* Body Content */}
                <View style={styles.itemBody}>
                  <Text style={styles.companyText}>{item.company}</Text>

                  {item.bullets.map((bullet, bIdx) => (
                    <View key={bIdx} style={styles.bulletRow}>
                      <Text style={styles.bulletDot}>•</Text>
                      <Text style={styles.bulletText}>{bullet}</Text>
                    </View>
                  ))}
                </View>
              </TouchableOpacity>

              {/* Internal Divider between items */}
              {index < careerPaths.length - 1 && (
                <View style={styles.divider} />
              )}
            </View>
          ))}
        </View>

        {/* Add Preferred Career Path Button */}
        <TouchableOpacity
          style={styles.addCustomButton}
          onPress={() => setModalVisible(true)}
          activeOpacity={0.8}
        >
          <Ionicons name="add-circle" size={22} color="#7A1380" />
          <Text style={styles.addCustomText}>Add Preferred Career Path...</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Bottom CTA Container */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={[
            styles.ctaButton,
            hasSelection ? styles.ctaButtonActive : styles.ctaButtonDisabled,
          ]}
          onPress={handleConfirm}
          disabled={!hasSelection}
          activeOpacity={hasSelection ? 0.85 : 1}
        >
          <Text
            style={[
              styles.ctaButtonText,
              !hasSelection && styles.ctaButtonTextDisabled,
            ]}
          >
            Confirm & Launch Dashboard
          </Text>
          <Feather
            name="arrow-right"
            size={20}
            color={hasSelection ? "#FFFFFF" : "#8A7B87"}
          />
        </TouchableOpacity>
      </View>

      {/* Add Custom Career Modal */}
      <Modal visible={modalVisible} transparent animationType="fade">
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setModalVisible(false)}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalHeading}>Add Preferred Career Path</Text>

            <TextInput
              style={styles.modalInput}
              placeholder="e.g. Product Manager, Frontend Developer"
              placeholderTextColor="#A894A6"
              value={newTitle}
              onChangeText={setNewTitle}
              autoFocus
            />

            <TextInput
              style={styles.modalInput}
              placeholder="Company or Industry preference (optional)"
              placeholderTextColor="#A894A6"
              value={newCompany}
              onChangeText={setNewCompany}
            />

            <View style={styles.modalBtnRow}>
              <TouchableOpacity
                style={styles.modalCancelBtn}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.modalCancelText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.modalAddBtn}
                onPress={handleAddCustomPath}
              >
                <Text style={styles.modalAddText}>Add Role</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
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
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    height: 48,
  },
  backBtn: {
    width: 36,
    justifyContent: "center",
  },
  logoWrapper: {
    alignItems: "center",
    justifyContent: "center",
  },
  headerRightPlaceholder: {
    width: 36,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: "800",
    color: "#1C101B",
    marginBottom: 20,
    letterSpacing: -0.3,
  },
  cardContainer: {
    borderWidth: 1.2,
    borderColor: "#7A1380",
    borderRadius: 16,
    backgroundColor: "#FFFFFF",
    paddingVertical: 12,
    paddingHorizontal: 14,
    marginBottom: 16,
  },
  careerItem: {
    paddingVertical: 6,
  },
  itemHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    width: 18,
    height: 18,
    borderRadius: 4,
    borderWidth: 1.2,
    borderColor: "#7A1380",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
    backgroundColor: "#FFFFFF",
  },
  checkboxSelected: {
    backgroundColor: "#7A1380",
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#1C101B",
    letterSpacing: -0.2,
  },
  itemBody: {
    marginLeft: 26,
    marginTop: 4,
  },
  companyText: {
    fontSize: 13,
    color: "#3C303B",
    fontWeight: "500",
    marginBottom: 6,
  },
  bulletRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 3,
  },
  bulletDot: {
    fontSize: 14,
    color: "#1C101B",
    lineHeight: 18,
    marginRight: 6,
  },
  bulletText: {
    fontSize: 13,
    color: "#1C101B",
    lineHeight: 18,
    flex: 1,
  },
  divider: {
    height: 1,
    backgroundColor: "#7A1380",
    marginVertical: 14,
  },
  addCustomButton: {
    borderWidth: 1.2,
    borderColor: "#7A1380",
    borderRadius: 6,
    height: 48,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    backgroundColor: "#FFFFFF",
  },
  addCustomText: {
    fontSize: 13,
    fontWeight: "500",
    color: "#1C101B",
    marginLeft: 8,
  },
  bottomBar: {
    paddingHorizontal: 20,
    paddingBottom: 16,
    paddingTop: 8,
    backgroundColor: "#FFFFFF",
  },
  ctaButton: {
    height: 52,
    borderRadius: 26,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  ctaButtonActive: {
    backgroundColor: "#7A1380",
  },
  ctaButtonDisabled: {
    backgroundColor: "#D1C2CE",
  },
  ctaButtonText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#FFFFFF",
    marginRight: 8,
  },
  ctaButtonTextDisabled: {
    color: "#8A7B87",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  modalContent: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 18,
    width: "100%",
  },
  modalHeading: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1C101B",
    marginBottom: 14,
  },
  modalInput: {
    height: 46,
    borderWidth: 1.2,
    borderColor: "#7A1380",
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 14,
    color: "#1C101B",
    marginBottom: 12,
  },
  modalBtnRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 4,
  },
  modalCancelBtn: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    marginRight: 8,
  },
  modalCancelText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#6E616D",
  },
  modalAddBtn: {
    backgroundColor: "#7A1380",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  modalAddText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#FFFFFF",
  },
});
