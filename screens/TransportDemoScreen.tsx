import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Pressable,
  TextInput,
  StyleSheet,
  StatusBar,
  Platform,
} from "react-native";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

/**
 * Clean & Premium transport UI (Home / Schedule / Ticket) — React Native.
 * Reproduces the provided mockup using the Expo stack already in the project.
 * Navigation between the 3 screens is handled locally via useState so this
 * single screen can be dropped anywhere in the app (e.g. as a Tab).
 */

const NAVY = "#002266";
const NAVY_DARK = "#001a4d";
const BRAND_BLUE = "#1e63d1";
const WHITE = "#FFFFFF";
const SLATE_50 = "#F8FAFC";
const SLATE_100 = "#F1F5F9";
const SLATE_200 = "#E2E8F0";
const SLATE_300 = "#CBD5E1";
const SLATE_400 = "#94A3B8";

type ScreenName = "home" | "schedule" | "ticket";
type Schedule = { from: string; to: string };

const schedules: Schedule[] = [
  { from: "10 : 00", to: "10 : 30" },
  { from: "11 : 05", to: "11 : 45" },
  { from: "11 : 25", to: "12 : 30" },
  { from: "13 : 10", to: "13 : 45" },
];

export default function TransportDemoScreen() {
  const [screen, setScreen] = useState<ScreenName>("home");
  const [selected, setSelected] = useState<Schedule | null>(null);
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <StatusBar barStyle="light-content" backgroundColor={NAVY} />
      {screen === "home" && (
        <HomeView onSelectTransport={() => setScreen("schedule")} />
      )}
      {screen === "schedule" && (
        <ScheduleView
          onBack={() => setScreen("home")}
          onSelectSchedule={(s) => {
            setSelected(s);
            setScreen("ticket");
          }}
        />
      )}
      {screen === "ticket" && (
        <TicketView
          onBack={() => setScreen("schedule")}
          schedule={selected}
        />
      )}
    </View>
  );
}

/* -------------------------------- Home View ------------------------------- */

function HomeView({ onSelectTransport }: { onSelectTransport: () => void }) {
  return (
    <View style={styles.flex1}>
      <View style={styles.homeHeader}>
        <View style={styles.rowBetween}>
          <View>
            <Text style={styles.helloText}>Hello,</Text>
            <Text style={styles.helloText}>John Doe</Text>
            <Text style={styles.subTextLight}>Where you will go</Text>
          </View>
          <View style={styles.avatar} />
        </View>

        <View style={styles.searchBar}>
          <Feather name="search" size={18} color={NAVY} />
          <TextInput
            placeholder="Search"
            placeholderTextColor={SLATE_400}
            style={styles.searchInput}
          />
        </View>
      </View>

      <View style={styles.overlapCardWrap}>
        <View style={styles.overlapCard} />
      </View>

      <ScrollView
        style={styles.flex1}
        contentContainerStyle={styles.homeScroll}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.sectionTitle}>Choose your Transport</Text>

        <Pressable
          onPress={onSelectTransport}
          style={[styles.transportCard, { backgroundColor: BRAND_BLUE }]}
        >
          <View style={styles.flex1}>
            <Text style={styles.transportTitle}>Bus</Text>
            <View style={[styles.chip, { backgroundColor: NAVY }]}>
              <Text style={styles.chipTextLight}>Select</Text>
            </View>
          </View>
          <MaterialCommunityIcons name="bus" size={80} color={WHITE} />
        </Pressable>

        <Pressable
          onPress={onSelectTransport}
          style={[styles.transportCard, { backgroundColor: NAVY }]}
        >
          <View style={styles.flex1}>
            <Text style={styles.transportTitle}>MRT</Text>
            <View style={[styles.chip, { backgroundColor: WHITE }]}>
              <Text style={[styles.chipText, { color: NAVY }]}>Select</Text>
            </View>
          </View>
          <MaterialCommunityIcons name="train" size={80} color={WHITE} />
        </Pressable>

        <View style={{ height: 120 }} />
      </ScrollView>

      <BottomNav active="home" />
    </View>
  );
}

/* ------------------------------ Schedule View ----------------------------- */

