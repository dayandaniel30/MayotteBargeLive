import React, { useState } from "react";
import { View, StyleSheet, Pressable } from "react-native";
import { Feather } from "@expo/vector-icons";
import { ScreenScrollView } from "@/components/ScreenScrollView";
import { ThemedText } from "@/components/ThemedText";
import { useTheme } from "@/hooks/useTheme";
import { Spacing, BorderRadius, Typography } from "@/constants/theme";
import { PRICING_INFO, getDurationText } from "@/utils/pricing";
import { useCart } from "@/hooks/useCart";

export interface TicketOption {
  id: "pedestrian" | "vehicle" | "motorcycle";
  label: string;
  description: string;
  icon: string;
  prices: {
    dzaoudziToMamoudzou: string;
    mamoudzouToDzaoudzi: string;
  };
  priceNote?: string;
}

const TICKET_OPTIONS: TicketOption[] = [
  {
    id: "pedestrian",
    label: "Billet Piéton",
    description: "Pour les passagers à pied",
    icon: "users",
    prices: {
      dzaoudziToMamoudzou: PRICING_INFO.pedestrian.dzaoudziToMamoudzou,
      mamoudzouToDzaoudzi: PRICING_INFO.pedestrian.mamoudzouToDzaoudzi,
    },
    priceNote: "Gratuit Petite-Terre → Grande-Terre",
  },
  {
    id: "vehicle",
    label: "Billet Véhicule",
    description: "Pour les voitures et utilitaires",
    icon: "truck",
    prices: {
      dzaoudziToMamoudzou: PRICING_INFO.vehicle.price,
      mamoudzouToDzaoudzi: PRICING_INFO.vehicle.price,
    },
    priceNote: "Bidirectionnel",
  },
  {
    id: "motorcycle",
    label: "Billet Moto",
    description: "Pour les motos et scooters",
    icon: "navigation",
    prices: {
      dzaoudziToMamoudzou: PRICING_INFO.motorcycle.price,
      mamoudzouToDzaoudzi: PRICING_INFO.motorcycle.price,
    },
    priceNote: "Bidirectionnel",
  },
];

interface TicketPurchaseScreenProps {
  onSelectTicket?: (ticketId: string, price: number) => void;
  onClose?: () => void;
}

