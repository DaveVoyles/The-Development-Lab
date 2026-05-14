export type ProviderCategory =
  | "sport-specific"
  | "speed-strength"
  | "tutoring"
  | "mental-performance"
  | "program-partner";

export type BudgetTier = "entry" | "standard" | "premium";

export type Provider = {
  id: string;
  name: string;
  category: ProviderCategory;
  sports: string[];
  location: string;
  budgetTier: BudgetTier;
  services: string[];
  tags: string[];
};

export const categoryLabels: Record<ProviderCategory, string> = {
  "sport-specific": "Sport-Specific Training",
  "speed-strength": "Speed, Agility & Strength",
  tutoring: "Tutoring",
  "mental-performance": "Mental Performance",
  "program-partner": "Program Partner"
};

export const budgetLabels: Record<BudgetTier, string> = {
  entry: "Budget-friendly",
  standard: "Standard",
  premium: "Premium"
};

export const providers: Provider[] = [
  {
    id: "two-wolves",
    name: "2Wolves",
    category: "sport-specific",
    sports: ["lacrosse"],
    location: "Long Island, NY",
    budgetTier: "premium",
    services: ["Position training", "Small group sessions", "Player evaluation"],
    tags: ["advanced", "skill work", "pilot partner"]
  },
  {
    id: "next-tier",
    name: "NextTier",
    category: "sport-specific",
    sports: ["lacrosse"],
    location: "Long Island, NY",
    budgetTier: "standard",
    services: ["Skill development", "Private coaching", "Offseason plans"],
    tags: ["development", "goal setting", "pilot partner"]
  },
  {
    id: "creasebeast",
    name: "CreaseBeast",
    category: "sport-specific",
    sports: ["lacrosse"],
    location: "New York Metro",
    budgetTier: "standard",
    services: ["Goalie training", "Film review", "Confidence building"],
    tags: ["goalie", "specialist", "technical"]
  },
  {
    id: "coach-brady",
    name: "Coach Brady",
    category: "sport-specific",
    sports: ["football"],
    location: "Long Island, NY",
    budgetTier: "standard",
    services: ["Football fundamentals", "Position work", "Strength coordination"],
    tags: ["football", "fundamentals", "program-ready"]
  },
  {
    id: "c-fin-fitness",
    name: "C Fin Fitness Facility",
    category: "speed-strength",
    sports: ["lacrosse", "football", "soccer", "multi-sport"],
    location: "West Hempstead, NY",
    budgetTier: "standard",
    services: ["Speed training", "Strength training", "Movement screening"],
    tags: ["facility", "speed", "strength"]
  },
  {
    id: "ghost-athletics",
    name: "Ghost Athletics",
    category: "speed-strength",
    sports: ["lacrosse", "football", "soccer", "multi-sport"],
    location: "Amityville, NY",
    budgetTier: "premium",
    services: ["Explosiveness", "Agility", "Athlete performance plans"],
    tags: ["performance", "agility", "power"]
  },
  {
    id: "revolution-athletics",
    name: "Revolution Athletics",
    category: "speed-strength",
    sports: ["multi-sport"],
    location: "Ronkonkoma, NY",
    budgetTier: "entry",
    services: ["Group training", "Speed mechanics", "Strength foundations"],
    tags: ["group", "foundational", "budget"]
  },
  {
    id: "kristina-leone",
    name: "Kristina Leone",
    category: "tutoring",
    sports: ["multi-sport"],
    location: "Remote / Long Island",
    budgetTier: "standard",
    services: ["Academic tutoring", "Study planning", "Student accountability"],
    tags: ["academics", "remote", "student support"]
  },
  {
    id: "chelsea-chizever",
    name: "Chelsea Chizever",
    category: "tutoring",
    sports: ["multi-sport"],
    location: "Remote / New York",
    budgetTier: "entry",
    services: ["Tutoring", "Homework support", "Test preparation"],
    tags: ["academics", "test prep", "budget"]
  },
  {
    id: "coach-jeff-becker",
    name: "Coach Jeff Becker",
    category: "mental-performance",
    sports: ["multi-sport"],
    location: "Remote / New York",
    budgetTier: "premium",
    services: ["Mental performance", "Confidence routines", "Family support"],
    tags: ["mindset", "resilience", "confidence"]
  }
];

