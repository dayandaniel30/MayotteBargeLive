import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { KeyboardProvider } from "react-native-keyboard-controller";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

import MainTabNavigator from "@/navigation/MainTabNavigator";
import AuthScreen from "@/screens/AuthScreen";
import CheckoutScreen from "@/screens/CheckoutScreen";
import SplashScreen from "@/screens/SplashScreen";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { getAuthUser, login, signup, logout, User } from "@/utils/auth";

const Stack = createNativeStackNavigator();

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const restoreAuth = async () => {
      try {
        const authUser = await getAuthUser();
        setUser(authUser);
      } catch (err) {
        console.error("Auth restore failed:", err);
      } finally {
        setIsLoading(false);
      }
    };

    restoreAuth();
  }, []);

  const handleSplashFinish = () => {
    setShowSplash(false);
  };

  const handleLogin = async (
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    isSignup: boolean
  ) => {
    setIsLoading(true);
    try {
      const authUser = isSignup
        ? await signup(email, password, firstName, lastName)
        : await login(email, password);
      setUser(authUser);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    setUser(null);
  };

  if (showSplash) {
    return (
      <ErrorBoundary>
        <SafeAreaProvider>
          <GestureHandlerRootView style={styles.root}>
            <SplashScreen onFinish={handleSplashFinish} />
            <StatusBar style="auto" />
          </GestureHandlerRootView>
        </SafeAreaProvider>
      </ErrorBoundary>
    );
  }

  return (
    <ErrorBoundary>
      <SafeAreaProvider>
        <GestureHandlerRootView style={styles.root}>
          <KeyboardProvider>
            <NavigationContainer>
              <Stack.Navigator screenOptions={{ headerShown: false }}>
                {!user ? (
                  <Stack.Screen
                    name="Auth"
                    options={{ animationEnabled: false }}
                  >
                    {() => (
                      <AuthScreen
                        onLogin={handleLogin}
                        isLoading={isLoading}
                      />
                    )}
                  </Stack.Screen>
                ) : (
                  <>
                    <Stack.Screen
                      name="Main"
                      options={{ animationEnabled: false }}
                    >
                      {() => (
                        <MainTabNavigator
                          user={user}
                          onLogout={handleLogout}
                        />
                      )}
                    </Stack.Screen>
                    <Stack.Screen
                      name="Checkout"
                      options={{
                        animationEnabled: true,
                        cardStyle: { backgroundColor: "transparent" },
                      }}
                    >
                      {({ route }: any) => (
                        <CheckoutScreen
                          user={user}
                          ticketType={route.params?.ticketType || "pedestrian"}
                          price={route.params?.price || 0}
                          onCheckout={async () => {
                            alert("Billet acheté avec succès!");
                          }}
                          onCancel={() => {}}
                        />
                      )}
                    </Stack.Screen>
                  </>
                )}
              </Stack.Navigator>
            </NavigationContainer>
            <StatusBar style="auto" />
          </KeyboardProvider>
        </GestureHandlerRootView>
      </SafeAreaProvider>
    </ErrorBoundary>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
