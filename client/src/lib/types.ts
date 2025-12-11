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
  extraChoice: string;
  themes: { id: string; title: string }[];
  consent: boolean;
  language: "en" | "fr"; // Simplified for now
}

export interface AppState {
  selectedThemeIds: string[];
  language: "en" | "fr";
  toggleTheme: (id: string) => void;
  setLanguage: (lang: "en" | "fr") => void;
  resetThemes: () => void;
}
