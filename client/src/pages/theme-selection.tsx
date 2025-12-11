import { useState } from "react";
import { useLocation } from "wouter";
import { useApp } from "@/lib/context";
import { themes } from "@/lib/data";
import { translations } from "@/lib/i18n";
import { Layout } from "@/components/layout";
import { ThemeCard } from "@/components/theme-card";
import { ThemeModal } from "@/components/theme-modal";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Theme } from "@/lib/types";

export default function ThemeSelection() {
  const { selectedThemeIds, toggleTheme, language } = useApp();
  const [, setLocation] = useLocation();
  const [modalTheme, setModalTheme] = useState<Theme | null>(null);
  const t = translations[language];

  const handleReadMore = (theme: Theme) => {
    setModalTheme(theme);
  };

  const handleContinue = () => {
    if (selectedThemeIds.length > 0) {
      setLocation("/form");
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 sm:py-12 max-w-7xl">
        {/* Hero Section */}
        <section className="text-center max-w-3xl mx-auto mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-foreground mb-6 tracking-tight">
            {t.heroTitle} <span className="text-primary italic">{t.heroTitleHighlight}</span>
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
            {t.heroSubtitle}
          </p>
        </section>

        {/* Theme Grid */}
        <section 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-16"
          role="group"
          aria-label="Wellness themes selection"
        >
          {themes.map((theme, index) => (
            <div 
              key={theme.id}
              className="animate-in fade-in slide-in-from-bottom-8 duration-700 fill-mode-backwards"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <ThemeCard
                theme={theme}
                isSelected={selectedThemeIds.includes(theme.id)}
                onToggle={toggleTheme}
                onReadMore={handleReadMore}
              />
            </div>
          ))}
        </section>

        {/* Action Bar */}
        <div className="sticky bottom-6 z-10 flex justify-center animate-in fade-in duration-500">
          <div className="bg-background/80 backdrop-blur-md p-4 rounded-full shadow-2xl border border-border/50">
            <Button
              size="lg"
              onClick={handleContinue}
              disabled={selectedThemeIds.length === 0}
              className="rounded-full px-8 py-6 text-lg font-medium shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
              data-testid="btn-continue"
            >
              {t.continue}
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>

        <ThemeModal
          theme={modalTheme}
          isOpen={!!modalTheme}
          onClose={() => setModalTheme(null)}
        />
      </div>
    </Layout>
  );
}
