import { useApp } from "@/lib/context";
import { Button } from "@/components/ui/button";
import { Globe, Moon, Sun } from "lucide-react";

export function Layout({ children }: { children: React.ReactNode }) {
  const { language, setLanguage, darkMode, toggleDarkMode } = useApp();

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "sv" : "en");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col font-sans text-foreground transition-colors duration-300">
      <header className="w-full py-4 px-6 flex justify-end items-center gap-3 container mx-auto">
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleDarkMode}
          className="rounded-full text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
          aria-label="Toggle dark mode"
          data-testid="btn-theme-toggle"
        >
          {darkMode ? (
            <Sun className="h-4 w-4" />
          ) : (
            <Moon className="h-4 w-4" />
          )}
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleLanguage}
          className="rounded-full text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
          aria-label={`Switch language. Current language: ${language.toUpperCase()}`}
          data-testid="btn-language-toggle"
        >
          <Globe className="h-4 w-4 mr-2" />
          <span className="font-medium text-sm">{language.toUpperCase()}</span>
        </Button>
      </header>
      <main className="flex-1 flex flex-col">{children}</main>
      <footer className="py-8 text-center text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} Graceful Aging Study</p>
      </footer>
    </div>
  );
}
