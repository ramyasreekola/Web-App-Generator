import React, { createContext, useContext, useState, useEffect } from "react";
import { AppState } from "./types";

const AppContext = createContext<AppState | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  // Initialize state from localStorage if available
  const [selectedThemeIds, setSelectedThemeIds] = useState<string[]>(() => {
    const saved = localStorage.getItem("selectedThemeIds");
    return saved ? JSON.parse(saved) : [];
  });

  const [language, setLanguage] = useState<"en" | "sv">(() => {
    return (localStorage.getItem("language") as "en" | "sv") || "en";
  });

  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem("darkMode");
    return saved ? JSON.parse(saved) : false;
  });

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem("selectedThemeIds", JSON.stringify(selectedThemeIds));
  }, [selectedThemeIds]);

  useEffect(() => {
    localStorage.setItem("language", language);
    document.documentElement.lang = language;
  }, [language]);

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const toggleTheme = (id: string) => {
    setSelectedThemeIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((themeId) => themeId !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  const resetThemes = () => setSelectedThemeIds([]);

  return (
    <AppContext.Provider
      value={{
        selectedThemeIds,
        language,
        darkMode,
        toggleTheme,
        setLanguage,
        toggleDarkMode,
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
