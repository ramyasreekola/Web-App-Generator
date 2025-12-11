import { useApp } from "@/lib/context";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";

export function Layout({ children }: { children: React.ReactNode }) {
  const { language, setLanguage } = useApp();

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "fr" : "en");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col font-sans text-foreground transition-colors duration-300">
      <header className="w-full py-4 px-6 flex justify-end items-center container mx-auto">
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
      <main className="flex-1 flex flex-col">
        {children}
      </main>
      <footer className="py-8 text-center text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} Menopause Wellness Journey</p>
      </footer>
    </div>
  );
}
