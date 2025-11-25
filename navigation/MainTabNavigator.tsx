import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { Platform, StyleSheet } from "react-native";
import MapScreen from "@/screens/MapScreen";
import SchedulesScreen from "@/screens/SchedulesScreen";
import SettingsScreen from "@/screens/SettingsScreen";
import { useTheme } from "@/hooks/useTheme";
import { HeaderTitle } from "@/components/HeaderTitle";
import { getCommonScreenOptions } from "./screenOptions";

export type MainTabParamList = {
  MapTab: undefined;
  SchedulesTab: undefined;
  SettingsTab: undefined;
};

const Tab = createBottomTabNavigator<MainTabParamList>();

export default function MainTabNavigator() {
  const { theme, isDark } = useTheme();

  return (
    <Tab.Navigator
      initialRouteName="MapTab"
      screenOptions={{
        tabBarActiveTintColor: theme.tabIconSelected,
        tabBarInactiveTintColor: theme.tabIconDefault,
        tabBarStyle: {
          position: "absolute",
          backgroundColor: Platform.select({
            ios: "transparent",
            android: theme.backgroundRoot,
          }),
          borderTopWidth: 0,
          elevation: 0,
        },
        tabBarBackground: () =>
          Platform.OS === "ios" ? (
            <BlurView
              intensity={100}
              tint={isDark ? "dark" : "light"}
              style={StyleSheet.absoluteFill}
            />
          ) : null,
        headerTitleAlign: "center",
        headerTransparent: false,
        headerTintColor: theme.text,
        headerStyle: {
          backgroundColor: theme.backgroundRoot,
        },
      }}
    >
      <Tab.Screen
        name="MapTab"
        component={MapScreen}
        options={{
          title: "Carte",
          headerTitle: () => <HeaderTitle title="Barge de Mayotte" />,
          headerRight: () => null,
          headerTransparent: true,
          headerStyle: {
            backgroundColor: Platform.select({
              ios: "transparent",
              android: theme.backgroundRoot,
            }),
          },
          tabBarIcon: ({ color, size }) => (
            <Feather name="map" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="SchedulesTab"
        component={SchedulesScreen}
        options={{
          title: "Horaires",
          headerTransparent: false,
          tabBarIcon: ({ color, size }) => (
            <Feather name="clock" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="SettingsTab"
        component={SettingsScreen}
        options={{
          title: "Paramètres",
          headerTransparent: false,
          tabBarIcon: ({ color, size }) => (
            <Feather name="settings" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
