import React, { useState, useEffect } from "react";
import { View, StyleSheet, Pressable, Dimensions } from "react-native";
import { Feather } from "@expo/vector-icons";
import { WebView } from "react-native-webview";
import { useNavigation } from "@react-navigation/native";
import { AlertBanner } from "@/components/AlertBanner";
import { ThemedText } from "@/components/ThemedText";
import { useTheme } from "@/hooks/useTheme";
import { useScreenInsets } from "@/hooks/useScreenInsets";
import { Spacing, BorderRadius, Typography } from "@/constants/theme";
import { getCurrentAlert, getAlertSeverityType } from "@/utils/alerts";
import { getSimulatedFerries, FerryPosition } from "@/utils/ferrySimulation";

const DZAOUDZI_COORDS = { lat: 12.7769, lng: 45.2937 };
const MAMOUDZOU_COORDS = { lat: 12.7835, lng: 45.2297 };

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

  const ferryLat = ferries.length > 0 
    ? DZAOUDZI_COORDS.lat + (MAMOUDZOU_COORDS.lat - DZAOUDZI_COORDS.lat) * ferries[0].progress
    : null;
  const ferryLng = ferries.length > 0
    ? DZAOUDZI_COORDS.lng + (MAMOUDZOU_COORDS.lng - DZAOUDZI_COORDS.lng) * ferries[0].progress
    : null;

  const mapHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css" />
      <script src="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js"></script>
      <style>
        * { margin: 0; padding: 0; }
        html, body { width: 100%; height: 100%; }
        #map { width: 100%; height: 100%; }
        .info-popup { background: white; padding: 10px; border-radius: 4px; }
      </style>
    </head>
    <body>
      <div id="map"></div>
      <script>
        const map = L.map('map').setView([12.78, 45.26], 12);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors',
          maxZoom: 18,
        }).addTo(map);

        // Dzaoudzi Marker
        L.circleMarker([${DZAOUDZI_COORDS.lat}, ${DZAOUDZI_COORDS.lng}], {
          radius: 8,
          fillColor: '#2ECC71',
          color: '#fff',
          weight: 2,
          opacity: 1,
          fillOpacity: 0.8
        }).bindPopup('Dzaoudzi<br/>Petite-Terre').addTo(map);

        // Mamoudzou Marker
        L.circleMarker([${MAMOUDZOU_COORDS.lat}, ${MAMOUDZOU_COORDS.lng}], {
          radius: 8,
          fillColor: '#2ECC71',
          color: '#fff',
          weight: 2,
          opacity: 1,
          fillOpacity: 0.8
        }).bindPopup('Mamoudzou<br/>Grande-Terre').addTo(map);

        // Route Line
        const routeLine = L.polyline([
          [${DZAOUDZI_COORDS.lat}, ${DZAOUDZI_COORDS.lng}],
          [${MAMOUDZOU_COORDS.lat}, ${MAMOUDZOU_COORDS.lng}]
        ], {
          color: '#2ECC71',
          weight: 3,
          opacity: 0.5,
          dashArray: '5, 5'
        }).addTo(map);

        ${ferryLat !== null && ferryLng !== null ? `
        // Ferry Position
        L.circleMarker([${ferryLat}, ${ferryLng}], {
          radius: 10,
          fillColor: '#F39C12',
          color: '#fff',
          weight: 2,
          opacity: 1,
          fillOpacity: 1
        }).bindPopup('Barge en route').addTo(map);
        ` : ''}
      </script>
    </body>
    </html>
  `;

  return (
    <View style={styles.container}>
      <WebView
        source={{ html: mapHtml }}
        style={styles.webView}
        scrollEnabled={true}
        scalesPageToFit={true}
      />

      {/* Ferry Status Card */}
      {ferries.length > 0 && (
        <View style={[styles.ferryStatus, { backgroundColor: theme.card }]}>
          <Feather name="info" size={18} color={theme.warning} style={styles.infoIcon} />
          <View style={styles.ferryStatusText}>
            <ThemedText style={styles.ferryStatusTitle}>
              Barge en route
            </ThemedText>
            <ThemedText style={[styles.ferryStatusDetail, { color: theme.textSecondary }]}>
              Destination: {ferries[0].direction === "dzaoudzi-mamoudzou" ? "Mamoudzou" : "Dzaoudzi"} • Arrivée: {ferries[0].arrivalTime}
            </ThemedText>
          </View>
        </View>
      )}

      {/* Buy Button */}
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

      {/* Alert Banner */}
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webView: {
    flex: 1,
  },
  ferryStatus: {
    position: "absolute",
    bottom: 100,
    left: Spacing.lg,
    right: Spacing.lg,
    flexDirection: "row",
    padding: Spacing.md,
    borderRadius: BorderRadius.sm,
    alignItems: "flex-start",
    gap: Spacing.md,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
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
  },
  buyButton: {
    position: "absolute",
    right: Spacing.lg,
    bottom: Spacing.xl * 2,
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
  alertContainer: {
    position: "absolute",
    left: Spacing.lg,
    right: Spacing.lg,
    zIndex: 10,
  },
});