function ScheduleView({
  onBack,
  onSelectSchedule,
}: {
  onBack: () => void;
  onSelectSchedule: (s: Schedule) => void;
}) {
  return (
    <View style={styles.flex1}>
      <View style={styles.scheduleHeader}>
        <View style={styles.rowBetween}>
          <Pressable onPress={onBack} style={styles.backButton}>
            <Feather name="arrow-left" size={20} color={WHITE} />
          </Pressable>
          <Text style={styles.headerTitle}>MRT</Text>
          <View style={{ width: 36 }} />
        </View>
        <View style={styles.trainHero}>
          <MaterialCommunityIcons name="train" size={130} color={WHITE} />
        </View>
      </View>

      <ScrollView
        style={[styles.flex1, styles.sheet]}
        contentContainerStyle={styles.scheduleScroll}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.tripCard}>
          <View style={styles.trackerRail}>
            <Feather name="map-pin" size={18} color={NAVY} />
            <View style={styles.dottedLine} />
            <Feather name="map-pin" size={18} color={NAVY} />
          </View>
          <View style={styles.flex1}>
            <Text style={styles.labelMuted}>From</Text>
            <Text style={styles.tripAddress}>
              Blue Castle, Indira Nagar, Bangalore
            </Text>
            <View style={{ height: 10 }} />
            <Text style={styles.labelMuted}>To</Text>
            <View style={styles.hairline} />
          </View>
        </View>

        <Text style={styles.sectionTitle}>Choose Schedule</Text>

        {schedules.map((s, i) => (
          <View key={i} style={styles.scheduleRow}>
            <View style={styles.rowCenter}>
              <Feather name="clock" size={16} color={NAVY} />
              <Text style={styles.timeText}>{s.from}</Text>
              <Text style={styles.arrow}>↔</Text>
              <Text style={styles.timeText}>{s.to}</Text>
            </View>
            <Pressable
              onPress={() => onSelectSchedule(s)}
              style={styles.selectPill}
            >
              <Text style={styles.selectPillText}>Select</Text>
            </Pressable>
          </View>
        ))}
      </ScrollView>

      <BottomNav active="map" />
    </View>
  );
}

/* ------------------------------- Ticket View ------------------------------ */

function TicketView({
  onBack,
  schedule,
}: {
  onBack: () => void;
  schedule: Schedule | null;
}) {
  const [payment, setPayment] = useState<"credit" | "ewallet">("credit");
  const s = schedule ?? { from: "10 : 00", to: "10 : 30" };

  return (
    <View style={styles.flex1}>
      <View style={styles.ticketHeader}>
        <Pressable onPress={onBack} style={styles.backButton}>
          <Feather name="arrow-left" size={20} color={WHITE} />
        </Pressable>
        <Text style={styles.headerTitle}>Ticket</Text>
        <View style={{ width: 36 }} />
      </View>

      <ScrollView
        style={[styles.flex1, styles.ticketSheet]}
        contentContainerStyle={styles.ticketScroll}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.ticketCard}>
          <View style={styles.flex1}>
            <View style={styles.rowStart}>
              <View style={styles.trackerRailSm}>
                <Feather name="map-pin" size={16} color={NAVY} />
                <View style={styles.dottedLineSm} />
                <Feather name="map-pin" size={16} color={NAVY} />
              </View>
              <View style={styles.flex1}>
                <Text style={styles.labelMuted}>From</Text>
                <View style={styles.hairline} />
                <View style={{ height: 8 }} />
                <Text style={styles.labelMuted}>To</Text>
                <View style={styles.hairline} />
              </View>
            </View>
            <View style={[styles.rowCenter, { marginTop: 12 }]}>
              <Feather name="clock" size={14} color={NAVY} />
              <Text style={styles.ticketMeta}>{s.from}</Text>
              <MaterialCommunityIcons name="train" size={14} color={NAVY} />
              <Text style={styles.ticketMeta}>{s.to}</Text>
            </View>
          </View>
          <View style={styles.qrBox}>
            <MaterialCommunityIcons
              name="qrcode"
              size={80}
              color={NAVY}
            />
          </View>
        </View>

        <Text style={styles.sectionTitle}>Payment</Text>
        <Text style={styles.paymentLabel}>Enter Amount</Text>
        <View style={styles.amountPill}>
          <Text style={styles.amountText}>$ 5.0</Text>
        </View>

        <PaymentOption
          label="Credit Card"
          icon="credit-card"
          active={payment === "credit"}
          onPress={() => setPayment("credit")}
        />
        <PaymentOption
          label="E-Wallet"
          icon="wallet"
          active={payment === "ewallet"}
          onPress={() => setPayment("ewallet")}
        />
      </ScrollView>

      <View style={styles.buyBar}>
        <Pressable style={styles.buyButton} onPress={() => undefined}>
          <Text style={styles.buyText}>Buy Ticket</Text>
          <Feather name="chevron-right" size={18} color={WHITE} />
        </Pressable>
      </View>
    </View>
  );
}

