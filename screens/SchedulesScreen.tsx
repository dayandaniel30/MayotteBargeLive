import React, { useState, useMemo } from "react";
import { View, StyleSheet, Pressable, ScrollView } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { ScreenScrollView } from "@/components/ScreenScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ScheduleCard, ScheduleData } from "@/components/ScheduleCard";
import { useTheme } from "@/hooks/useTheme";
import { useScreenInsets } from "@/hooks/useScreenInsets";
import { Spacing, BorderRadius, Typography } from "@/constants/theme";
import { generateSchedules, getStandardScheduleInfo } from "@/utils/schedules";
import { PRICING_INFO, getDurationText } from "@/utils/pricing";

export default function SchedulesScreen() {
  const { theme } = useTheme();
  const navigation = useNavigation<any>();
  const { tabBarHeight } = useScreenInsets();
  const [filter, setFilter] = useState<"all" | "dzaoudzi" | "mamoudzou">("all");
  const [timeFilter, setTimeFilter] = useState<"all" | "morning" | "afternoon" | "evening">("all");
  
  const schedules = useMemo(() => generateSchedules(), []);
  const scheduleInfo = getStandardScheduleInfo();

  const filteredSchedules = useMemo(() => {
    let filtered = schedules;

    if (filter !== "all") {
      const fromFilter = filter === "dzaoudzi" ? "Dzaoudzi" : "Mamoudzou";
      filtered = filtered.filter(s => s.from === fromFilter);
    }

    if (timeFilter !== "all") {
      filtered = filtered.filter(s => {
        const hour = parseInt(s.departureTime.split(":")[0]);
        if (timeFilter === "morning") return hour >= 5 && hour < 12;
        if (timeFilter === "afternoon") return hour >= 12 && hour < 18;
        if (timeFilter === "evening") return hour >= 18 || hour < 5;
        return true;
      });
    }

    return filtered;
  }, [schedules, filter, timeFilter]);

  const handleSchedulePress = (schedule: ScheduleData) => {
    console.log("Schedule pressed:", schedule);
  };

  const handleBuyTicket = (schedule: ScheduleData) => {
    // Get price based on direction (0 for free, 0.75 for paid)
    const price = schedule.from === "Dzaoudzi" ? 0 : 0.75;
    navigation.navigate("TicketPurchase", { 
      ticketType: "pedestrian",
      price,
      schedule
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <ScreenScrollView>
        <View style={styles.filterSection}>
        <ThemedText style={[styles.filterLabel, { color: theme.textSecondary }]}>
          Terminal de départ
        </ThemedText>
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
      </View>

      <View style={styles.filterSection}>
        <ThemedText style={[styles.filterLabel, { color: theme.textSecondary }]}>
          Heure de départ
        </ThemedText>
        <View style={styles.filterContainer}>
          <Pressable
            style={[
              styles.filterButton,
              {
                backgroundColor: timeFilter === "all" ? theme.primary : theme.backgroundSecondary,
              },
            ]}
            onPress={() => setTimeFilter("all")}
          >
            <ThemedText
              style={[
                styles.filterText,
                { color: timeFilter === "all" ? "#FFFFFF" : theme.text },
              ]}
            >
              Tous
            </ThemedText>
          </Pressable>

          <Pressable
            style={[
              styles.filterButton,
              {
                backgroundColor: timeFilter === "morning" ? theme.primary : theme.backgroundSecondary,
              },
            ]}
            onPress={() => setTimeFilter("morning")}
          >
            <ThemedText
              style={[
                styles.filterText,
                { color: timeFilter === "morning" ? "#FFFFFF" : theme.text },
              ]}
            >
              Matin
            </ThemedText>
          </Pressable>

          <Pressable
            style={[
              styles.filterButton,
              {
                backgroundColor: timeFilter === "afternoon" ? theme.primary : theme.backgroundSecondary,
              },
            ]}
            onPress={() => setTimeFilter("afternoon")}
          >
            <ThemedText
              style={[
                styles.filterText,
                { color: timeFilter === "afternoon" ? "#FFFFFF" : theme.text },
              ]}
            >
              Après-midi
            </ThemedText>
          </Pressable>

          <Pressable
            style={[
              styles.filterButton,
              {
                backgroundColor: timeFilter === "evening" ? theme.primary : theme.backgroundSecondary,
              },
            ]}
            onPress={() => setTimeFilter("evening")}
          >
            <ThemedText
              style={[
                styles.filterText,
                { color: timeFilter === "evening" ? "#FFFFFF" : theme.text },
              ]}
            >
              Soir
            </ThemedText>
          </Pressable>
        </View>
      </View>

      <View style={styles.section}>
        <ThemedText style={styles.sectionTitle}>Prochains départs</ThemedText>
        {filteredSchedules.map((schedule, index) => (
          <ScheduleCard
            key={`${schedule.departureTime}-${index}`}
            schedule={schedule}
            onPress={() => handleSchedulePress(schedule)}
            onBuyTicket={() => handleBuyTicket(schedule)}
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

      <View style={[styles.infoCard, { backgroundColor: theme.card }]}>
        <ThemedText style={styles.infoTitle}>Tarifs</ThemedText>
        
        <View style={styles.infoRow}>
          <Feather name="user" size={18} color={theme.primary} />
          <View style={styles.pricingTextContainer}>
            <ThemedText style={styles.infoText}>Piéton</ThemedText>
            <ThemedText style={[styles.pricingNote, { color: theme.textSecondary }]}>
              {PRICING_INFO.pedestrian.note}
            </ThemedText>
          </View>
        </View>

        <View style={styles.infoRow}>
          <Feather name="truck" size={18} color={theme.primary} />
          <ThemedText style={styles.infoText}>
            Véhicule : {PRICING_INFO.vehicle.price}
          </ThemedText>
        </View>

        <View style={styles.infoRow}>
          <Feather name="zap" size={18} color={theme.primary} />
          <ThemedText style={styles.infoText}>
            Moto : {PRICING_INFO.motorcycle.price}
          </ThemedText>
        </View>
      </View>
      </ScreenScrollView>

      <Pressable
        style={[
          styles.buyButton,
          {
            backgroundColor: theme.primary,
            bottom: tabBarHeight + Spacing.lg,
          },
        ]}
        onPress={() => navigation.navigate("TicketPurchase")}
      >
        <Feather name="shopping-cart" size={20} color="#FFFFFF" />
        <ThemedText style={styles.buyButtonText}>Acheter un billet</ThemedText>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  filterSection: {
    marginBottom: Spacing.md,
  },
  filterLabel: {
    fontSize: 12,
    fontWeight: "600",
    marginBottom: Spacing.sm,
    textTransform: "uppercase",
  },
  filterContainer: {
    flexDirection: "row",
    gap: Spacing.sm,
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
  pricingTextContainer: {
    flex: 1,
  },
  pricingNote: {
    fontSize: 12,
    marginTop: Spacing.xs,
  },
  buyButton: {
    position: "absolute",
    right: Spacing.lg,
    zIndex: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.md,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.full,
  },
  buyButtonText: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 14,
  },
});
