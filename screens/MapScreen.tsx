import React, { useState, useEffect } from "react";
import { View, StyleSheet, Pressable } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { AlertBanner } from "@/components/AlertBanner";
import { ThemedText } from "@/components/ThemedText";
import { useTheme } from "@/hooks/useTheme";
import { useScreenInsets } from "@/hooks/useScreenInsets";
import { Spacing, BorderRadius, Typography } from "@/constants/theme";
import { TERMINALS } from "@/utils/schedules";
import { getCurrentAlert, getAlertSeverityType } from "@/utils/alerts";
import { getSimulatedFerries, FerryPosition } from "@/utils/ferrySimulation";
import { ScreenScrollView } from "@/components/ScreenScrollView";

export default function MapScreen() {
  const { theme, isDark } = useTheme();
  const { headerHeight, tabBarHeight } = useScreenInsets();
  const navigation = useNavigation<any>();
  const [currentAlert, setCurrentAlert] = useState(getCurrentAlert());
  const [ferries, setFerries] = useState<FerryPosition[]>([]);

  useEffect(() => {
    const alert = getCurrentAlert();
    setCurrentAlert(alert);

    const updateFerries = () => {
      const activeFerries = getSimulatedFerries();
      setFerries(activeFerries);
    };

    updateFerries();
    const interval = setInterval(updateFerries, 5000);
    return () => clearInterval(interval);
  }, []);

  const ferryPosition = ferries.length > 0 ? ferries[0].progress : null;

  return (
    <View style={styles.container}>
      <ScreenScrollView>
        <View style={[styles.mapCard, { backgroundColor: theme.card }]}>
          <ThemedText style={[styles.mapTitle, Typography.h2]}>
            Statut des liaisons
          </ThemedText>

          {/* Custom Map Visualization */}
          <View
            style={[
              styles.mapContainer,
              {
                backgroundColor: isDark ? "#2a3a4a" : "#e8f4f8",
                borderColor: theme.border,
              },
            ]}
          >
            {/* Route Path */}
            <View style={styles.routePath}>
              {/* Dzaoudzi Terminal */}
              <View style={styles.terminalMarker}>
                <View
                  style={[styles.terminalDot, { backgroundColor: theme.primary }]}
                >
                  <Feather name="anchor" size={16} color="#FFFFFF" />
                </View>
              </View>

              {/* Route Line */}
              <View style={styles.routeLine}>
                {/* Dashed Line Background */}
                <View
                  style={[
                    styles.dashedLine,
                    {
                      borderTopColor: theme.primary,
                      opacity: 0.3,
                    },
                  ]}
                />

                {/* Ferry Position Indicator */}
                {ferryPosition !== null && (
                  <View
                    style={[
                      styles.ferryOnRoute,
                      {
                        left: `${ferryPosition * 100}%`,
                        backgroundColor: theme.warning,
                      },
                    ]}
                  >
                    <Feather name="navigation" size={12} color="#FFFFFF" />
                  </View>
                )}
              </View>

              {/* Mamoudzou Terminal */}
              <View style={styles.terminalMarker}>
                <View
                  style={[styles.terminalDot, { backgroundColor: theme.primary }]}
                >
                  <Feather name="anchor" size={16} color="#FFFFFF" />
                </View>
              </View>
            </View>

            {/* Terminal Labels */}
            <View style={styles.labelsContainer}>
              <View style={styles.labelLeft}>
                <ThemedText style={styles.terminalName}>
                  {TERMINALS.DZAOUDZI.shortName}
                </ThemedText>
                <ThemedText
                  style={[styles.terminalDetail, { color: theme.textSecondary }]}
                >
                  {TERMINALS.DZAOUDZI.name}
                </ThemedText>
              </View>

              <View style={styles.labelRight}>
                <ThemedText style={[styles.terminalName, { textAlign: "right" }]}>
                  {TERMINALS.MAMOUDZOU.shortName}
                </ThemedText>
                <ThemedText
                  style={[
                    styles.terminalDetail,
                    { color: theme.textSecondary, textAlign: "right" },
                  ]}
                >
                  {TERMINALS.MAMOUDZOU.name}
                </ThemedText>
              </View>
            </View>
          </View>

          {/* Ferry Status */}
          {ferries.length > 0 ? (
            <View style={[styles.ferryStatus, { backgroundColor: theme.backgroundSecondary }]}>
              <Feather name="info" size={18} color={theme.warning} style={styles.infoIcon} />
              <View style={styles.ferryStatusText}>
                <ThemedText style={styles.ferryStatusTitle}>
                  Barge en route
                </ThemedText>
                <ThemedText style={[styles.ferryStatusDetail, { color: theme.textSecondary }]}>
                  Destination: {ferries[0].direction === "dzaoudzi-mamoudzou" ? "Mamoudzou" : "Dzaoudzi"}
                </ThemedText>
                <ThemedText style={[styles.ferryStatusDetail, { color: theme.textSecondary }]}>
                  Arrivée: {ferries[0].arrivalTime}
                </ThemedText>
              </View>
            </View>
          ) : (
            <View style={[styles.ferryStatus, { backgroundColor: theme.backgroundSecondary }]}>
              <Feather name="check-circle" size={18} color={theme.primary} style={styles.infoIcon} />
              <View style={styles.ferryStatusText}>
                <ThemedText style={styles.ferryStatusTitle}>
                  Aucune barge en route
                </ThemedText>
                <ThemedText style={[styles.ferryStatusDetail, { color: theme.textSecondary }]}>
                  Consultez l'onglet Horaires pour les prochains départs
                </ThemedText>
              </View>
            </View>
          )}

          {/* Crossing Info */}
          <View style={[styles.crossingInfo, { backgroundColor: theme.backgroundSecondary }]}>
            <View style={styles.crossingItem}>
              <Feather name="clock" size={16} color={theme.primary} />
              <View style={styles.crossingDetail}>
                <ThemedText style={[styles.crossingLabel, { color: theme.textSecondary }]}>
                  Durée
                </ThemedText>
                <ThemedText style={styles.crossingValue}>15-20 min</ThemedText>
              </View>
            </View>

            <View style={styles.crossingDivider} />

            <View style={styles.crossingItem}>
              <Feather name="users" size={16} color={theme.primary} />
              <View style={styles.crossingDetail}>
                <ThemedText style={[styles.crossingLabel, { color: theme.textSecondary }]}>
                  Piéton
                </ThemedText>
                <ThemedText style={styles.crossingValue}>Gratuit / 0,75€</ThemedText>
              </View>
            </View>

            <View style={styles.crossingDivider} />

            <View style={styles.crossingItem}>
              <Feather name="truck" size={16} color={theme.primary} />
              <View style={styles.crossingDetail}>
                <ThemedText style={[styles.crossingLabel, { color: theme.textSecondary }]}>
                  Véhicule
                </ThemedText>
                <ThemedText style={styles.crossingValue}>15€</ThemedText>
              </View>
            </View>
          </View>
        </View>
      </ScreenScrollView>

      {currentAlert && (
        <View
          style={[
            styles.alertContainer,
            {
              top: headerHeight + Spacing.lg,
            },
          ]}
        >
          <AlertBanner
            message={currentAlert.message}
            type={getAlertSeverityType(currentAlert.severity)}
          />
        </View>
      )}

      <Pressable
        style={[
          styles.buyButton,
          {
            bottom: tabBarHeight + Spacing.xl,
            backgroundColor: theme.primary,
          },
        ]}
        onPress={() => navigation.navigate("TicketsTab")}
      >
        <Feather name="shopping-cart" size={20} color="#FFFFFF" />
        <ThemedText style={styles.buyButtonText}>Acheter un billet</ThemedText>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapCard: {
    margin: Spacing.lg,
    borderRadius: BorderRadius.sm,
    padding: Spacing.lg,
  },
  mapTitle: {
    marginBottom: Spacing.lg,
  },
  mapContainer: {
    borderRadius: BorderRadius.sm,
    padding: Spacing.xl,
    marginBottom: Spacing.lg,
    borderWidth: 1,
    height: 200,
    justifyContent: "center",
  },
  routePath: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: Spacing.lg,
  },
  terminalMarker: {
    alignItems: "center",
  },
  terminalDot: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 6,
  },
  routeLine: {
    flex: 1,
    height: 4,
    marginHorizontal: Spacing.md,
    position: "relative",
    justifyContent: "center",
  },
  dashedLine: {
    flex: 1,
    borderTopWidth: 2,
    borderTopColor: "#000",
    borderStyle: "dashed",
  },
  ferryOnRoute: {
    position: "absolute",
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    top: -14,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 8,
  },
  labelsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: Spacing.sm,
  },
  labelLeft: {
    flex: 1,
    alignItems: "flex-start",
  },
  labelRight: {
    flex: 1,
    alignItems: "flex-end",
  },
  terminalName: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 2,
  },
  terminalDetail: {
    fontSize: 11,
  },
  ferryStatus: {
    flexDirection: "row",
    padding: Spacing.md,
    borderRadius: BorderRadius.xs,
    marginBottom: Spacing.lg,
    alignItems: "flex-start",
    gap: Spacing.md,
  },
  infoIcon: {
    marginTop: Spacing.xs,
  },
  ferryStatusText: {
    flex: 1,
  },
  ferryStatusTitle: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: Spacing.xs,
  },
  ferryStatusDetail: {
    fontSize: 12,
    marginBottom: Spacing.xs,
  },
  crossingInfo: {
    borderRadius: BorderRadius.xs,
    padding: Spacing.md,
    gap: Spacing.sm,
  },
  crossingItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: Spacing.md,
  },
  crossingDetail: {
    flex: 1,
  },
  crossingLabel: {
    fontSize: 11,
    marginBottom: Spacing.xs,
  },
  crossingValue: {
    fontSize: 14,
    fontWeight: "600",
  },
  crossingDivider: {
    height: 1,
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    marginVertical: Spacing.xs,
  },
  alertContainer: {
    position: "absolute",
    left: Spacing.lg,
    right: Spacing.lg,
    zIndex: 10,
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
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  buyButtonText: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 14,
  },
});