function PaymentOption({
  label,
  icon,
  active,
  onPress,
}: {
  label: string;
  icon: keyof typeof Feather.glyphMap;
  active: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.paymentOption,
        {
          backgroundColor: active ? NAVY : WHITE,
          borderColor: active ? NAVY : SLATE_200,
        },
      ]}
    >
      <View style={styles.rowCenter}>
        <Feather name={icon} size={18} color={active ? WHITE : NAVY} />
        <Text
          style={[
            styles.paymentOptionText,
            { color: active ? WHITE : NAVY },
          ]}
        >
          {label}
        </Text>
      </View>
      <Text
        style={[
          styles.paymentBalance,
          { color: active ? "rgba(255,255,255,0.8)" : SLATE_400 },
        ]}
      >
        Balance :
      </Text>
    </Pressable>
  );
}

/* ------------------------------- Bottom Nav ------------------------------- */

function BottomNav({ active }: { active: "home" | "profile" | "map" }) {
  const items: { key: "home" | "profile" | "map"; icon: keyof typeof Feather.glyphMap }[] = [
    { key: "home", icon: "home" },
    { key: "profile", icon: "user" },
    { key: "map", icon: "map-pin" },
  ];
  return (
    <View style={styles.bottomNav}>
      {items.map(({ key, icon }) => (
        <View key={key} style={styles.navItem}>
          <Feather
            name={icon}
            size={24}
            color={active === key ? NAVY : SLATE_400}
          />
        </View>
      ))}
    </View>
  );
}

