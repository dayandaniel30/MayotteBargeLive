import React from "react";
import { View, StyleSheet, Pressable, Platform } from "react-native";
import { Feather } from "@expo/vector-icons";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import { ThemedText } from "@/components/ThemedText";
import { Colors, Spacing, BorderRadius, Shadows } from "@/constants/theme";
import { useTheme } from "@/hooks/useTheme";

interface SearchBarProps {
  placeholder?: string;
  onPress?: () => void;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export function SearchBar({ placeholder = "On va où ?", onPress }: SearchBarProps) {
  const { isDark } = useTheme();
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.98);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1);
  };

  return (
    <AnimatedPressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={[styles.container, animatedStyle]}
    >
      <Feather name="search" size={20} color="#FFFFFF" style={styles.icon} />
      <ThemedText style={styles.text}>{placeholder}</ThemedText>
      <Feather name="briefcase" size={20} color="#FFFFFF" style={styles.rightIcon} />
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.light.primary,
    height: Spacing.searchBarHeight,
    borderRadius: BorderRadius.full,
    paddingHorizontal: Spacing.lg,
    ...Shadows.searchBar,
  },
  icon: {
    marginRight: Spacing.md,
  },
  text: {
    flex: 1,
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "400",
    opacity: 0.9,
  },
  rightIcon: {
    marginLeft: Spacing.md,
  },
});
