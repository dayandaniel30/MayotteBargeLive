import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { Platform, StyleSheet, Pressable } from "react-native";
import MapScreen from "@/screens/MapScreen";
import SchedulesScreen from "@/screens/SchedulesScreen";
import SettingsScreen from "@/screens/SettingsScreen";
import TicketPurchaseScreen from "@/screens/TicketPurchaseScreen";
import CartScreen from "@/screens/CartScreen";
import TransportDemoScreen from "@/screens/TransportDemoScreen";
import { useTheme } from "@/hooks/useTheme";
import { HeaderTitle } from "@/components/HeaderTitle";
import { getCommonScreenOptions } from "./screenOptions";
import { Spacing } from "@/constants/theme";

export type MainTabParamList = {
  MapTab: undefined;
  SchedulesTab: undefined;
  TicketsTab: undefined;
  CartTab: undefined;
  TransportDemoTab: undefined;
  SettingsTab: undefined;
};

interface MainTabNavigatorProps {
  user?: any;
  onLogout?: () => void;
  onNavigateToTickets?: () => void;
}

const Tab = createBottomTabNavigator<MainTabParamList>();

export default function MainTabNavigator({
  user,
  onLogout,
}: MainTabNavigatorProps) {
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
          headerShown: false,
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
        name="TicketsTab"
        component={TicketPurchaseScreen}
        options={{
          title: "Billets",
          headerTransparent: false,
          tabBarIcon: ({ color, size }) => (
            <Feather name="ticket" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="CartTab"
        component={CartScreen}
        options={{
          title: "Panier",
          headerTransparent: false,
          tabBarIcon: ({ color, size }) => (
            <Feather name="shopping-cart" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="TransportDemoTab"
        component={TransportDemoScreen}
        options={{
          title: "Transport",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Feather name="navigation" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="SettingsTab"
        component={SettingsScreen}
        options={{
          title: "Paramètres",
          headerTransparent: false,
          headerRight: onLogout
            ? () => (
                <Pressable onPress={onLogout} style={{ marginRight: Spacing.lg }}>
                  <Feather name="log-out" size={20} color={theme.text} />
                </Pressable>
              )
            : undefined,
          tabBarIcon: ({ color, size }) => (
            <Feather name="settings" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
