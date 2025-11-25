import React, { createContext, useContext, useEffect, useState } from "react";
import { useSettings } from "./useSettings";

interface ThemeContextType {
  isDark: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { settings, saveSettings } = useSettings();
  const [isDark, setIsDark] = useState(settings.darkModeEnabled);

  useEffect(() => {
    setIsDark(settings.darkModeEnabled);
  }, [settings.darkModeEnabled]);

  const toggleTheme = async () => {
    await saveSettings({ darkModeEnabled: !isDark });
  };

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useThemeContext() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useThemeContext must be used within ThemeProvider");
  }
  return context;
}