export default function TicketPurchaseScreen({
  onSelectTicket,
  onClose,
}: TicketPurchaseScreenProps = {}) {
  const { theme } = useTheme();
  const [selectedTicket, setSelectedTicket] = useState<string | null>(null);
  const { addToCart } = useCart();

  const handleSelectTicket = (ticket: TicketOption) => {
    // Extract numeric price for pedestrian
    let price = 0;
    if (ticket.id === "pedestrian") {
      // For pedestrian, use the Mamoudzou to Dzaoudzi price (0.75€)
      price = 0.75;
    } else if (ticket.id === "vehicle") {
      price = 15;
    } else if (ticket.id === "motorcycle") {
      price = 5;
    }
    
    addToCart({
      id: ticket.id,
      label: ticket.label,
      price,
      quantity: 1,
    });

    if (onSelectTicket) {
      onSelectTicket(ticket.id, price);
    }
  };

  return (
    <ScreenScrollView>
      <View style={[styles.container, { backgroundColor: theme.backgroundRoot }]}>
        {/* Header */}
        <View style={styles.header}>
          {onClose && (
            <Pressable onPress={onClose} style={styles.closeButton}>
              <Feather name="x" size={28} color={theme.text} />
            </Pressable>
          )}
          <ThemedText style={[styles.title, Typography.h1]}>
            Acheter un billet
          </ThemedText>
          <View style={{ width: 40 }} />
        </View>

        {/* Info Box */}
        <View
          style={[
            styles.infoBox,
            { backgroundColor: theme.info + "20", borderColor: theme.info },
          ]}
        >
          <Feather name="info" size={16} color={theme.info} />
          <ThemedText style={[styles.infoText, { color: theme.info }]}>
            Trajet: {getDurationText()}
          </ThemedText>
        </View>

        {/* Ticket Options */}
        <View style={styles.ticketsContainer}>
          {TICKET_OPTIONS.map((ticket) => (
            <Pressable
              key={ticket.id}
              onPress={() => {
                setSelectedTicket(ticket.id);
                handleSelectTicket(ticket);
              }}
              style={[
                styles.ticketCard,
                {
                  backgroundColor:
                    selectedTicket === ticket.id
                      ? theme.primary + "20"
                      : theme.card,
                  borderColor:
                    selectedTicket === ticket.id
                      ? theme.primary
                      : theme.border,
                },
              ]}
            >
              {/* Icon */}
              <View
                style={[
                  styles.iconContainer,
                  { backgroundColor: theme.primary + "20" },
                ]}
              >
                <Feather
                  name={ticket.icon as any}
                  size={32}
                  color={theme.primary}
                />
              </View>

              {/* Content */}
              <View style={styles.ticketContent}>
                <ThemedText style={[styles.ticketLabel, Typography.h3]}>
                  {ticket.label}
                </ThemedText>
                <ThemedText
                  style={[styles.ticketDescription, { color: theme.textSecondary }]}
                >
                  {ticket.description}
                </ThemedText>

                {/* Prices */}
                <View style={styles.pricesContainer}>
                  <View style={styles.priceRow}>
                    <ThemedText style={[styles.priceLabel, { color: theme.textSecondary }]}>
                      Dzaoudzi → Mamoudzou:
                    </ThemedText>
                    <ThemedText style={[styles.priceValue, { color: theme.primary }]}>
                      {ticket.prices.dzaoudziToMamoudzou}
                    </ThemedText>
                  </View>
                  <View style={styles.priceRow}>
                    <ThemedText style={[styles.priceLabel, { color: theme.textSecondary }]}>
                      Mamoudzou → Dzaoudzi:
                    </ThemedText>
                    <ThemedText style={[styles.priceValue, { color: theme.primary }]}>
                      {ticket.prices.mamoudzouToDzaoudzi}
                    </ThemedText>
                  </View>
                </View>

                {/* Note */}
                {ticket.priceNote && (
                  <ThemedText style={[styles.priceNote, { color: theme.textSecondary }]}>
                    {ticket.priceNote}
                  </ThemedText>
                )}
              </View>

              {/* Checkmark */}
              {selectedTicket === ticket.id && (
                <View style={styles.checkmark}>
                  <Feather name="check-circle" size={24} color={theme.primary} />
                </View>
              )}
            </Pressable>
          ))}
        </View>

        {/* Notes */}
        <View
          style={[
            styles.notesBox,
            { backgroundColor: theme.backgroundSecondary },
          ]}
        >
          <ThemedText style={[styles.notesTitle, { color: theme.textSecondary }]}>
            Important
          </ThemedText>
          <ThemedText style={[styles.noteText, { color: theme.textSecondary }]}>
            • Les billets sont valides pour le trajet spécifié uniquement
          </ThemedText>
          <ThemedText style={[styles.noteText, { color: theme.textSecondary }]}>
            • Présentez votre billet numérique à l'embarquement
          </ThemedText>
          <ThemedText style={[styles.noteText, { color: theme.textSecondary }]}>
            • Les enfants de moins de 5 ans voyagent gratuitement
          </ThemedText>
        </View>

        {selectedTicket && (
          <View style={styles.buttonContainer}>
            <Pressable
              onPress={onClose}
              style={[styles.button, { backgroundColor: theme.backgroundSecondary }]}
            >
              <ThemedText style={[styles.buttonText, { color: theme.text }]}>
                Continuer l'achat
              </ThemedText>
              <Feather name="arrow-right" size={18} color={theme.text} />
            </Pressable>
          </View>
        )}
      </View>
    </ScreenScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Spacing.lg,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: Spacing.xl,
  },
  closeButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    flex: 1,
    textAlign: "center",
  },
  infoBox: {
    flexDirection: "row",
    alignItems: "center",
    padding: Spacing.md,
    borderRadius: BorderRadius.xs,
    borderWidth: 1,
    marginBottom: Spacing.lg,
    gap: Spacing.md,
  },
  infoText: {
    flex: 1,
    fontSize: 14,
  },
  ticketsContainer: {
    gap: Spacing.lg,
    marginBottom: Spacing.xl,
  },
  ticketCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    padding: Spacing.lg,
    borderRadius: BorderRadius.sm,
    borderWidth: 2,
    gap: Spacing.lg,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: BorderRadius.xs,
    alignItems: "center",
    justifyContent: "center",
  },
  ticketContent: {
    flex: 1,
  },
  ticketLabel: {
    marginBottom: Spacing.xs,
  },
  ticketDescription: {
    fontSize: 13,
    marginBottom: Spacing.md,
  },
  pricesContainer: {
    gap: Spacing.sm,
    marginBottom: Spacing.md,
  },
  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  priceLabel: {
    fontSize: 12,
  },
  priceValue: {
    fontSize: 14,
    fontWeight: "600",
  },
  priceNote: {
    fontSize: 12,
    fontStyle: "italic",
  },
  checkmark: {
    position: "absolute",
    top: Spacing.md,
    right: Spacing.md,
  },
  notesBox: {
    padding: Spacing.md,
    borderRadius: BorderRadius.xs,
    marginBottom: Spacing.xl,
  },
  notesTitle: {
    fontSize: 12,
    fontWeight: "600",
    marginBottom: Spacing.md,
  },
  noteText: {
    fontSize: 12,
    lineHeight: 18,
    marginBottom: Spacing.xs,
  },
  buttonContainer: {
    gap: Spacing.md,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: Spacing.lg,
    borderRadius: BorderRadius.xs,
    gap: Spacing.md,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
  },
});
