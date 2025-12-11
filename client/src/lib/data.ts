import { Theme } from "./types";

// Import generated images
import vitalImage from "@assets/generated_images/woman_practicing_yoga_outdoors.png";
import innerImage from "@assets/generated_images/woman_meditating_indoors.png";
import relationshipsImage from "@assets/generated_images/group_of_women_chatting.png";
import resilienceImage from "@assets/generated_images/woman_planning_at_desk.png";
import safetyImage from "@assets/generated_images/confident_woman_standing.png";
import legacyImage from "@assets/generated_images/woman_journaling_by_window.png";

export const themes: Theme[] = [
  {
    id: "theme-1",
    title: "Vital Living & Longevity",
    short: "Boost energy and maintain vitality during menopause.",
    image: vitalImage,
    imageLarge: vitalImage, // Using same for now, in real app might be higher res
    full: "Learn strategies for nutrition, exercise, and healthy habits to increase energy and longevity during menopause.",
  },
  {
    id: "theme-2",
    title: "The Inner Journey & Life Transitions",
    short: "Reflect, grow, and embrace new life stages.",
    image: innerImage,
    imageLarge: innerImage,
    full: "Explore mindfulness, self-reflection, and personal growth to navigate the emotional and mental transitions of menopause.",
  },
  {
    id: "theme-3",
    title: "Relationships & Belonging",
    short: "Strengthen connections with family and friends.",
    image: relationshipsImage,
    imageLarge: relationshipsImage,
    full: "Build meaningful social connections and nurture relationships for emotional support during menopause.",
  },
  {
    id: "theme-4",
    title: "Resilience & Daily Mastery",
    short: "Manage routines and overcome challenges daily.",
    image: resilienceImage,
    imageLarge: resilienceImage,
    full: "Develop coping strategies, time management, and routines that enhance resilience and daily mastery during menopause.",
  },
  {
    id: "theme-5",
    title: "Safety and Security",
    short: "Feel secure emotionally, financially, and personally.",
    image: safetyImage,
    imageLarge: safetyImage,
    full: "Learn how to create a safe and secure environment for yourself, including financial and emotional security during menopause.",
  },
  {
    id: "theme-6",
    title: "Legacy, Mortality & Future Planning",
    short: "Reflect on purpose and plan for the future.",
    image: legacyImage,
    imageLarge: legacyImage,
    full: "Engage in reflective exercises and planning to consider your legacy and meaningful contributions for the future.",
  },
];
