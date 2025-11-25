import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface UserSettings {
  alertsEnabled: boolean;
  delayAlertsEnabled: boolean;
  darkModeEnabled: boolean;
  dzaoudziToMamoudzou: boolean;
  mamoudzouToDzaoudzi: boolean;
  language: "fr" | "en";
}

const DEFAULT_SETTINGS: UserSettings = {
  alertsEnabled: true,
  delayAlertsEnabled: true,
  darkModeEnabled: false,
  dzaoudziToMamoudzou: false,
  mamoudzouToDzaoudzi: false,
  language: "fr",
};

const SETTINGS_KEY = "@barge_mayotte_settings";

export function useSettings() {
  const [settings, setSettings] = useState<UserSettings>(DEFAULT_SETTINGS);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const stored = await AsyncStorage.getItem(SETTINGS_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setSettings({ ...DEFAULT_SETTINGS, ...parsed });
      }
    } catch (error) {
      console.error("Failed to load settings:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveSettings = async (newSettings: Partial<UserSettings>) => {
    try {
      const updated = { ...settings, ...newSettings };
      setSettings(updated);
      await AsyncStorage.setItem(SETTINGS_KEY, JSON.stringify(updated));
    } catch (error) {
      console.error("Failed to save settings:", error);
    }
  };

  const resetSettings = async () => {
    try {
      setSettings(DEFAULT_SETTINGS);
      await AsyncStorage.removeItem(SETTINGS_KEY);
    } catch (error) {
      console.error("Failed to reset settings:", error);
    }
  };

  return {
    settings,
    saveSettings,
    resetSettings,
    isLoading,
  };
}
