import React, { useState, useMemo } from "react";
import { View, StyleSheet, Pressable } from "react-native";
import { Feather } from "@expo/vector-icons";
import { ScreenScrollView } from "@/components/ScreenScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ScheduleCard, ScheduleData } from "@/components/ScheduleCard";
import { useTheme } from "@/hooks/useTheme";
import { Spacing, BorderRadius, Typography } from "@/constants/theme";
import { generateSchedules, getStandardScheduleInfo } from "@/utils/schedules";

export default function SchedulesScreen() {
  const { theme } = useTheme();
  const [filter, setFilter] = useState<"all" | "dzaoudzi" | "mamoudzou">("all");
  
  const schedules = useMemo(() => generateSchedules(), []);
  const scheduleInfo = getStandardScheduleInfo();

  const filteredSchedules = useMemo(() => {
    if (filter === "all") return schedules;
    const fromFilter = filter === "dzaoudzi" ? "Dzaoudzi" : "Mamoudzou";
    return schedules.filter(s => s.from === fromFilter);
  }, [schedules, filter]);

  const handleSchedulePress = (schedule: ScheduleData) => {
    console.log("Schedule pressed:", schedule);
  };

  return (
    <ScreenScrollView>
      <View style={styles.filterContainer}>
        <Pressable
          style={[
            styles.filterButton,
            {
              backgroundColor: filter === "all" ? theme.primary : theme.backgroundSecondary,
            },
          ]}
          onPress={() => setFilter("all")}
        >
          <ThemedText
            style={[
              styles.filterText,
              { color: filter === "all" ? "#FFFFFF" : theme.text },
            ]}
          >
            Tous
          </ThemedText>
        </Pressable>

        <Pressable
          style={[
            styles.filterButton,
            {
              backgroundColor: filter === "dzaoudzi" ? theme.primary : theme.backgroundSecondary,
            },
          ]}
          onPress={() => setFilter("dzaoudzi")}
        >
          <ThemedText
            style={[
              styles.filterText,
              { color: filter === "dzaoudzi" ? "#FFFFFF" : theme.text },
            ]}
          >
            Dzaoudzi
          </ThemedText>
        </Pressable>

        <Pressable
          style={[
            styles.filterButton,
            {
              backgroundColor: filter === "mamoudzou" ? theme.primary : theme.backgroundSecondary,
            },
          ]}
          onPress={() => setFilter("mamoudzou")}
        >
          <ThemedText
            style={[
              styles.filterText,
              { color: filter === "mamoudzou" ? "#FFFFFF" : theme.text },
            ]}
          >
            Mamoudzou
          </ThemedText>
        </Pressable>
      </View>

      <View style={styles.section}>
        <ThemedText style={styles.sectionTitle}>Prochains départs</ThemedText>
        {filteredSchedules.map((schedule, index) => (
          <ScheduleCard
            key={`${schedule.departureTime}-${index}`}
            schedule={schedule}
            onPress={() => handleSchedulePress(schedule)}
          />
        ))}
      </View>

      <View style={[styles.infoCard, { backgroundColor: theme.card }]}>
        <ThemedText style={styles.infoTitle}>Horaires standards</ThemedText>
        
        <View style={styles.infoRow}>
          <Feather name="clock" size={18} color={theme.primary} />
          <ThemedText style={styles.infoText}>
            En journée : {scheduleInfo.dayFrequency}
          </ThemedText>
        </View>

        <View style={styles.infoRow}>
          <Feather name="moon" size={18} color={theme.primary} />
          <ThemedText style={styles.infoText}>
            En soirée : {scheduleInfo.eveningFrequency}
          </ThemedText>
        </View>

        <View style={styles.infoRow}>
          <Feather name="sunrise" size={18} color={theme.primary} />
          <ThemedText style={styles.infoText}>
            Premier départ : {scheduleInfo.firstDeparture}
          </ThemedText>
        </View>

        <View style={styles.infoRow}>
          <Feather name="sunset" size={18} color={theme.primary} />
          <ThemedText style={styles.infoText}>
            Dernier départ : {scheduleInfo.lastDeparture}
          </ThemedText>
        </View>

        <View style={styles.infoRow}>
          <Feather name="navigation" size={18} color={theme.primary} />
          <ThemedText style={styles.infoText}>
            Durée du trajet : {scheduleInfo.duration}
          </ThemedText>
        </View>
      </View>
    </ScreenScrollView>
  );
}

const styles = StyleSheet.create({
  filterContainer: {
    flexDirection: "row",
    gap: Spacing.sm,
    paddingVertical: Spacing.md,
  },
  filterButton: {
    flex: 1,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.xs,
    alignItems: "center",
  },
  filterText: {
    fontSize: 14,
    fontWeight: "600",
  },
  section: {
    marginTop: Spacing.md,
  },
  sectionTitle: {
    ...Typography.h2,
    marginBottom: Spacing.lg,
  },
  infoCard: {
    borderRadius: BorderRadius.sm,
    padding: Spacing.lg,
    marginTop: Spacing.xl,
    marginBottom: Spacing.xl,
  },
  infoTitle: {
    ...Typography.h2,
    marginBottom: Spacing.lg,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: Spacing.md,
    gap: Spacing.md,
  },
  infoText: {
    fontSize: 16,
    flex: 1,
  },
});
