import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView, Pressable } from "react-native";
import { Feather } from "@expo/vector-icons";
import { SearchBar } from "@/components/SearchBar";
import { AlertBanner } from "@/components/AlertBanner";
import { ThemedText } from "@/components/ThemedText";
import { useTheme } from "@/hooks/useTheme";
import { useScreenInsets } from "@/hooks/useScreenInsets";
import { Colors, Spacing, BorderRadius, Typography } from "@/constants/theme";
import { TERMINALS } from "@/utils/schedules";
import { getCurrentAlert, getAlertSeverityType } from "@/utils/alerts";
import { getSimulatedFerries, FerryPosition } from "@/utils/ferrySimulation";
import { ScreenScrollView } from "@/components/ScreenScrollView";

export default function MapScreen() {
  const { theme } = useTheme();
  const { headerHeight, tabBarHeight } = useScreenInsets();
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

  return (
    <View style={styles.container}>
      <ScreenScrollView>
        <View style={[styles.mapCard, { backgroundColor: theme.card }]}>
          <ThemedText style={[styles.mapTitle, Typography.h2]}>
            Statut des liaisons
          </ThemedText>

          {/* Ferry Route Visualization */}
          <View style={styles.routeContainer}>
            {/* Dzaoudzi Terminal */}
            <View style={styles.terminalSection}>
              <View style={[styles.terminalIcon, { backgroundColor: theme.primary }]}>
                <Feather name="anchor" size={24} color="#FFFFFF" />
              </View>
              <ThemedText style={styles.terminalName}>
                {TERMINALS.DZAOUDZI.shortName}
              </ThemedText>
              <ThemedText style={[styles.terminalFullName, { color: theme.textSecondary }]}>
                {TERMINALS.DZAOUDZI.name}
              </ThemedText>
            </View>

            {/* Route Line with Ferry Position */}
            <View style={styles.routeLine}>
              <View style={[styles.dottedLine, { backgroundColor: theme.primary }]} />
              
              {ferries.length > 0 ? (
                <View
                  style={[
                    styles.ferryIndicator,
                    {
                      left: `${ferries[0].progress * 100}%`,
                      backgroundColor: theme.warning,
                    },
                  ]}
                >
                  <Feather name="navigation" size={14} color="#FFFFFF" />
                </View>
              ) : null}
            </View>

            {/* Mamoudzou Terminal */}
            <View style={styles.terminalSection}>
              <View style={[styles.terminalIcon, { backgroundColor: theme.primary }]}>
                <Feather name="anchor" size={24} color="#FFFFFF" />
              </View>
              <ThemedText style={styles.terminalName}>
                {TERMINALS.MAMOUDZOU.shortName}
              </ThemedText>
              <ThemedText style={[styles.terminalFullName, { color: theme.textSecondary }]}>
                {TERMINALS.MAMOUDZOU.name}
              </ThemedText>
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

          {/* Info Box */}
          <View style={[styles.infoBox, { backgroundColor: theme.backgroundSecondary }]}>
            <Feather name="map-pin" size={18} color={theme.primary} />
            <ThemedText style={[styles.infoBoxText, { color: theme.textSecondary }]}>
              Trajet: Petite-Terre ↔ Grande-Terre (15-20 min)
            </ThemedText>
          </View>
        </View>
      </ScreenScrollView>

      {currentAlert ? (
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
      ) : null}

      <View
        style={[
          styles.searchContainer,
          {
            bottom: tabBarHeight + Spacing.xl,
          },
        ]}
      >
        <SearchBar placeholder="On va où ?" />
      </View>
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
  routeContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: Spacing.xl,
  },
  terminalSection: {
    alignItems: "center",
    flex: 1,
  },
  terminalIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: Spacing.sm,
  },
  terminalName: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: Spacing.xs,
  },
  terminalFullName: {
    fontSize: 12,
  },
  routeLine: {
    flex: 1,
    height: 3,
    backgroundColor: "transparent",
    marginHorizontal: Spacing.md,
    position: "relative",
  },
  dottedLine: {
    flex: 1,
    height: 2,
  },
  ferryIndicator: {
    position: "absolute",
    width: 24,
    height: 24,
    borderRadius: 12,
    top: -10,
    alignItems: "center",
    justifyContent: "center",
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
  infoBox: {
    flexDirection: "row",
    padding: Spacing.md,
    borderRadius: BorderRadius.xs,
    alignItems: "center",
    gap: Spacing.md,
  },
  infoBoxText: {
    fontSize: 13,
    flex: 1,
  },
  alertContainer: {
    position: "absolute",
    left: Spacing.lg,
    right: Spacing.lg,
    zIndex: 10,
  },
  searchContainer: {
    position: "absolute",
    left: Spacing.lg,
    right: Spacing.lg,
    zIndex: 10,
  },
});
