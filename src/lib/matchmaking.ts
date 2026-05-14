import type { BudgetTier, Provider, ProviderCategory } from "../data/providers";

export type MatchFormValues = {
  sport: string;
  category: ProviderCategory | "all";
  budgetTier: BudgetTier | "any";
  goal: string;
};

export type ProviderMatch = Provider & {
  score: number;
  reasons: string[];
};

const budgetRank: Record<BudgetTier, number> = {
  entry: 1,
  standard: 2,
  premium: 3
};

export function rankProviders(providers: Provider[], values: MatchFormValues): ProviderMatch[] {
  return providers
    .map((provider) => {
      const reasons: string[] = [];
      let score = 0;

      if (provider.sports.includes(values.sport) || provider.sports.includes("multi-sport")) {
        score += 30;
        reasons.push(provider.sports.includes(values.sport) ? `Supports ${values.sport}` : "Works with multi-sport athletes");
      }

      if (values.category === "all" || provider.category === values.category) {
        score += 25;
        reasons.push(values.category === "all" ? "Fits a broad support search" : "Matches the requested service category");
      }

      if (values.budgetTier === "any") {
        score += 15;
        reasons.push("Available within flexible budget preferences");
      } else if (provider.budgetTier === values.budgetTier) {
        score += 20;
        reasons.push("Matches the selected budget tier");
      } else if (budgetRank[provider.budgetTier] < budgetRank[values.budgetTier]) {
        score += 12;
        reasons.push("Comes in below the selected budget tier");
      }

      const normalizedGoal = values.goal.toLowerCase();
      const searchableText = [...provider.services, ...provider.tags].join(" ").toLowerCase();
      if (normalizedGoal && searchableText.includes(normalizedGoal)) {
        score += 15;
        reasons.push(`Directly supports ${values.goal}`);
      }

      if (provider.tags.includes("pilot partner")) {
        score += 5;
        reasons.push("Pilot partner opportunity");
      }

      return { ...provider, score, reasons: reasons.slice(0, 3) };
    })
    .filter((provider) => provider.score > 0)
    .sort((a, b) => b.score - a.score || a.name.localeCompare(b.name));
}

