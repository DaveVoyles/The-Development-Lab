export type ProviderCategory =
  | "sport-specific"
  | "speed-strength"
  | "tutoring"
  | "mental-performance"
  | "program-partner";

export type BudgetTier = "entry" | "standard" | "premium";

export type ProviderFormat = "in-person" | "remote" | "hybrid" | "small-group" | "team";

export type AgeGroup = "elementary" | "middle-school" | "high-school" | "college-prep";

export type SupportIntensity = "exploring" | "steady" | "urgent";

export type SupportType = "one-time" | "monthly" | "program";

export type Provider = {
  id: string;
  name: string;
  category: ProviderCategory;
  sports: string[];
  location: string;
  budgetTier: BudgetTier;
  services: string[];
  tags: string[];
  credentials: string[];
  yearsExperience: number;
  formats: ProviderFormat[];
  ageGroups: AgeGroup[];
  availability: string;
  responseTime: string;
  trustSignals: string[];
  bestFor: string[];
  tradeoffs: string[];
  matchStrength: string;
  supportTypes: SupportType[];
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

export const formatLabels: Record<ProviderFormat, string> = {
  "in-person": "In-person",
  remote: "Remote",
  hybrid: "Hybrid",
  "small-group": "Small group",
  team: "Team / program"
};

export const ageGroupLabels: Record<AgeGroup, string> = {
  elementary: "Elementary",
  "middle-school": "Middle school",
  "high-school": "High school",
  "college-prep": "College prep"
};

export const supportIntensityLabels: Record<SupportIntensity, string> = {
  exploring: "Exploring options",
  steady: "Steady support",
  urgent: "Need help soon"
};

export const supportTypeLabels: Record<SupportType, string> = {
  "one-time": "One-time evaluation",
  monthly: "Ongoing monthly support",
  program: "Team or program package"
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
    tags: ["advanced", "skill work", "pilot partner"],
    credentials: ["Former college players", "Position-specific coaching staff"],
    yearsExperience: 11,
    formats: ["in-person", "small-group"],
    ageGroups: ["middle-school", "high-school", "college-prep"],
    availability: "Limited weeknight and Sunday evaluation windows",
    responseTime: "Replies within 24 hours",
    trustSignals: ["Pilot partner", "Player evaluation notes", "Small-group roster caps"],
    bestFor: ["Advanced lacrosse players", "Position-specific skill polish", "Families seeking a premium specialist"],
    tradeoffs: ["Premium pricing", "Limited beginner availability"],
    matchStrength: "Strong when a lacrosse athlete needs a specialist who can diagnose technique and raise the training ceiling.",
    supportTypes: ["one-time", "monthly"]
  },
  {
    id: "next-tier",
    name: "NextTier",
    category: "sport-specific",
    sports: ["lacrosse"],
    location: "Long Island, NY",
    budgetTier: "standard",
    services: ["Skill development", "Private coaching", "Offseason plans"],
    tags: ["development", "goal setting", "pilot partner"],
    credentials: ["Youth development coaches", "Season planning framework"],
    yearsExperience: 8,
    formats: ["in-person", "hybrid", "small-group"],
    ageGroups: ["elementary", "middle-school", "high-school"],
    availability: "After-school slots and flexible offseason blocks",
    responseTime: "Replies within 1 business day",
    trustSignals: ["Pilot partner", "Goal-setting check-ins", "Parent progress summaries"],
    bestFor: ["Developing lacrosse players", "Families wanting a practical training plan", "Athletes building confidence through reps"],
    tradeoffs: ["Less specialized for goalies", "Peak season slots may fill quickly"],
    matchStrength: "Balanced fit for families who need accessible lacrosse coaching, clear goals, and manageable next steps.",
    supportTypes: ["one-time", "monthly", "program"]
  },
  {
    id: "creasebeast",
    name: "CreaseBeast",
    category: "sport-specific",
    sports: ["lacrosse"],
    location: "New York Metro",
    budgetTier: "standard",
    services: ["Goalie training", "Film review", "Confidence building"],
    tags: ["goalie", "specialist", "technical"],
    credentials: ["Goalie specialist", "Film-based development process"],
    yearsExperience: 9,
    formats: ["in-person", "remote", "hybrid"],
    ageGroups: ["middle-school", "high-school", "college-prep"],
    availability: "Remote film review weekly; field sessions by appointment",
    responseTime: "Replies within 48 hours",
    trustSignals: ["Position-specific film review", "Technique checkpoints"],
    bestFor: ["Lacrosse goalies", "Athletes who learn through film", "Confidence and technical cleanup"],
    tradeoffs: ["Narrow goalie focus", "Not a general team training provider"],
    matchStrength: "Best when the athlete is a goalie and the family needs clear technical proof points from film and field work.",
    supportTypes: ["one-time", "monthly"]
  },
  {
    id: "coach-brady",
    name: "Coach Brady",
    category: "sport-specific",
    sports: ["football"],
    location: "Long Island, NY",
    budgetTier: "standard",
    services: ["Football fundamentals", "Position work", "Strength coordination"],
    tags: ["football", "fundamentals", "program-ready"],
    credentials: ["High school football coach", "Position fundamentals curriculum"],
    yearsExperience: 14,
    formats: ["in-person", "small-group", "team"],
    ageGroups: ["middle-school", "high-school"],
    availability: "Weekend clinics and limited weekday position blocks",
    responseTime: "Replies within 1 business day",
    trustSignals: ["School-program experience", "Practice-ready progression", "Parent communication"],
    bestFor: ["Football fundamentals", "Position confidence", "Athletes bridging youth and school programs"],
    tradeoffs: ["In-person only", "Less suited for academic or remote support"],
    matchStrength: "Reliable fit for football families who need fundamentals, accountability, and readiness for organized play.",
    supportTypes: ["one-time", "monthly", "program"]
  },
  {
    id: "c-fin-fitness",
    name: "C Fin Fitness Facility",
    category: "speed-strength",
    sports: ["lacrosse", "football", "soccer", "multi-sport"],
    location: "West Hempstead, NY",
    budgetTier: "standard",
    services: ["Speed training", "Strength training", "Movement screening"],
    tags: ["facility", "speed", "strength"],
    credentials: ["Certified strength staff", "Movement screening process"],
    yearsExperience: 10,
    formats: ["in-person", "small-group", "team"],
    ageGroups: ["middle-school", "high-school", "college-prep"],
    availability: "Multiple small-group blocks each week",
    responseTime: "Replies same day",
    trustSignals: ["Facility-based training", "Movement screen baseline", "Progress tracking"],
    bestFor: ["Speed and strength foundations", "Multi-sport athletes", "Families who want measurable training blocks"],
    tradeoffs: ["Requires facility travel", "Less sport-specific instruction"],
    matchStrength: "Strong multi-sport option when performance gains and measurable movement baselines matter most.",
    supportTypes: ["monthly", "program"]
  },
  {
    id: "ghost-athletics",
    name: "Ghost Athletics",
    category: "speed-strength",
    sports: ["lacrosse", "football", "soccer", "multi-sport"],
    location: "Amityville, NY",
    budgetTier: "premium",
    services: ["Explosiveness", "Agility", "Athlete performance plans"],
    tags: ["performance", "agility", "power"],
    credentials: ["Performance training staff", "Athlete assessment protocol"],
    yearsExperience: 12,
    formats: ["in-person", "small-group", "team"],
    ageGroups: ["high-school", "college-prep"],
    availability: "Performance assessment openings twice monthly",
    responseTime: "Replies within 24 hours",
    trustSignals: ["Assessment-led plans", "Performance benchmarks", "Advanced athlete focus"],
    bestFor: ["Explosive athletes", "Advanced strength and agility", "Families ready for premium performance plans"],
    tradeoffs: ["Premium pricing", "Better for older athletes with training history"],
    matchStrength: "Best for serious athletes who need a high-performance plan and proof through benchmarks.",
    supportTypes: ["monthly", "program"]
  },
  {
    id: "revolution-athletics",
    name: "Revolution Athletics",
    category: "speed-strength",
    sports: ["multi-sport"],
    location: "Ronkonkoma, NY",
    budgetTier: "entry",
    services: ["Group training", "Speed mechanics", "Strength foundations"],
    tags: ["group", "foundational", "budget"],
    credentials: ["Youth fitness coaches", "Foundational movement curriculum"],
    yearsExperience: 7,
    formats: ["in-person", "small-group"],
    ageGroups: ["elementary", "middle-school", "high-school"],
    availability: "Open group classes most weekdays",
    responseTime: "Replies within 48 hours",
    trustSignals: ["Budget-friendly groups", "Age-aware foundations", "Low-pressure trial class"],
    bestFor: ["Budget-conscious families", "Foundational speed mechanics", "Younger multi-sport athletes"],
    tradeoffs: ["Less individualized attention", "Longer response window"],
    matchStrength: "Good entry point when a family wants affordable group training before committing to private support.",
    supportTypes: ["one-time", "monthly"]
  },
  {
    id: "kristina-leone",
    name: "Kristina Leone",
    category: "tutoring",
    sports: ["multi-sport"],
    location: "Remote / Long Island",
    budgetTier: "standard",
    services: ["Academic tutoring", "Study planning", "Student accountability"],
    tags: ["academics", "remote", "student support"],
    credentials: ["Academic tutor", "Student planning specialist"],
    yearsExperience: 6,
    formats: ["remote", "hybrid"],
    ageGroups: ["middle-school", "high-school", "college-prep"],
    availability: "Remote weeknight sessions available",
    responseTime: "Replies same day",
    trustSignals: ["Study plan templates", "Family accountability notes", "Remote-friendly scheduling"],
    bestFor: ["Busy athletes balancing school and sport", "Study planning", "Ongoing accountability"],
    tradeoffs: ["Not sport instruction", "Limited elementary availability"],
    matchStrength: "Strong support match when academic consistency is the blocker to athletic confidence or eligibility.",
    supportTypes: ["monthly"]
  },
  {
    id: "chelsea-chizever",
    name: "Chelsea Chizever",
    category: "tutoring",
    sports: ["multi-sport"],
    location: "Remote / New York",
    budgetTier: "entry",
    services: ["Tutoring", "Homework support", "Test preparation"],
    tags: ["academics", "test prep", "budget"],
    credentials: ["Tutoring specialist", "Test-prep support"],
    yearsExperience: 5,
    formats: ["remote"],
    ageGroups: ["elementary", "middle-school", "high-school"],
    availability: "Flexible remote homework support blocks",
    responseTime: "Replies within 1 business day",
    trustSignals: ["Budget-friendly remote support", "Homework accountability", "Test-prep structure"],
    bestFor: ["Homework support", "Families needing remote flexibility", "Budget-conscious academic help"],
    tradeoffs: ["Remote only", "Not a sport performance provider"],
    matchStrength: "Practical fit for families who need affordable academic support that works around training and games.",
    supportTypes: ["one-time", "monthly"]
  },
  {
    id: "coach-jeff-becker",
    name: "Coach Jeff Becker",
    category: "mental-performance",
    sports: ["multi-sport"],
    location: "Remote / New York",
    budgetTier: "premium",
    services: ["Mental performance", "Confidence routines", "Family support"],
    tags: ["mindset", "resilience", "confidence"],
    credentials: ["Mental performance coach", "Family support sessions"],
    yearsExperience: 15,
    formats: ["remote", "hybrid"],
    ageGroups: ["middle-school", "high-school", "college-prep"],
    availability: "Intake calls within the next two weeks",
    responseTime: "Replies within 24 hours",
    trustSignals: ["Structured intake", "Family-aligned routines", "Confidential remote sessions"],
    bestFor: ["Confidence blocks", "Pressure management", "Families needing emotional support around sport"],
    tradeoffs: ["Premium pricing", "Not a replacement for clinical care"],
    matchStrength: "High-trust match when confidence, resilience, or family alignment is the core development need.",
    supportTypes: ["one-time", "monthly"]
  }
];
