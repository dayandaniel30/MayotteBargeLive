import React from "react";
import { View, StyleSheet, Pressable } from "react-native";
import { Feather } from "@expo/vector-icons";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import { ThemedText } from "@/components/ThemedText";
import { Colors, Spacing, BorderRadius, Shadows, Typography } from "@/constants/theme";
import { useTheme } from "@/hooks/useTheme";
import { getPedestrianPrice } from "@/utils/pricing";

export type ScheduleStatus = "on-time" | "delayed" | "cancelled";

export interface ScheduleData {
  departureTime: string;
  from: string;
  to: string;
  duration: string;
  status: ScheduleStatus;
  delayMinutes?: number;
}

interface ScheduleCardProps {
  schedule: ScheduleData;
  onPress?: () => void;
  onBuyTicket?: () => void;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export function ScheduleCard({ schedule, onPress, onBuyTicket }: ScheduleCardProps) {
  const { theme } = useTheme();
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);
  const buyButtonScale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  const buyButtonAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: buyButtonScale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.97);
    opacity.value = withSpring(0.9);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1);
    opacity.value = withSpring(1);
  };

  const handleBuyButtonPressIn = () => {
    buyButtonScale.value = withSpring(0.95);
  };

  const handleBuyButtonPressOut = () => {
    buyButtonScale.value = withSpring(1);
  };

  const getStatusColor = () => {
    switch (schedule.status) {
      case "on-time":
        return theme.success;
      case "delayed":
        return theme.warning;
      case "cancelled":
        return theme.error;
      default:
        return theme.textSecondary;
    }
  };

  const getStatusText = () => {
    switch (schedule.status) {
      case "on-time":
        return "À l'heure";
      case "delayed":
        return `Retardé ${schedule.delayMinutes} min`;
      case "cancelled":
        return "Annulé";
      default:
        return "";
    }
  };

  return (
    <AnimatedPressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={[styles.container, { backgroundColor: theme.card }, animatedStyle]}
    >
      <View style={styles.header}>
        <View style={styles.routeContainer}>
          <ThemedText style={styles.routeText}>{schedule.from}</ThemedText>
          <Feather
            name="arrow-right"
            size={16}
            color={theme.textSecondary}
            style={styles.arrow}
          />
          <ThemedText style={styles.routeText}>{schedule.to}</ThemedText>
        </View>
        <Feather name="anchor" size={24} color={theme.primary} />
      </View>

      <View style={styles.content}>
        <View style={styles.timeContainer}>
          <ThemedText style={styles.time}>{schedule.departureTime}</ThemedText>
          <ThemedText style={[styles.duration, { color: theme.textSecondary }]}>
            {schedule.duration}
          </ThemedText>
          <View style={styles.priceRow}>
            <Feather name="dollar-sign" size={12} color={theme.primary} />
            <ThemedText style={[styles.price, { color: theme.primary }]}>
              {getPedestrianPrice(schedule.from === "Dzaoudzi" ? "dzaoudzi" : "mamoudzou")}
            </ThemedText>
          </View>
        </View>

        <View style={styles.centerContent}>
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor() }]}>
            <ThemedText style={styles.statusText}>{getStatusText()}</ThemedText>
          </View>
          
          {onBuyTicket && (
            <Animated.View style={buyButtonAnimatedStyle}>
              <Pressable
                style={[styles.buyButton, { backgroundColor: theme.primary }]}
                onPress={onBuyTicket}
                onPressIn={handleBuyButtonPressIn}
                onPressOut={handleBuyButtonPressOut}
              >
                <Feather name="shopping-cart" size={14} color="#FFFFFF" />
                <ThemedText style={styles.buyButtonText}>Acheter</ThemedText>
              </Pressable>
            </Animated.View>
          )}
        </View>
      </View>
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: BorderRadius.sm,
    padding: Spacing.lg,
    marginBottom: Spacing.md,
    ...Shadows.card,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Spacing.md,
  },
  routeContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  routeText: {
    fontSize: 16,
    fontWeight: "500",
  },
  arrow: {
    marginHorizontal: Spacing.sm,
  },
  content: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  timeContainer: {
    flex: 1,
  },
  centerContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.md,
  },
  time: {
    ...Typography.h3,
    marginBottom: Spacing.xs,
  },
  duration: {
    ...Typography.caption,
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: Spacing.xs,
    gap: Spacing.xs,
  },
  price: {
    fontSize: 12,
    fontWeight: "600",
  },
  statusBadge: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.xs,
    minWidth: 80,
  },
  statusText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "600",
    textAlign: "center",
  },
  buyButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    borderRadius: BorderRadius.full,
  },
  buyButtonText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "600",
  },
});
