import React, { useState } from "react";
import { View, StyleSheet, Pressable, TextInput } from "react-native";
import { Feather } from "@expo/vector-icons";
import { ThemedText } from "@/components/ThemedText";
import { useTheme } from "@/hooks/useTheme";
import { Spacing, BorderRadius, Typography } from "@/constants/theme";
import { ScreenKeyboardAwareScrollView } from "@/components/ScreenKeyboardAwareScrollView";
import { User } from "@/utils/auth";

interface CheckoutScreenProps {
  user: User;
  ticketType: "pedestrian" | "vehicle" | "motorcycle";
  price: number;
  onCheckout: (cardDetails: any) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

export default function CheckoutScreen({
  user,
  ticketType,
  price,
  onCheckout,
  onCancel,
  isLoading,
}: CheckoutScreenProps) {
  const { theme } = useTheme();
  const [cardNumber, setCardNumber] = useState("4242424242424242");
  const [expiryMonth, setExpiryMonth] = useState("12");
  const [expiryYear, setExpiryYear] = useState("25");
  const [cvc, setCvc] = useState("123");
  const [error, setError] = useState("");

  const getTicketLabel = () => {
    switch (ticketType) {
      case "pedestrian":
        return "Billet Piéton";
      case "vehicle":
        return "Billet Véhicule";
      case "motorcycle":
        return "Billet Moto";
      default:
        return "Billet";
    }
  };

  const handleCheckout = async () => {
    setError("");

    if (!cardNumber || !expiryMonth || !expiryYear || !cvc) {
      setError("Complétez tous les champs");
      return;
    }

    try {
      await onCheckout({ cardNumber, expiryMonth, expiryYear, cvc });
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <ScreenKeyboardAwareScrollView>
      <View style={[styles.container, { backgroundColor: theme.backgroundRoot }]}>
        <View style={styles.header}>
          <Pressable onPress={onCancel} style={styles.closeButton}>
            <Feather name="x" size={28} color={theme.text} />
          </Pressable>
          <ThemedText style={[styles.title, Typography.h2]}>Acheter un billet</ThemedText>
        </View>

        <View style={[styles.summaryBox, { backgroundColor: theme.card }]}>
          <View style={styles.summaryRow}>
            <ThemedText style={[styles.label, { color: theme.textSecondary }]}>
              Billet
            </ThemedText>
            <ThemedText style={styles.value}>{getTicketLabel()}</ThemedText>
          </View>

          <View style={[styles.divider, { backgroundColor: theme.border }]} />

          <View style={styles.summaryRow}>
            <ThemedText style={[styles.label, { color: theme.textSecondary }]}>
              Passager
            </ThemedText>
            <ThemedText style={styles.value}>
              {user.firstName} {user.lastName}
            </ThemedText>
          </View>

          <View style={[styles.divider, { backgroundColor: theme.border }]} />

          <View style={styles.summaryRow}>
            <ThemedText style={[styles.label, { color: theme.textSecondary }]}>
              Montant
            </ThemedText>
            <ThemedText style={[styles.totalPrice, { color: theme.primary }]}>
              {price}€
            </ThemedText>
          </View>
        </View>

        {error ? (
          <View style={[styles.errorBox, { backgroundColor: theme.error + "20" }]}>
            <ThemedText style={[styles.errorText, { color: theme.error }]}>
              {error}
            </ThemedText>
          </View>
        ) : null}

        <View style={[styles.formBox, { backgroundColor: theme.card }]}>
          <ThemedText style={[styles.formTitle, Typography.h3]}>
            Informations bancaires
          </ThemedText>

          <TextInput
            style={[styles.input, { borderColor: theme.border, color: theme.text, backgroundColor: theme.backgroundSecondary }]}
            placeholder="Numéro de carte"
            value={cardNumber}
            onChangeText={setCardNumber}
            keyboardType="numeric"
            editable={!isLoading}
            maxLength={19}
          />

          <View style={styles.row}>
            <TextInput
              style={[styles.smallInput, { borderColor: theme.border, color: theme.text, backgroundColor: theme.backgroundSecondary }]}
              placeholder="MM"
              value={expiryMonth}
              onChangeText={setExpiryMonth}
              keyboardType="numeric"
              editable={!isLoading}
              maxLength={2}
            />
            <TextInput
              style={[styles.smallInput, { borderColor: theme.border, color: theme.text, backgroundColor: theme.backgroundSecondary, marginLeft: Spacing.md }]}
              placeholder="YY"
              value={expiryYear}
              onChangeText={setExpiryYear}
              keyboardType="numeric"
              editable={!isLoading}
              maxLength={2}
            />
          </View>

          <TextInput
            style={[styles.input, { borderColor: theme.border, color: theme.text, backgroundColor: theme.backgroundSecondary }]}
            placeholder="CVC"
            value={cvc}
            onChangeText={setCvc}
            keyboardType="numeric"
            secureTextEntry
            editable={!isLoading}
            maxLength={4}
          />

          <Pressable
            style={[styles.button, { backgroundColor: theme.primary, opacity: isLoading ? 0.6 : 1 }]}
            onPress={handleCheckout}
            disabled={isLoading}
          >
            <ThemedText style={styles.buttonText}>
              {isLoading ? "Traitement..." : `Payer ${price}€`}
            </ThemedText>
          </Pressable>
        </View>

        <View style={[styles.securityBox, { backgroundColor: theme.backgroundSecondary }]}>
          <Feather name="lock" size={16} color={theme.primary} />
          <ThemedText style={[styles.securityText, { color: theme.textSecondary }]}>
            Paiement sécurisé par Stripe
          </ThemedText>
        </View>
      </View>
    </ScreenKeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Spacing.lg,
  },
  header: {
    alignItems: "center",
    marginBottom: Spacing.lg,
  },
  closeButton: {
    position: "absolute",
    left: 0,
    top: 0,
    padding: Spacing.md,
    zIndex: 10,
  },
  title: {
    marginTop: Spacing.md,
  },
  summaryBox: {
    borderRadius: BorderRadius.sm,
    padding: Spacing.md,
    marginBottom: Spacing.lg,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: Spacing.sm,
  },
  label: {
    fontSize: 14,
  },
  value: {
    fontSize: 14,
    fontWeight: "500",
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: "bold",
  },
  divider: {
    height: 1,
    marginVertical: Spacing.xs,
  },
  formBox: {
    borderRadius: BorderRadius.sm,
    padding: Spacing.md,
    marginBottom: Spacing.lg,
  },
  formTitle: {
    marginBottom: Spacing.md,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderRadius: BorderRadius.xs,
    paddingHorizontal: Spacing.md,
    fontSize: 16,
    marginBottom: Spacing.md,
  },
  smallInput: {
    height: 48,
    borderWidth: 1,
    borderRadius: BorderRadius.xs,
    paddingHorizontal: Spacing.md,
    fontSize: 16,
    flex: 1,
  },
  row: {
    flexDirection: "row",
    marginBottom: Spacing.md,
  },
  button: {
    height: 52,
    borderRadius: BorderRadius.xs,
    alignItems: "center",
    justifyContent: "center",
    marginTop: Spacing.md,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  errorBox: {
    padding: Spacing.md,
    borderRadius: BorderRadius.xs,
    marginBottom: Spacing.md,
  },
  errorText: {
    fontSize: 14,
  },
  securityBox: {
    flexDirection: "row",
    padding: Spacing.md,
    borderRadius: BorderRadius.xs,
    alignItems: "center",
    gap: Spacing.md,
  },
  securityText: {
    flex: 1,
    fontSize: 12,
  },
});
