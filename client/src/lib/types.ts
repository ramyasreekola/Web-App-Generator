export interface Theme {
  id: string;
  title: string;
  short: string;
  image: string;
  imageLarge: string;
  full: string;
}

export interface FormData {
  personal: {
    name: string;
    email: string;
  };
  ageGroup: string;
  timeSinceMenopause: string;
  extraChoice: string;
  themes: { id: string; title: string }[];
  themePriorities?: { themeId: string; priority: number }[];
  consent: boolean;
  language: "en" | "sv";
}

export interface AppState {
  selectedThemeIds: string[];
  language: "en" | "sv";
  darkMode: boolean;
  toggleTheme: (id: string) => void;
  setLanguage: (lang: "en" | "sv") => void;
  toggleDarkMode: () => void;
  resetThemes: () => void;
}
