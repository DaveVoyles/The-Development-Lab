import type {
  AgeGroup,
  BudgetTier,
  Provider,
  ProviderCategory,
  ProviderFormat,
  SupportIntensity,
  SupportType
} from "../data/providers";

export type MatchFormValues = {
  sport: string;
  category: ProviderCategory | "all";
  budgetTier: BudgetTier | "any";
  goal: string;
  ageGroup: AgeGroup | "any";
  format: ProviderFormat | "any";
  supportIntensity: SupportIntensity;
  supportType: SupportType | "any";
};

export type MatchFactorKey = "sport" | "support" | "budget" | "format" | "age" | "trust" | "goal";

export type MatchFactor = {
  key: MatchFactorKey;
  label: string;
  score: number;
  max: number;
  detail: string;
};

export type ProviderMatch = Provider & {
  score: number;
  reasons: string[];
  factorBreakdown: MatchFactor[];
};

const budgetRank: Record<BudgetTier, number> = {
  entry: 1,
  standard: 2,
  premium: 3
};

const factorLabels: Record<MatchFactorKey, string> = {
  sport: "Sport fit",
  support: "Support fit",
  budget: "Budget fit",
  format: "Format fit",
  age: "Age fit",
  trust: "Trust fit",
  goal: "Goal fit"
};

const factorMax: Record<MatchFactorKey, number> = {
  sport: 20,
  support: 18,
  budget: 14,
  format: 12,
  age: 12,
  trust: 10,
  goal: 14
};

function factor(key: MatchFactorKey, score: number, detail: string): MatchFactor {
  return {
    key,
    label: factorLabels[key],
    score,
    max: factorMax[key],
    detail
  };
}

function getSportFactor(provider: Provider, sport: string): MatchFactor {
  if (provider.sports.includes(sport)) {
    return factor("sport", 20, `Directly supports ${sport}`);
  }

  if (provider.sports.includes("multi-sport") || sport === "multi-sport") {
    return factor("sport", 14, "Works with multi-sport athletes");
  }

  return factor("sport", 0, `No clear ${sport} specialization`);
}

function getSupportFactor(provider: Provider, values: MatchFormValues): MatchFactor {
  const categoryScore = values.category === "all" ? 10 : provider.category === values.category ? 12 : 0;
  const typeScore = values.supportType === "any" ? 4 : provider.supportTypes.includes(values.supportType) ? 4 : 0;
  const urgencyScore = values.supportIntensity === "urgent" && /same day|24 hours|1 business day/i.test(provider.responseTime) ? 2 : 0;
  const exploratoryScore = values.supportIntensity === "exploring" && provider.supportTypes.includes("one-time") ? 2 : 0;
  const steadyScore = values.supportIntensity === "steady" && provider.supportTypes.includes("monthly") ? 2 : 0;
  const score = Math.min(18, categoryScore + typeScore + urgencyScore + exploratoryScore + steadyScore);

  if (score >= 16) {
    return factor("support", score, "Service category, support model, and urgency line up");
  }

  if (score > 0) {
    return factor("support", score, "Partial fit for the requested support model");
  }

  return factor("support", 0, "Different support category or engagement model");
}

function getBudgetFactor(provider: Provider, budgetTier: MatchFormValues["budgetTier"]): MatchFactor {
  if (budgetTier === "any") {
    return factor("budget", 14, "Budget is flexible for this search");
  }

  const providerRank = budgetRank[provider.budgetTier];
  const selectedRank = budgetRank[budgetTier];

  if (providerRank === selectedRank) {
    return factor("budget", 14, "Matches the selected budget tier");
  }

  if (providerRank < selectedRank) {
    return factor("budget", 12, "Comes in below the selected budget tier");
  }

  if (providerRank === selectedRank + 1) {
    return factor("budget", 5, "Slightly above the selected budget tier");
  }

  return factor("budget", 0, "Likely above the selected budget range");
}

