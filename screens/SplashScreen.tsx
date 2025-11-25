import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  Easing,
} from "react-native-reanimated";
import { ThemedText } from "@/components/ThemedText";
import { useTheme } from "@/hooks/useTheme";
import { Spacing, Typography } from "@/constants/theme";
import { Feather } from "@expo/vector-icons";

interface SplashScreenProps {
  onFinish: () => void;
}

export default function SplashScreen({ onFinish }: SplashScreenProps) {
  const { theme } = useTheme();

  // Boat horizontal movement animation
  const boatX = useSharedValue(0);

  // Wave animation
  const waveOffset = useSharedValue(0);

  useEffect(() => {
    // Boat animation - moves from left to right
    boatX.value = withRepeat(
      withSequence(
        withTiming(-100, {
          duration: 2000,
          easing: Easing.inOut(Easing.ease),
        }),
        withTiming(100, {
          duration: 2000,
          easing: Easing.inOut(Easing.ease),
        })
      ),
      -1,
      true
    );

    // Wave animation - continuous loop
    waveOffset.value = withRepeat(
      withTiming(360, {
        duration: 3000,
        easing: Easing.linear,
      }),
      -1,
      false
    );

    // Auto finish after 3.5 seconds
    const timer = setTimeout(onFinish, 3500);
    return () => clearTimeout(timer);
  }, []);

  const boatAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: boatX.value }],
  }));

  const waveAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${waveOffset.value}deg` }],
  }));

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundRoot }]}>
      {/* Content */}
      <View style={styles.content}>
        <ThemedText style={[styles.title, Typography.h1]}>
          Barge de Mayotte
        </ThemedText>
      </View>

      {/* Animated Scene */}
      <View style={styles.sceneContainer}>
        {/* Sky background */}
        <View
          style={[
            styles.sky,
            { backgroundColor: theme.primary + "30" },
          ]}
        />

        {/* Water background */}
        <View
          style={[
            styles.water,
            { backgroundColor: theme.primary + "15" },
          ]}
        />

        {/* Waves */}
        <Animated.View style={[styles.wavesContainer, waveAnimatedStyle]}>
          <View style={[styles.wave, { borderTopColor: theme.primary + "40" }]} />
          <View style={[styles.wave, { borderTopColor: theme.primary + "30" }]} />
        </Animated.View>

        {/* Boat */}
        <Animated.View
          style={[
            styles.boatContainer,
            boatAnimatedStyle,
          ]}
        >
          <View style={styles.boatWrapper}>
            {/* Boat hull */}
            <View style={[styles.boatHull, { backgroundColor: theme.primary }]} />
            {/* Anchor icon */}
            <View style={styles.boatIcon}>
              <Feather name="anchor" size={24} color="#FFFFFF" />
            </View>
          </View>
        </Animated.View>
      </View>

      {/* Loading text */}
      <View style={styles.footer}>
        <ThemedText style={[styles.loadingText, { color: theme.textSecondary }]}>
          Chargement...
        </ThemedText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: Spacing.xxl,
  },
  content: {
    flex: 0,
    alignItems: "center",
  },
  title: {
    marginTop: Spacing.xxl,
  },
  sceneContainer: {
    width: "100%",
    height: 200,
    position: "relative",
    overflow: "hidden",
  },
  sky: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "50%",
  },
  water: {
    position: "absolute",
    top: "50%",
    left: 0,
    right: 0,
    height: "50%",
  },
  wavesContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    justifyContent: "flex-end",
  },
  wave: {
    width: "100%",
    height: 20,
    borderTopWidth: 2,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    opacity: 0.6,
  },
  boatContainer: {
    position: "absolute",
    bottom: 30,
    left: "50%",
    marginLeft: -30,
  },
  boatWrapper: {
    alignItems: "center",
    justifyContent: "flex-end",
  },
  boatHull: {
    width: 60,
    height: 25,
    borderRadius: 30,
    marginBottom: -2,
  },
  boatIcon: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 2,
  },
  footer: {
    alignItems: "center",
    marginBottom: Spacing.xl,
  },
  loadingText: {
    fontSize: 14,
  },
});
