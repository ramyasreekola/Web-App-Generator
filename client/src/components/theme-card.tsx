import { Theme } from "@/lib/types";
import { Card, CardContent } from "@/components/ui/card";
import { Check, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useApp } from "@/lib/context";
import { translations } from "@/lib/i18n";

interface ThemeCardProps {
  theme: Theme;
  isSelected: boolean;
  onToggle: (id: string) => void;
  onReadMore: (theme: Theme) => void;
}

export function ThemeCard({ theme, isSelected, onToggle, onReadMore }: ThemeCardProps) {
  const { language } = useApp();
  const t = translations[language];

  return (
    <div 
      className={cn(
        "group relative rounded-xl transition-all duration-300 h-full",
        isSelected ? "ring-2 ring-primary ring-offset-2 ring-offset-background" : "hover:shadow-lg"
      )}
      data-testid={`card-theme-${theme.id}`}
    >
      <Card className="h-full overflow-hidden border-none shadow-md cursor-pointer flex flex-col" onClick={() => onToggle(theme.id)}>
        {/* Image Container */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={theme.image}
            alt={theme.title}
            className={cn(
              "w-full h-full object-cover transition-transform duration-700 ease-out",
              isSelected ? "scale-105" : "group-hover:scale-110"
            )}
          />
          {/* Overlay for selection state */}
          <div className={cn(
            "absolute inset-0 bg-primary/20 transition-opacity duration-300 flex items-center justify-center",
            isSelected ? "opacity-100" : "opacity-0 group-hover:opacity-10"
          )}>
            {isSelected && (
              <div className="bg-primary text-primary-foreground rounded-full p-2 shadow-lg animate-in zoom-in duration-200">
                <Check className="w-6 h-6" />
              </div>
            )}
          </div>
        </div>

        <CardContent className="p-5 flex-1 flex flex-col justify-between bg-card">
          <div>
            <h3 className="font-serif text-lg font-bold leading-tight mb-2 text-foreground group-hover:text-primary transition-colors">
              {theme.title}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {theme.short}
            </p>
          </div>
          
          <div className="mt-4 pt-4 border-t border-border/50 flex justify-between items-center">
             <div className="flex items-center gap-2">
                <div 
                  className={cn(
                    "w-5 h-5 rounded-full border border-muted-foreground/30 transition-colors flex items-center justify-center",
                    isSelected ? "bg-primary border-primary" : "bg-transparent"
                  )}
                  aria-hidden="true"
                >
                   {isSelected && <Check className="w-3 h-3 text-white" />}
                </div>
                <span className="text-xs font-medium text-muted-foreground">
                  {isSelected ? t.selected : t.select}
                </span>
             </div>

             <Button
               variant="ghost" 
               size="sm" 
               className="h-8 px-2 text-primary hover:text-primary/80 hover:bg-primary/5"
               onClick={(e) => {
                 e.stopPropagation();
                 onReadMore(theme);
               }}
               aria-label={`Read more about ${theme.title}`}
               data-testid={`btn-readmore-${theme.id}`}
             >
               <Info className="w-4 h-4 mr-1.5" />
               {t.readMore}
             </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