function getFormatFactor(provider: Provider, formatPreference: MatchFormValues["format"]): MatchFactor {
  if (formatPreference === "any") {
    return factor("format", 12, "Can evaluate multiple delivery formats");
  }

  if (provider.formats.includes(formatPreference)) {
    return factor("format", 12, `Offers ${formatPreference.replace("-", " ")} support`);
  }

  if (formatPreference === "hybrid" && provider.formats.some((formatValue) => formatValue === "in-person" || formatValue === "remote")) {
    return factor("format", 6, "Offers part of the preferred hybrid format");
  }

  return factor("format", 0, "Does not match the preferred format");
}

function getAgeFactor(provider: Provider, ageGroup: MatchFormValues["ageGroup"]): MatchFactor {
  if (ageGroup === "any") {
    return factor("age", 12, "Age range is flexible");
  }

  if (provider.ageGroups.includes(ageGroup)) {
    return factor("age", 12, `Works with ${ageGroup.replace("-", " ")} athletes`);
  }

  return factor("age", 0, "Outside the provider's stated age focus");
}

function getTrustFactor(provider: Provider): MatchFactor {
  const credentialScore = provider.credentials.length > 0 ? 3 : 0;
  const signalScore = Math.min(4, provider.trustSignals.length);
  const experienceScore = provider.yearsExperience >= 10 ? 3 : provider.yearsExperience >= 5 ? 2 : 1;
  const score = Math.min(10, credentialScore + signalScore + experienceScore);

  return factor(
    "trust",
    score,
    `${provider.yearsExperience}+ years, ${provider.credentials[0] ?? "provider credentials"}, and ${provider.trustSignals[0] ?? "trust signals"}`
  );
}

function getGoalFactor(provider: Provider, goal: string): MatchFactor {
  const normalizedGoal = goal.trim().toLowerCase();

  if (!normalizedGoal) {
    return factor("goal", 7, "No specific goal selected, so fit is based on profile strength");
  }

  const searchableText = [
    ...provider.services,
    ...provider.tags,
    ...provider.bestFor,
    ...provider.credentials,
    ...provider.trustSignals,
    provider.matchStrength
  ]
    .join(" ")
    .toLowerCase();

  if (searchableText.includes(normalizedGoal)) {
    return factor("goal", 14, `Directly supports ${goal}`);
  }

  const relatedGoalTerms: Record<string, string[]> = {
    skill: ["position", "fundamentals", "technique", "development"],
    speed: ["agility", "explosiveness", "mechanics", "movement"],
    confidence: ["mindset", "resilience", "family", "pressure"],
    academics: ["study", "homework", "test", "student"],
    strength: ["power", "performance", "movement", "fitness"]
  };

  if (relatedGoalTerms[normalizedGoal]?.some((term) => searchableText.includes(term))) {
    return factor("goal", 9, `Related experience for ${goal}`);
  }

  return factor("goal", 0, `No obvious ${goal} proof point`);
}

function topReasons(factors: MatchFactor[], provider: Provider): string[] {
  return factors
    .filter((breakdown) => breakdown.score > 0)
    .sort((a, b) => b.score / b.max - a.score / a.max || b.score - a.score)
    .slice(0, 3)
    .map((breakdown) => breakdown.detail)
    .concat(provider.matchStrength)
    .slice(0, 4);
}

export function rankProviders(providers: Provider[], values: MatchFormValues): ProviderMatch[] {
  return providers
    .map((provider) => {
      const factorBreakdown = [
        getSportFactor(provider, values.sport),
        getSupportFactor(provider, values),
        getBudgetFactor(provider, values.budgetTier),
        getFormatFactor(provider, values.format),
        getAgeFactor(provider, values.ageGroup),
        getTrustFactor(provider),
        getGoalFactor(provider, values.goal)
      ];
      const score = factorBreakdown.reduce((total, breakdown) => total + breakdown.score, 0);

      return {
        ...provider,
        score,
        reasons: topReasons(factorBreakdown, provider),
        factorBreakdown
      };
    })
    .filter((provider) => provider.score > 0)
    .sort((a, b) => b.score - a.score || a.name.localeCompare(b.name));
}
