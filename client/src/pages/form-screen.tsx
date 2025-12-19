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
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  ageGroup: z.enum(["35-44", "45-54", "55-64", "65+"], {
    required_error: "Please select your age group",
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
  const t = translations[language];

  // Redirect if no themes selected
  if (selectedThemeIds.length === 0) {
    setLocation("/");
    return null;
  }

  const selectedThemes = themes.filter((t) => selectedThemeIds.includes(t.id));

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      consent: false,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);

    const payload: FormData = {
      personal: {
        name: values.name,
        email: values.email,
      },
      ageGroup: values.ageGroup,
      extraChoice: values.extraChoice,
      themes: selectedThemes.map(t => ({ id: t.id, title: t.title })),
      consent: values.consent,
      language: language,
    };

    console.log("Submitting payload:", payload);

    try {
      // Get API key from environment
      const apiKey = import.meta.env.VITE_STATICFORMS_API_KEY;
console.log(apiKey)
      // Check if API key is loaded
      if (!apiKey) {
        throw new Error("API key not configured. Please check your .env file and restart the dev server.");
      }

      console.log("API Key loaded:", apiKey ? "Yes" : "No");

      // Submit to StaticForms.xyz
      const response = await fetch("https://api.staticforms.xyz/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          accessKey: apiKey,
          subject: `New Fitness Journey Form - ${payload.personal.name}`,
          name: payload.personal.name,
          email: payload.personal.email,
          replyTo: payload.personal.email,
          message: `
Age Group: ${payload.ageGroup}
Preferred Contact Method: ${payload.extraChoice}
Language: ${payload.language}

Selected Themes:
${payload.themes.map(t => `- ${t.title}`).join('\n')}

Consent: ${payload.consent ? 'Yes' : 'No'}
Submitted: ${new Date().toLocaleString()}
          `.trim(),
          // Optional: Add honeypot field for spam protection
          honeypot: "",
        }),
      });

      if (!response.ok) {
        throw new Error(`Form submission failed: ${response.statusText}`);
      }

      const result = await response.json();

      if (result.success) {
        toast({
          title: t.successTitle,
          description: t.successDesc,
          variant: "default",
        });

        // Optionally reset form or redirect
        // form.reset();
      } else {
        throw new Error(result.message || "Submission failed");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Something went wrong. Please try again.",
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
                {selectedThemes.map((theme) => (
                  <div key={theme.id} className="flex items-start space-x-3 bg-background p-3 rounded-lg shadow-sm">
                    <img src={theme.image} alt="" className="w-10 h-10 rounded-md object-cover flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium leading-tight mb-1">{theme.title}</p>
                      <button 
                        onClick={() => toggleTheme(theme.id)}
                        className="text-xs text-muted-foreground hover:text-destructive transition-colors underline"
                      >
                        {t.remove}
                      </button>
                    </div>
                  </div>
                ))}
                {selectedThemes.length === 0 && (
                  <p className="text-sm text-destructive">{t.errorSelectTheme}</p>
                )}
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
                      <h3 className="text-lg font-medium border-b pb-2">{t.personalDetails}</h3>
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
                                className="grid grid-cols-2 sm:grid-cols-4 gap-4"
                              >
                                {["35-44", "45-54", "55-64", "65+"].map((age) => (
                                  <FormItem key={age}>
                                    <FormControl>
                                      <RadioGroupItem value={age} className="peer sr-only" />
                                    </FormControl>
                                    <FormLabel className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary peer-data-[state=checked]:text-primary cursor-pointer transition-all">
                                      {age}
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

                    {/* Contact Method */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium border-b pb-2">{t.contactMethod}</h3>
                      <FormField
                        control={form.control}
                        name="extraChoice"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className="flex flex-col space-y-1"
                              >
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value="email" />
                                  </FormControl>
                                  <FormLabel className="font-normal">{t.email}</FormLabel>
                                </FormItem>
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value="phone" />
                                  </FormControl>
                                  <FormLabel className="font-normal">{t.phone}</FormLabel>
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
                            <div className="space-y-1 leading-none">
                              <FormLabel>
                                {t.consentLabel}
                              </FormLabel>
                              <p className="text-xs text-muted-foreground">
                                {t.consentText}
                              </p>
                              <FormMessage />
                            </div>
                          </FormItem>
                        )}
                      />
                      <div className="border-t border-secondary/30 pt-3 mt-3">
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          {t.dataProtection}
                        </p>
                      </div>
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
