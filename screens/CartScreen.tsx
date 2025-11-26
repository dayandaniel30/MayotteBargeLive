import React from "react";
import { View, StyleSheet, Pressable, FlatList } from "react-native";
import { Feather } from "@expo/vector-icons";
import { ScreenScrollView } from "@/components/ScreenScrollView";
import { ThemedText } from "@/components/ThemedText";
import { useTheme } from "@/hooks/useTheme";
import { Spacing, BorderRadius, Typography } from "@/constants/theme";
import { useCart, CartItem } from "@/hooks/useCart";

export default function CartScreen() {
  const { theme } = useTheme();
  const { cart, removeFromCart, getTotalPrice, clearCart } = useCart();

  const handleCheckout = () => {
    // TODO: Implement checkout flow
    alert("Paiement - À implémenter");
  };

  if (cart.length === 0) {
    return (
      <ScreenScrollView>
        <View style={[styles.container, { backgroundColor: theme.backgroundRoot }]}>
          <View style={styles.emptyContainer}>
            <Feather name="shopping-cart" size={64} color={theme.textSecondary} />
            <ThemedText style={[styles.emptyText, Typography.h2]}>
              Panier vide
            </ThemedText>
            <ThemedText
              style={[styles.emptySubtext, { color: theme.textSecondary }]}
            >
              Sélectionnez des billets pour commencer
            </ThemedText>
          </View>
        </View>
      </ScreenScrollView>
    );
  }

  const totalPrice = getTotalPrice();

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundRoot }]}>
      <FlatList
        data={cart}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[styles.cartItem, { backgroundColor: theme.card }]}>
            <View style={styles.itemInfo}>
              <ThemedText style={[styles.itemLabel, Typography.h3]}>
                {item.label}
              </ThemedText>
              <ThemedText
                style={[styles.itemPrice, { color: theme.primary }]}
              >
                {item.price.toFixed(2)}€
              </ThemedText>
            </View>

            <View style={styles.quantityContainer}>
              <Pressable
                onPress={() => removeFromCart(item.id)}
                style={[
                  styles.quantityButton,
                  { backgroundColor: theme.border },
                ]}
              >
                <Feather name="minus" size={16} color={theme.text} />
              </Pressable>

              <ThemedText style={styles.quantityText}>
                {item.quantity}
              </ThemedText>

              <Pressable
                style={[
                  styles.quantityButton,
                  { backgroundColor: theme.primary },
                ]}
              >
                <Feather name="plus" size={16} color="#FFFFFF" />
              </Pressable>
            </View>

            <ThemedText style={[styles.itemTotal, Typography.h3]}>
              {(item.price * item.quantity).toFixed(2)}€
            </ThemedText>
          </View>
        )}
        contentContainerStyle={styles.listContainer}
      />

      {/* Summary and Checkout */}
      <View
        style={[
          styles.footer,
          { backgroundColor: theme.card, borderTopColor: theme.border },
        ]}
      >
        <View style={styles.summaryRow}>
          <ThemedText style={[styles.summaryLabel, Typography.h3]}>
            Total:
          </ThemedText>
          <ThemedText style={[styles.totalPrice, { color: theme.primary }]}>
            {totalPrice.toFixed(2)}€
          </ThemedText>
        </View>

        <Pressable
          onPress={handleCheckout}
          style={[styles.checkoutButton, { backgroundColor: theme.primary }]}
        >
          <Feather name="lock" size={18} color="#FFFFFF" />
          <ThemedText style={styles.checkoutText}>
            Procéder au paiement
          </ThemedText>
        </Pressable>

        <Pressable
          onPress={clearCart}
          style={[styles.clearButton, { backgroundColor: theme.border }]}
        >
          <ThemedText style={[styles.clearText, { color: theme.text }]}>
            Vider le panier
          </ThemedText>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {
    padding: Spacing.lg,
    paddingBottom: 200,
  },
  cartItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    marginBottom: Spacing.md,
    gap: Spacing.md,
  },
  itemInfo: {
    flex: 1,
  },
  itemLabel: {
    marginBottom: Spacing.xs,
  },
  itemPrice: {
    fontSize: 13,
    fontWeight: "500",
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
  },
  quantityButton: {
    width: 32,
    height: 32,
    borderRadius: BorderRadius.md,
    justifyContent: "center",
    alignItems: "center",
  },
  quantityText: {
    width: 30,
    textAlign: "center",
    fontWeight: "600",
  },
  itemTotal: {
    minWidth: 60,
    textAlign: "right",
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: Spacing.lg,
    borderTopWidth: 1,
    gap: Spacing.md,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  summaryLabel: {
    fontSize: 16,
  },
  totalPrice: {
    fontSize: 20,
    fontWeight: "700",
  },
  checkoutButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: Spacing.md,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.full,
  },
  checkoutText: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 16,
  },
  clearButton: {
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.full,
    justifyContent: "center",
    alignItems: "center",
  },
  clearText: {
    fontWeight: "500",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: Spacing.lg,
    paddingVertical: Spacing.xl * 2,
  },
  emptyText: {
    textAlign: "center",
    marginTop: Spacing.lg,
  },
  emptySubtext: {
    textAlign: "center",
    fontSize: 14,
  },
});
