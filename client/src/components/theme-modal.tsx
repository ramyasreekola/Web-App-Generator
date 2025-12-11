import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Theme } from "@/lib/types";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ThemeModalProps {
  theme: Theme | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ThemeModal({ theme, isOpen, onClose }: ThemeModalProps) {
  if (!theme) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl p-0 overflow-hidden gap-0 border-none sm:rounded-2xl">
        <div className="relative h-48 sm:h-64 w-full">
          <img
            src={theme.imageLarge}
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white shadow-sm">
              {theme.title}
            </h2>
          </div>
        </div>
        
        <div className="p-6 sm:p-8 bg-card">
          <DialogHeader className="sr-only">
            <DialogTitle>{theme.title}</DialogTitle>
            <DialogDescription>{theme.short}</DialogDescription>
          </DialogHeader>

          <ScrollArea className="max-h-[50vh] pr-4">
            <div className="space-y-4">
              <p className="text-lg font-medium text-primary">
                {theme.short}
              </p>
              <div 
                className="prose prose-stone text-muted-foreground leading-relaxed"
                dangerouslySetInnerHTML={{ __html: theme.full }} // Allowing HTML as per requirements
              />
            </div>
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
}
