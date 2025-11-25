import React from "react";
import { View, StyleSheet, Switch, Pressable, Linking } from "react-native";
import { Feather } from "@expo/vector-icons";
import { ScreenScrollView } from "@/components/ScreenScrollView";
import { ThemedText } from "@/components/ThemedText";
import { useTheme } from "@/hooks/useTheme";
import { useSettings } from "@/hooks/useSettings";
import { Spacing, BorderRadius, Typography } from "@/constants/theme";

interface SettingItemProps {
  icon: string;
  title: string;
  value?: string;
  type?: "toggle" | "link" | "text";
  toggleValue?: boolean;
  onToggle?: (value: boolean) => void;
  onPress?: () => void;
}

function SettingItem({ icon, title, value, type = "text", toggleValue, onToggle, onPress }: SettingItemProps) {
  const { theme } = useTheme();

  return (
    <Pressable
      style={[styles.settingItem, { backgroundColor: theme.card }]}
      onPress={onPress}
      disabled={type === "toggle"}
    >
      <View style={styles.settingLeft}>
        <Feather name={icon as any} size={20} color={theme.primary} style={styles.settingIcon} />
        <ThemedText style={styles.settingTitle}>{title}</ThemedText>
      </View>

      {type === "toggle" && onToggle ? (
        <Switch
          value={toggleValue}
          onValueChange={onToggle}
          trackColor={{ false: theme.border, true: theme.primary }}
          thumbColor="#FFFFFF"
        />
      ) : type === "link" ? (
        <Feather name="chevron-right" size={20} color={theme.textSecondary} />
      ) : value ? (
        <ThemedText style={[styles.settingValue, { color: theme.textSecondary }]}>
          {value}
        </ThemedText>
      ) : null}
    </Pressable>
  );
}

export default function SettingsScreen() {
  const { theme } = useTheme();
  const { settings, saveSettings, isLoading } = useSettings();

  const handleContactSTM = () => {
    Linking.openURL("tel:0269643970");
  };

  if (isLoading) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: theme.backgroundDefault }]}>
        <ThemedText>Chargement...</ThemedText>
      </View>
    );
  }

  return (
    <ScreenScrollView>
      <View style={styles.section}>
        <ThemedText style={styles.sectionTitle}>Notifications</ThemedText>
        
        <SettingItem
          icon="bell"
          title="Alertes de service"
          type="toggle"
          toggleValue={settings.alertsEnabled}
          onToggle={(value) => saveSettings({ alertsEnabled: value })}
        />
        
        <SettingItem
          icon="alert-triangle"
          title="Retards importants (>10 min)"
          type="toggle"
          toggleValue={settings.delayAlertsEnabled}
          onToggle={(value) => saveSettings({ delayAlertsEnabled: value })}
        />
      </View>

      <View style={styles.section}>
        <ThemedText style={styles.sectionTitle}>Affichage</ThemedText>
        
        <SettingItem
          icon="globe"
          title="Langue"
          value="Français"
          type="link"
          onPress={() => console.log("Change language")}
        />
        
        <SettingItem
          icon="moon"
          title="Thème sombre"
          type="toggle"
          toggleValue={settings.darkModeEnabled}
          onToggle={(value) => saveSettings({ darkModeEnabled: value })}
        />
      </View>

      <View style={styles.section}>
        <ThemedText style={styles.sectionTitle}>Favoris</ThemedText>
        
        <SettingItem
          icon="arrow-right"
          title="Dzaoudzi → Mamoudzou"
          type="toggle"
          toggleValue={settings.dzaoudziToMamoudzou}
          onToggle={(value) => saveSettings({ dzaoudziToMamoudzou: value })}
        />
        
        <SettingItem
          icon="arrow-left"
          title="Mamoudzou → Dzaoudzi"
          type="toggle"
          toggleValue={settings.mamoudzouToDzaoudzi}
          onToggle={(value) => saveSettings({ mamoudzouToDzaoudzi: value })}
        />
      </View>

      <View style={styles.section}>
        <ThemedText style={styles.sectionTitle}>Tarifs & Informations</ThemedText>
        
        <View style={[styles.settingItem, { backgroundColor: theme.card, flexDirection: "column", alignItems: "flex-start" }]}>
          <View style={[styles.settingLeft, { marginBottom: Spacing.md }]}>
            <Feather name="dollar-sign" size={20} color={theme.primary} style={styles.settingIcon} />
            <ThemedText style={styles.settingTitle}>Tarification</ThemedText>
          </View>
          
          <View style={styles.tarifDetails}>
            <ThemedText style={[styles.tarifLine, { color: theme.text }]}>
              Piéton (Petite → Grande-Terre) : Gratuit
            </ThemedText>
            <ThemedText style={[styles.tarifLine, { color: theme.text }]}>
              Piéton (Grande → Petite-Terre) : 0,75€
            </ThemedText>
            <ThemedText style={[styles.tarifLine, { color: theme.text }]}>
              Véhicule : 15€
            </ThemedText>
            <ThemedText style={[styles.tarifLine, { color: theme.text }]}>
              Moto : 5€
            </ThemedText>
            <ThemedText style={[styles.tarifLine, { color: theme.text, marginTop: Spacing.sm }]}>
              Durée du trajet : 15-20 minutes
            </ThemedText>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <ThemedText style={styles.sectionTitle}>À propos</ThemedText>
        
        <SettingItem
          icon="info"
          title="Version de l'application"
          value="1.0.0"
          type="text"
        />
        
        <SettingItem
          icon="phone"
          title="Contact STM"
          value="0269 64 39 70"
          type="link"
          onPress={handleContactSTM}
        />
        
        <SettingItem
          icon="file-text"
          title="Mentions légales"
          type="link"
          onPress={() => console.log("Legal info")}
        />
      </View>

      <View style={[styles.infoCard, { backgroundColor: theme.backgroundSecondary }]}>
        <Feather name="map-pin" size={20} color={theme.primary} style={styles.infoIcon} />
        <ThemedText style={[styles.infoText, { color: theme.textSecondary }]}>
          Service Transport Maritime (STM){"\n"}
          Boulevard des Crabes, Dzaoudzi{"\n"}
          Mayotte, France
        </ThemedText>
      </View>
    </ScreenScrollView>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  section: {
    marginBottom: Spacing.xl,
  },
  sectionTitle: {
    ...Typography.h2,
    marginBottom: Spacing.lg,
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: Spacing.lg,
    borderRadius: BorderRadius.sm,
    marginBottom: Spacing.sm,
  },
  settingLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  settingIcon: {
    marginRight: Spacing.md,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: "500",
  },
  settingValue: {
    fontSize: 14,
  },
  infoCard: {
    flexDirection: "row",
    padding: Spacing.lg,
    borderRadius: BorderRadius.sm,
    marginTop: Spacing.md,
    marginBottom: Spacing.xl,
  },
  infoIcon: {
    marginRight: Spacing.md,
    marginTop: Spacing.xs,
  },
  infoText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
  },
  tarifDetails: {
    width: "100%",
  },
  tarifLine: {
    fontSize: 14,
    marginBottom: Spacing.xs,
  },
});
