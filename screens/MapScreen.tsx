import React, { useState, useRef } from "react";
import { View, StyleSheet, Platform } from "react-native";
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from "react-native-maps";
import { Feather } from "@expo/vector-icons";
import { SearchBar } from "@/components/SearchBar";
import { AlertBanner } from "@/components/AlertBanner";
import { useTheme } from "@/hooks/useTheme";
import { useScreenInsets } from "@/hooks/useScreenInsets";
import { Colors, Spacing } from "@/constants/theme";
import { TERMINALS } from "@/utils/schedules";

const MAYOTTE_REGION = {
  latitude: -12.7847,
  longitude: 45.2478,
  latitudeDelta: 0.05,
  longitudeDelta: 0.05,
};

const MAP_STYLE = [
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: "#A8D5E2" }],
  },
  {
    featureType: "landscape",
    elementType: "geometry",
    stylers: [{ color: "#F0E6D2" }],
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [{ color: "#D4C5A9" }],
  },
];

export default function MapScreen() {
  const { theme } = useTheme();
  const { headerHeight, tabBarHeight } = useScreenInsets();
  const mapRef = useRef<MapView>(null);
  const [showAlert, setShowAlert] = useState(true);

  const handleSearchPress = () => {
    console.log("Search pressed");
  };

  const polylineCoordinates = [
    TERMINALS.DZAOUDZI.coordinates,
    TERMINALS.MAMOUDZOU.coordinates,
  ];

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        provider={Platform.OS === "android" ? PROVIDER_GOOGLE : undefined}
        initialRegion={MAYOTTE_REGION}
        customMapStyle={MAP_STYLE}
        showsUserLocation
        showsMyLocationButton={false}
        showsCompass={false}
      >
        <Marker
          coordinate={TERMINALS.DZAOUDZI.coordinates}
          title={TERMINALS.DZAOUDZI.name}
          description={TERMINALS.DZAOUDZI.shortName}
        >
          <View style={styles.markerContainer}>
            <View style={[styles.marker, { backgroundColor: theme.primary }]}>
              <Feather name="anchor" size={20} color="#FFFFFF" />
            </View>
          </View>
        </Marker>

        <Marker
          coordinate={TERMINALS.MAMOUDZOU.coordinates}
          title={TERMINALS.MAMOUDZOU.name}
          description={TERMINALS.MAMOUDZOU.shortName}
        >
          <View style={styles.markerContainer}>
            <View style={[styles.marker, { backgroundColor: theme.primary }]}>
              <Feather name="anchor" size={20} color="#FFFFFF" />
            </View>
          </View>
        </Marker>

        <Polyline
          coordinates={polylineCoordinates}
          strokeColor={theme.primary}
          strokeWidth={3}
          lineDashPattern={[10, 5]}
        />
      </MapView>

      {showAlert ? (
        <View
          style={[
            styles.alertContainer,
            {
              top: headerHeight + Spacing.lg,
            },
          ]}
        >
          <AlertBanner message="Service normal - Horaires respectés" type="info" />
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
        <SearchBar placeholder="On va où ?" onPress={handleSearchPress} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  markerContainer: {
    alignItems: "center",
  },
  marker: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    borderColor: "#FFFFFF",
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
