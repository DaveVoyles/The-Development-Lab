import { describe, expect, it } from "vitest";
import { providers, type Provider } from "../data/providers";
import { rankProviders, type MatchFormValues } from "./matchmaking";

const baseValues: MatchFormValues = {
  sport: "lacrosse",
  category: "sport-specific",
  budgetTier: "standard",
  goal: "skill",
  ageGroup: "middle-school",
  format: "hybrid",
  supportIntensity: "steady",
  supportType: "monthly"
};

function provider(overrides: Partial<Provider>): Provider {
  return {
    id: "base-provider",
    name: "Base Provider",
    category: "sport-specific",
    sports: ["lacrosse"],
    location: "Long Island, NY",
    budgetTier: "standard",
    services: ["Skill development"],
    tags: ["skill"],
    credentials: ["Certified coach"],
    yearsExperience: 8,
    formats: ["hybrid"],
    ageGroups: ["middle-school"],
    availability: "Open this week",
    responseTime: "Replies within 1 business day",
    trustSignals: ["Background checked", "Parent references"],
    bestFor: ["Skill development"],
    tradeoffs: ["Limited weekend slots"],
    matchStrength: "Good all-around fit for skill development.",
    supportTypes: ["monthly"],
    ...overrides
  };
}

describe("rankProviders", () => {
  it("prioritizes providers that match sport, category, budget, format, age, and goal", () => {
    const matches = rankProviders(providers, baseValues);

    expect(matches[0].category).toBe("sport-specific");
    expect(matches[0].sports).toContain("lacrosse");
    expect(matches[0].score).toBeGreaterThan(matches[matches.length - 1].score);
    expect(matches[0].factorBreakdown.map((factor) => factor.key)).toEqual([
      "sport",
      "support",
      "budget",
      "format",
      "age",
      "trust",
      "goal"
    ]);
  });

  it("includes multi-sport providers when a specific sport is selected", () => {
    const matches = rankProviders(providers, {
      ...baseValues,
      sport: "soccer",
      category: "speed-strength",
      budgetTier: "any",
      goal: "speed",
      format: "in-person"
    });

    expect(matches.some((match) => match.sports.includes("multi-sport"))).toBe(true);
  });

  it("keeps scoring transparent by summing the factor breakdown", () => {
    const [match] = rankProviders([provider({})], baseValues);
    const summedScore = match.factorBreakdown.reduce((total, factor) => total + factor.score, 0);

    expect(match.score).toBe(summedScore);
    expect(match.score).toBeLessThanOrEqual(100);
    expect(match.reasons.length).toBeGreaterThan(0);
  });

  it("penalizes providers that are above the selected budget and outside the age focus", () => {
    const [match] = rankProviders(
      [
        provider({
          budgetTier: "premium",
          ageGroups: ["college-prep"],
          formats: ["in-person"]
        })
      ],
      {
        ...baseValues,
        budgetTier: "entry",
        ageGroup: "elementary",
        format: "remote"
      }
    );

    expect(match.factorBreakdown.find((factor) => factor.key === "budget")?.score).toBe(0);
    expect(match.factorBreakdown.find((factor) => factor.key === "age")?.score).toBe(0);
    expect(match.factorBreakdown.find((factor) => factor.key === "format")?.score).toBe(0);
  });

  it("rewards urgent searches when response time is fast", () => {
    const fast = provider({ id: "fast", name: "Fast Provider", responseTime: "Replies same day" });
    const slow = provider({ id: "slow", name: "Slow Provider", responseTime: "Replies within 48 hours" });
    const matches = rankProviders([slow, fast], {
      ...baseValues,
      supportIntensity: "urgent"
    });

    expect(matches[0].id).toBe("fast");
    expect(matches[0].factorBreakdown.find((factor) => factor.key === "support")?.score).toBeGreaterThan(
      matches[1].factorBreakdown.find((factor) => factor.key === "support")?.score ?? 0
    );
  });
});
