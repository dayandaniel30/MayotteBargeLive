import React, { useState } from "react";
import { View, StyleSheet, Pressable, TextInput } from "react-native";
import { Feather } from "@expo/vector-icons";
import { ThemedText } from "@/components/ThemedText";
import { useTheme } from "@/hooks/useTheme";
import { Spacing, BorderRadius, Typography } from "@/constants/theme";
import { ScreenKeyboardAwareScrollView } from "@/components/ScreenKeyboardAwareScrollView";

interface AuthScreenProps {
  onLogin: (
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    isSignup: boolean
  ) => Promise<void>;
  isLoading?: boolean;
}

export default function AuthScreen({ onLogin, isLoading }: AuthScreenProps) {
  const { theme } = useTheme();
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState("demo@mayotte.fr");
  const [password, setPassword] = useState("password123");
  const [firstName, setFirstName] = useState("Jean");
  const [lastName, setLastName] = useState("Dupont");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleAuth = async () => {
    setError("");

    if (!email || !password) {
      setError("Complétez tous les champs");
      return;
    }

    if (isSignup && (!firstName || !lastName)) {
      setError("Complétez tous les champs");
      return;
    }

    try {
      await onLogin(email, password, firstName, lastName, isSignup);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <ScreenKeyboardAwareScrollView>
      <View style={[styles.container, { backgroundColor: theme.backgroundRoot }]}>
        {/* Logo Section */}
        <View style={styles.logoSection}>
          <View style={[styles.logo, { backgroundColor: theme.primary }]}>
            <Feather name="anchor" size={48} color="#FFFFFF" />
          </View>
          <ThemedText style={[styles.appName, Typography.h1]}>
            Barge de Mayotte
          </ThemedText>
          <ThemedText style={[styles.subtitle, { color: theme.textSecondary }]}>
            Billets de ferry en ligne
          </ThemedText>
        </View>

        {/* Form Section */}
        <View style={[styles.formBox, { backgroundColor: theme.card }]}>
          <ThemedText style={[styles.formTitle, Typography.h2]}>
            {isSignup ? "Créer un compte" : "Se connecter"}
          </ThemedText>

          {error ? (
            <View style={[styles.errorBox, { backgroundColor: theme.error + "20" }]}>
              <ThemedText style={[styles.errorText, { color: theme.error }]}>
                {error}
              </ThemedText>
            </View>
          ) : null}

          {isSignup && (
            <>
              <TextInput
                style={[
                  styles.input,
                  { borderColor: theme.border, color: theme.text, backgroundColor: theme.backgroundSecondary },
                ]}
                placeholder="Prénom"
                placeholderTextColor={theme.textSecondary}
                value={firstName}
                onChangeText={setFirstName}
                editable={!isLoading}
              />
              <TextInput
                style={[
                  styles.input,
                  { borderColor: theme.border, color: theme.text, backgroundColor: theme.backgroundSecondary },
                ]}
                placeholder="Nom"
                placeholderTextColor={theme.textSecondary}
                value={lastName}
                onChangeText={setLastName}
                editable={!isLoading}
              />
            </>
          )}

          <TextInput
            style={[
              styles.input,
              { borderColor: theme.border, color: theme.text, backgroundColor: theme.backgroundSecondary },
            ]}
            placeholder="Email"
            placeholderTextColor={theme.textSecondary}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            editable={!isLoading}
          />

          <View style={styles.passwordContainer}>
            <TextInput
              style={[
                styles.passwordInput,
                { borderColor: theme.border, color: theme.text, backgroundColor: theme.backgroundSecondary },
              ]}
              placeholder="Mot de passe"
              placeholderTextColor={theme.textSecondary}
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              editable={!isLoading}
            />
            <Pressable
              onPress={() => setShowPassword(!showPassword)}
              style={styles.showPasswordButton}
            >
              <Feather
                name={showPassword ? "eye" : "eye-off"}
                size={20}
                color={theme.textSecondary}
              />
            </Pressable>
          </View>

          <Pressable
            style={[styles.button, { backgroundColor: theme.primary, opacity: isLoading ? 0.6 : 1 }]}
            onPress={handleAuth}
            disabled={isLoading}
          >
            <ThemedText style={styles.buttonText}>
              {isLoading
                ? "Chargement..."
                : isSignup
                ? "Créer un compte"
                : "Se connecter"}
            </ThemedText>
          </Pressable>

          <Pressable onPress={() => setIsSignup(!isSignup)}>
            <ThemedText style={[styles.toggleText, { color: theme.link }]}>
              {isSignup
                ? "Vous avez déjà un compte ? Se connecter"
                : "Pas encore de compte ? S'inscrire"}
            </ThemedText>
          </Pressable>
        </View>

        {/* Demo Info */}
        <View style={[styles.demoBox, { backgroundColor: theme.info + "20" }]}>
          <Feather name="info" size={16} color={theme.info} />
          <ThemedText style={[styles.demoText, { color: theme.info }]}>
            Démo: demo@mayotte.fr / password123
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
    justifyContent: "center",
  },
  logoSection: {
    alignItems: "center",
    marginBottom: Spacing.xxl,
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: Spacing.lg,
  },
  appName: {
    marginBottom: Spacing.xs,
  },
  subtitle: {
    fontSize: 14,
  },
  formBox: {
    borderRadius: BorderRadius.sm,
    padding: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  formTitle: {
    marginBottom: Spacing.lg,
    textAlign: "center",
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderRadius: BorderRadius.xs,
    paddingHorizontal: Spacing.md,
    fontSize: 16,
    marginBottom: Spacing.md,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: Spacing.md,
  },
  passwordInput: {
    flex: 1,
    height: 48,
    borderWidth: 1,
    borderRadius: BorderRadius.xs,
    paddingHorizontal: Spacing.md,
    fontSize: 16,
  },
  showPasswordButton: {
    position: "absolute",
    right: Spacing.md,
    padding: Spacing.md,
  },
  button: {
    height: 52,
    borderRadius: BorderRadius.xs,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: Spacing.md,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  toggleText: {
    textAlign: "center",
    fontSize: 14,
    fontWeight: "500",
  },
  errorBox: {
    padding: Spacing.md,
    borderRadius: BorderRadius.xs,
    marginBottom: Spacing.md,
  },
  errorText: {
    fontSize: 14,
  },
  demoBox: {
    flexDirection: "row",
    padding: Spacing.md,
    borderRadius: BorderRadius.xs,
    alignItems: "center",
    gap: Spacing.md,
  },
  demoText: {
    flex: 1,
    fontSize: 12,
  },
});
