import { useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useApp } from "@/lib/context";
import { themes } from "@/lib/data";
import { translations } from "@/lib/i18n";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Loader2, Send } from "lucide-react";
import { useState } from "react";
import { FormData } from "@/lib/types";

const formSchema = z.object({
  name: z.string().optional().or(z.literal("")),
  email: z.string().optional().or(z.literal("")).refine(
    (val) => !val || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val),
    "Invalid email address"
  ),
  ageGroup: z.enum(["below-50", "51-55", "56-60", "61-65", "66-70", "71-75", "75+"], {
    required_error: "Please select your age group",
  }),
  timeSinceMenopause: z.enum(["0-5", "5-10", "10+"], {
    required_error: "Please select when your post-menopause started",
  }),
  extraChoice: z.enum(["email", "phone"], {
    required_error: "Please select a contact method",
  }),
  consent: z.boolean().refine((val) => val === true, {
    message: "You must consent to continue",
  }),
});

export default function FormScreen() {
  const { selectedThemeIds, toggleTheme, language } = useApp();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [themePriorities, setThemePriorities] = useState<string[]>(selectedThemeIds);
  const t = translations[language];

  // Redirect if no themes selected
  if (selectedThemeIds.length === 0) {
    setLocation("/");
    return null;
  }

  const selectedThemes = themePriorities.map(id => themes.find(t => t.id === id)).filter(Boolean) as typeof themes;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      consent: false,
    },
  });

  const moveThemeUp = (index: number) => {
    if (index > 0) {
      const newPriorities = [...themePriorities];
      [newPriorities[index], newPriorities[index - 1]] = [newPriorities[index - 1], newPriorities[index]];
      setThemePriorities(newPriorities);
    }
  };

  const moveThemeDown = (index: number) => {
    if (index < themePriorities.length - 1) {
      const newPriorities = [...themePriorities];
      [newPriorities[index], newPriorities[index + 1]] = [newPriorities[index + 1], newPriorities[index]];
      setThemePriorities(newPriorities);
    }
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    
    const payload: FormData = {
      personal: {
        name: values.name || "",
        email: values.email || "",
      },
      ageGroup: values.ageGroup,
      timeSinceMenopause: values.timeSinceMenopause,
      extraChoice: values.extraChoice,
      themes: themePriorities.map((id) => {
        const theme = themes.find(t => t.id === id);
        return { id, title: theme?.title || "" };
      }),
      themePriorities: themePriorities.map((id, idx) => ({ themeId: id, priority: idx + 1 })),
      consent: values.consent,
      language: language,
    };

    console.log("Submitting payload:", payload);

    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: t.successTitle,
        description: t.successDesc,
        variant: "default",
      });
      
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Button 
          variant="ghost" 
          onClick={() => setLocation("/")}
          className="mb-8 hover:bg-transparent hover:text-primary pl-0"
          data-testid="btn-back"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          {t.back}
        </Button>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Column: Context & Themes */}
          <div className="md:col-span-1 space-y-6">
            <Card className="bg-secondary/30 border-none shadow-none">
              <CardHeader>
                <CardTitle className="text-xl font-serif text-primary">{t.selectedThemes}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {selectedThemes.map((theme, idx) => (
                  <div key={theme.id} className="flex flex-col space-y-2 bg-background p-3 rounded-lg shadow-sm">
                    <div className="flex items-start space-x-3">
                      <img src={theme.image} alt="" className="w-10 h-10 rounded-md object-cover flex-shrink-0" />
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium leading-tight">{idx + 1}. {theme.title}</p>
                      </div>
                    </div>
                    <div className="flex gap-2 ml-13">
                      <button 
                        onClick={() => moveThemeUp(idx)}
                        disabled={idx === 0}
                        className="text-xs px-2 py-1 rounded bg-primary/10 text-primary hover:bg-primary/20 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        ↑
                      </button>
                      <button 
                        onClick={() => moveThemeDown(idx)}
                        disabled={idx === themePriorities.length - 1}
                        className="text-xs px-2 py-1 rounded bg-primary/10 text-primary hover:bg-primary/20 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        ↓
                      </button>
                      <button 
                        onClick={() => toggleTheme(theme.id)}
                        className="text-xs text-muted-foreground hover:text-destructive transition-colors underline ml-auto"
                      >
                        {t.remove}
                      </button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <div className="bg-primary/5 p-6 rounded-xl border border-primary/10">
              <h2 className="font-serif text-xl font-bold mb-4 text-primary">{t.yourVoiceMatters}</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {t.privacyText}
              </p>
              <p className="mt-4 text-sm text-muted-foreground">
                {t.thanks}
              </p>
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="md:col-span-2">
            <Card className="border-none shadow-lg">
              <CardContent className="p-6 sm:p-8">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    
                    {/* Personal Info */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium border-b pb-2">{t.personalDetailsOptional}</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{t.name}</FormLabel>
                              <FormControl>
                                <Input placeholder="Jane Doe" {...field} className="bg-secondary/10 border-transparent focus:border-primary" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{t.email}</FormLabel>
                              <FormControl>
                                <Input placeholder="jane@example.com" type="email" {...field} className="bg-secondary/10 border-transparent focus:border-primary" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    {/* Age Group */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium border-b pb-2">{t.ageGroup}</h3>
                      <FormField
                        control={form.control}
                        name="ageGroup"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className="grid grid-cols-2 sm:grid-cols-3 gap-3"
                              >
                                {["below-50", "51-55", "56-60", "61-65", "66-70", "71-75", "75+"].map((age) => (
                                  <FormItem key={age}>
                                    <FormControl>
                                      <RadioGroupItem value={age} className="peer sr-only" />
                                    </FormControl>
                                    <FormLabel className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-3 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary peer-data-[state=checked]:text-primary cursor-pointer transition-all text-sm">
                                      {age === "below-50" ? "Below 50" : age}
                                    </FormLabel>
                                  </FormItem>
                                ))}
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Time Since Menopause */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium border-b pb-2">{t.timeSinceMenopause}</h3>
                      <FormField
                        control={form.control}
                        name="timeSinceMenopause"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className="flex flex-col space-y-3"
                              >
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value="0-5" />
                                  </FormControl>
                                  <FormLabel className="font-normal">0-5 years ago</FormLabel>
                                </FormItem>
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value="5-10" />
                                  </FormControl>
                                  <FormLabel className="font-normal">5-10 years ago</FormLabel>
                                </FormItem>
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value="10+" />
                                  </FormControl>
                                  <FormLabel className="font-normal">More than 10 years ago</FormLabel>
                                </FormItem>
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Consent */}
                    <div className="bg-secondary/20 p-4 rounded-lg space-y-4">
                      <FormField
                        control={form.control}
                        name="consent"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <div className="space-y-3 leading-none">
                              <FormLabel>
                                {t.consentLabel}
                              </FormLabel>
                              <div className="space-y-2 text-xs text-muted-foreground">
                                <p className="font-semibold text-foreground">{t.dataProtectionNotice}</p>
                                <p>{t.dataProtectionText}</p>
                              </div>
                              <FormMessage />
                            </div>
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="flex justify-end pt-4">
                       <Button 
                         type="submit" 
                         size="lg" 
                         className="w-full sm:w-auto"
                         disabled={isSubmitting}
                         data-testid="btn-submit"
                       >
                         {isSubmitting ? (
                           <>
                             <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                             {t.submitting}
                           </>
                         ) : (
                           <>
                             {t.submit}
                             <Send className="ml-2 h-4 w-4" />
                           </>
                         )}
                       </Button>
                    </div>

                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}
