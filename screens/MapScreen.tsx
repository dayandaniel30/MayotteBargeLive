import React, { useState, useEffect, useRef } from "react";
import { View, StyleSheet, Pressable } from "react-native";
import { Feather } from "@expo/vector-icons";
import MapView, { Marker, Polyline } from "react-native-maps";
import { useNavigation } from "@react-navigation/native";
import { AlertBanner } from "@/components/AlertBanner";
import { ThemedText } from "@/components/ThemedText";
import { useTheme } from "@/hooks/useTheme";
import { useScreenInsets } from "@/hooks/useScreenInsets";
import { Spacing, BorderRadius } from "@/constants/theme";
import { TERMINALS } from "@/utils/schedules";
import { getCurrentAlert, getAlertSeverityType } from "@/utils/alerts";
import { getSimulatedFerries, FerryPosition } from "@/utils/ferrySimulation";

const DZAOUDZI_COORDS = { latitude: 12.7769, longitude: 45.2937 };
const MAMOUDZOU_COORDS = { latitude: 12.7835, longitude: 45.2297 };

export default function MapScreen() {
  const { theme, isDark } = useTheme();
  const { headerHeight, tabBarHeight } = useScreenInsets();
  const navigation = useNavigation<any>();
  const mapRef = useRef<MapView>(null);
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

  const calculateFerryPosition = (progress: number) => {
    return {
      latitude: DZAOUDZI_COORDS.latitude + (MAMOUDZOU_COORDS.latitude - DZAOUDZI_COORDS.latitude) * progress,
      longitude: DZAOUDZI_COORDS.longitude + (MAMOUDZOU_COORDS.longitude - DZAOUDZI_COORDS.longitude) * progress,
    };
  };

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={{
          latitude: 12.78,
          longitude: 45.26,
          latitudeDelta: 0.05,
          longitudeDelta: 0.08,
        }}
        mapType={isDark ? "standard" : "standard"}
        customMapStyle={isDark ? darkMapStyle : lightMapStyle}
        pitchEnabled={false}
        rotateEnabled={false}
        zoomControlEnabled={true}
      >
        {/* Route Line */}
        <Polyline
          coordinates={[DZAOUDZI_COORDS, MAMOUDZOU_COORDS]}
          strokeColor={theme.primary}
          strokeWidth={3}
          lineDashPattern={[5, 5]}
        />

        {/* Dzaoudzi Terminal */}
        <Marker
          coordinate={DZAOUDZI_COORDS}
          title={TERMINALS.DZAOUDZI.shortName}
          description={TERMINALS.DZAOUDZI.name}
        >
          <View style={[styles.markerContainer, { backgroundColor: theme.primary }]}>
            <Feather name="anchor" size={20} color="#FFFFFF" />
          </View>
        </Marker>

        {/* Mamoudzou Terminal */}
        <Marker
          coordinate={MAMOUDZOU_COORDS}
          title={TERMINALS.MAMOUDZOU.shortName}
          description={TERMINALS.MAMOUDZOU.name}
        >
          <View style={[styles.markerContainer, { backgroundColor: theme.primary }]}>
            <Feather name="anchor" size={20} color="#FFFFFF" />
          </View>
        </Marker>

        {/* Ferry Position */}
        {ferries.length > 0 && (
          <Marker
            coordinate={calculateFerryPosition(ferries[0].progress)}
            title="Barge"
            description={`Destination: ${ferries[0].direction === "dzaoudzi-mamoudzou" ? "Mamoudzou" : "Dzaoudzi"}`}
          >
            <View style={[styles.ferryMarker, { backgroundColor: theme.warning }]}>
              <Feather name="navigation" size={18} color="#FFFFFF" />
            </View>
          </Marker>
        )}
      </MapView>

      {/* Info Card */}
      {ferries.length > 0 && (
        <View style={[styles.infoCard, { backgroundColor: theme.card }]}>
          <Feather name="info" size={18} color={theme.warning} style={{ marginRight: Spacing.md }} />
          <View style={styles.infoTextContainer}>
            <ThemedText style={styles.infoTitle}>Barge en route</ThemedText>
            <ThemedText style={[styles.infoDetail, { color: theme.textSecondary }]}>
              Destination: {ferries[0].direction === "dzaoudzi-mamoudzou" ? "Mamoudzou" : "Dzaoudzi"} • Arrivée: {ferries[0].arrivalTime}
            </ThemedText>
          </View>
        </View>
      )}

      {/* Buy Button */}
      <Pressable
        style={[
          styles.buyButton,
          { backgroundColor: theme.primary, bottom: tabBarHeight + Spacing.xl },
        ]}
        onPress={() => navigation.navigate("TicketsTab")}
      >
        <Feather name="shopping-cart" size={20} color="#FFFFFF" />
        <ThemedText style={styles.buyButtonText}>Acheter un billet</ThemedText>
      </Pressable>

      {currentAlert && (
        <View style={[styles.alertContainer, { top: headerHeight + Spacing.lg }]}>
          <AlertBanner
            message={currentAlert.message}
            type={getAlertSeverityType(currentAlert.severity)}
          />
        </View>
      )}
    </View>
  );
}

const lightMapStyle = [
  { elementType: "geometry", stylers: [{ color: "#f5f5f5" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#616161" }] },
  { featureType: "water", elementType: "geometry", stylers: [{ color: "#c9c9c9" }] },
];

const darkMapStyle = [
  { elementType: "geometry", stylers: [{ color: "#212121" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#757575" }] },
  { featureType: "water", elementType: "geometry", stylers: [{ color: "#000000" }] },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  markerContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 8,
  },
  ferryMarker: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 10,
  },
  infoCard: {
    position: "absolute",
    bottom: 100,
    left: Spacing.lg,
    right: Spacing.lg,
    padding: Spacing.lg,
    borderRadius: BorderRadius.sm,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  infoTextContainer: {
    flex: 1,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  infoDetail: {
    fontSize: 12,
  },
  buyButton: {
    position: "absolute",
    right: Spacing.lg,
    flexDirection: "row",
    alignItems: "center",
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
    marginLeft: Spacing.sm,
    fontSize: 14,
  },
  alertContainer: {
    position: "absolute",
    left: Spacing.lg,
    right: Spacing.lg,
  },
});
