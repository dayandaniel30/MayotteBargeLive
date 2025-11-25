import React from "react";
import { View, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import { ThemedText } from "@/components/ThemedText";
import { Colors, Spacing } from "@/constants/theme";

interface AlertBannerProps {
  message: string;
  type?: "warning" | "error" | "info";
}

export function AlertBanner({ message, type = "warning" }: AlertBannerProps) {
  const backgroundColor =
    type === "warning"
      ? Colors.light.warning
      : type === "error"
        ? Colors.light.error
        : Colors.light.info;

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Feather name="alert-circle" size={20} color="#FFFFFF" style={styles.icon} />
      <ThemedText style={styles.text} numberOfLines={2}>
        {message}
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    minHeight: Spacing.alertBannerHeight,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
  },
  icon: {
    marginRight: Spacing.md,
  },
  text: {
    flex: 1,
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },
});