/* --------------------------------- Styles --------------------------------- */

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: NAVY },
  flex1: { flex: 1 },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  rowCenter: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  rowStart: { flexDirection: "row", alignItems: "flex-start" },

  /* Home */
  homeHeader: {
    backgroundColor: NAVY,
    paddingHorizontal: 28,
    paddingTop: 20,
    paddingBottom: 100,
  },
  helloText: {
    color: WHITE,
    fontSize: 28,
    fontWeight: "700",
    lineHeight: 34,
  },
  subTextLight: { color: "rgba(255,255,255,0.75)", fontSize: 13, marginTop: 10 },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.3)",
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.2)",
  },
  searchBar: {
    marginTop: 18,
    backgroundColor: WHITE,
    borderRadius: 999,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 18,
    height: 48,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
  },
  searchInput: { flex: 1, color: NAVY, fontSize: 14, padding: 0 },
  overlapCardWrap: {
    marginTop: -60,
    paddingHorizontal: 28,
  },
  overlapCard: {
    backgroundColor: WHITE,
    borderRadius: 24,
    height: 90,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
  homeScroll: {
    paddingHorizontal: 28,
    paddingTop: 26,
    backgroundColor: SLATE_50,
  },
  sectionTitle: {
    color: NAVY,
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 14,
  },
  transportCard: {
    borderRadius: 28,
    padding: 20,
    marginBottom: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: NAVY_DARK,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 14,
    elevation: 5,
  },
  transportTitle: {
    color: WHITE,
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 14,
  },
  chip: {
    alignSelf: "flex-start",
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 999,
  },
  chipText: { fontSize: 12, fontWeight: "700" },
  chipTextLight: { color: WHITE, fontSize: 12, fontWeight: "700" },

  /* Schedule */
  scheduleHeader: {
    backgroundColor: NAVY,
    paddingHorizontal: 28,
    paddingTop: 20,
    paddingBottom: 30,
  },
  headerTitle: { color: WHITE, fontSize: 22, fontWeight: "700" },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(255,255,255,0.12)",
    alignItems: "center",
    justifyContent: "center",
  },
  trainHero: { alignItems: "center", paddingVertical: 14 },
  sheet: {
    backgroundColor: WHITE,
    marginTop: -18,
    borderTopLeftRadius: 36,
    borderTopRightRadius: 36,
  },
  scheduleScroll: {
    paddingHorizontal: 28,
    paddingTop: 28,
    paddingBottom: 140,
  },
  tripCard: {
    backgroundColor: WHITE,
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: SLATE_100,
    marginBottom: 22,
    flexDirection: "row",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 2,
  },
  trackerRail: { alignItems: "center", marginRight: 14 },
  trackerRailSm: { alignItems: "center", marginRight: 10 },
  dottedLine: {
    flex: 1,
    width: 2,
    minHeight: 28,
    borderLeftWidth: 2,
    borderLeftColor: SLATE_300,
    borderStyle: "dashed",
    marginVertical: 4,
  },
  dottedLineSm: {
    flex: 1,
    width: 2,
    minHeight: 20,
    borderLeftWidth: 2,
    borderLeftColor: SLATE_300,
    borderStyle: "dashed",
    marginVertical: 4,
  },
  labelMuted: { color: SLATE_400, fontSize: 12, fontWeight: "500", marginBottom: 4 },
  tripAddress: { color: NAVY, fontSize: 14, fontWeight: "600" },
  hairline: {
    height: 1,
    backgroundColor: SLATE_200,
    width: "75%",
    marginTop: 6,
  },
  scheduleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: WHITE,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: SLATE_100,
    padding: 14,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 1,
  },
  timeText: { color: NAVY, fontSize: 14, fontWeight: "700" },
  arrow: { color: SLATE_400, fontSize: 14 },
  selectPill: {
    backgroundColor: NAVY,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 999,
  },
  selectPillText: { color: WHITE, fontSize: 12, fontWeight: "700" },

  /* Ticket */
  ticketHeader: {
    backgroundColor: NAVY,
    paddingHorizontal: 28,
    paddingTop: 20,
    paddingBottom: 70,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  ticketSheet: {
    backgroundColor: SLATE_50,
    marginTop: -28,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
  },
  ticketScroll: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 160,
  },
  ticketCard: {
    backgroundColor: WHITE,
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: SLATE_100,
    flexDirection: "row",
    gap: 14,
    marginBottom: 22,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 2,
  },
  ticketMeta: { color: NAVY, fontSize: 12, fontWeight: "700" },
  qrBox: {
    width: 92,
    height: 92,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: SLATE_200,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: WHITE,
  },
  paymentLabel: {
    color: NAVY,
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 10,
  },
  amountPill: {
    backgroundColor: "rgba(203,213,225,0.6)",
    borderRadius: 999,
    paddingHorizontal: 20,
    paddingVertical: 12,
    marginBottom: 22,
  },
  amountText: { color: NAVY, fontSize: 14, fontWeight: "700" },
  paymentOption: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 999,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderWidth: 1,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 1,
  },
  paymentOptionText: { fontSize: 14, fontWeight: "700", marginLeft: 6 },
  paymentBalance: { fontSize: 12 },
  buyBar: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: SLATE_50,
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: Platform.select({ ios: 28, default: 20 }),
  },
  buyButton: {
    backgroundColor: NAVY,
    borderRadius: 20,
    paddingVertical: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    shadowColor: NAVY_DARK,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 6,
  },
  buyText: { color: WHITE, fontSize: 16, fontWeight: "700", letterSpacing: 0.3 },

  /* Bottom nav */
  bottomNav: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 14,
    paddingHorizontal: 40,
    backgroundColor: "rgba(255,255,255,0.95)",
    borderTopWidth: 1,
    borderTopColor: SLATE_100,
  },
  navItem: { padding: 8 },
});
