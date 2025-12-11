import React, { createContext, useContext, useState, useEffect } from "react";
import { AppState } from "./types";

const AppContext = createContext<AppState | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  // Initialize state from localStorage if available
  const [selectedThemeIds, setSelectedThemeIds] = useState<string[]>(() => {
    const saved = localStorage.getItem("selectedThemeIds");
    return saved ? JSON.parse(saved) : [];
  });

  const [language, setLanguage] = useState<"en" | "fr">(() => {
    return (localStorage.getItem("language") as "en" | "fr") || "en";
  });

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem("selectedThemeIds", JSON.stringify(selectedThemeIds));
  }, [selectedThemeIds]);

  useEffect(() => {
    localStorage.setItem("language", language);
    // In a real app, this would handle i18n/RTL logic
    document.documentElement.lang = language;
  }, [language]);

  const toggleTheme = (id: string) => {
    setSelectedThemeIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((themeId) => themeId !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const resetThemes = () => setSelectedThemeIds([]);

  return (
    <AppContext.Provider
      value={{
        selectedThemeIds,
        language,
        toggleTheme,
        setLanguage,
        resetThemes,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
