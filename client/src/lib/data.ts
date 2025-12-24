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
    short: "A lifestyle of healthy habits that sustain energy, joy, and long life",
    image: vitalImage,
    imageLarge: vitalImage,
    full: `<p><strong>Subthemes:</strong></p>
<ul>
  <li>Movement as Medicine – gardening, cleaning, daily chores, gentle fitness</li>
  <li>Food and Nourishment – plant-based eating, 80% full, anti-inflammatory foods</li>
  <li>Alcohol/Softdrinks – nuanced discussion of moderation and wellbeing</li>
  <li>Downshifting – slowing down, simplifying life, reducing stress</li>
</ul>`,
  },
  {
    id: "theme-2",
    title: "The Inner Journey & Life Transitions",
    short: "Emotional, psychological, and spiritual shifts that shape us through life",
    image: innerImage,
    imageLarge: innerImage,
    full: `<p><strong>Subthemes:</strong></p>
<ul>
  <li>Hormonal Changes and Menopause – pre/meno/post menopause, physical/mental changes</li>
  <li>Loss & Rediscovery of Identity – self-esteem, purpose, acceptance, empty nesters</li>
  <li>Personal Boundaries & Limits – managing influence, setting limits, saying yes/no</li>
  <li>Soul, Purpose & Longing – meaning-making, inner beauty, desires without boundaries</li>
  <li>Desires in life – what excites you, what keeps you awake at night</li>
</ul>`,
  },
  {
    id: "theme-3",
    title: "Relationships & Belonging",
    short: "The changing role of relationships and community throughout life",
    image: relationshipsImage,
    imageLarge: relationshipsImage,
    full: `<p><strong>Subthemes:</strong></p>
<ul>
  <li>Family & Friends – friends as family, extended family, kids, partner</li>
  <li>Tribe & Community – social circle, right tribe, belonging</li>
  <li>Sisterhood – shared experience, emotional support, women supporting women</li>
  <li>Changes in Relationships – changes with self, friends, partner, work</li>
  <li>Loneliness & Connection – Internally, externally</li>
</ul>`,
  },
  {
    id: "theme-4",
    title: "Resilience & Daily Mastery",
    short: "Practical skills to navigate daily life with intention and confidence",
    image: resilienceImage,
    imageLarge: resilienceImage,
    full: `<p><strong>Subthemes:</strong></p>
<ul>
  <li>Financial Health – planning, independence, navigating changes</li>
  <li>Work & Purpose – meaning of work, shifting values, staying engaged</li>
  <li>Managing Daily Life – routines, wellbeing now and in the future</li>
  <li>Managing Change, Embracing Limits – adapting to change, mindset</li>
</ul>`,
  },
  {
    id: "theme-5",
    title: "Safety and Security",
    short: "Creating safety that nurtures trust, freedom, and peace of mind",
    image: safetyImage,
    imageLarge: safetyImage,
    full: `<p><strong>Subthemes:</strong></p>
<ul>
  <li>Emotional Safety & Vulnerability – especially for topics like illness, menopause, end-of-life</li>
  <li>Physical Safety – walking alone outside/in darkness, doing daily chores in the society (going to the bank/post/shopping), self defence, unexpected visitors</li>
  <li>IT Security – frauds, whom and what to trust, spam, knowledge</li>
</ul>`,
  },
  {
    id: "theme-6",
    title: "Legacy, Mortality & Future Planning",
    short: "Creating peace of mind through intentional choices for the future",
    image: legacyImage,
    imageLarge: legacyImage,
    full: `<p><strong>Subthemes:</strong></p>
<ul>
  <li>End-of-Life Desires – funeral wishes, music, setting, atmosphere</li>
  <li>Footprints & Legacy – how you want to be remembered</li>
  <li>Care & Contingency Plans – illness, accidents, caregiving preferences</li>
  <li>Legal & Ethical Considerations – will, organ donation, body disposition</li>
</ul>`,
  },
];
