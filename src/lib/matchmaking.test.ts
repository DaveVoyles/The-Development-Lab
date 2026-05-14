import { describe, expect, it } from "vitest";
import { providers } from "../data/providers";
import { rankProviders } from "./matchmaking";

describe("rankProviders", () => {
  it("prioritizes providers that match sport, category, and budget", () => {
    const matches = rankProviders(providers, {
      sport: "lacrosse",
      category: "sport-specific",
      budgetTier: "standard",
      goal: "skill"
    });

    expect(matches[0].category).toBe("sport-specific");
    expect(matches[0].sports).toContain("lacrosse");
    expect(matches[0].score).toBeGreaterThan(matches[matches.length - 1].score);
  });

  it("includes multi-sport providers when a specific sport is selected", () => {
    const matches = rankProviders(providers, {
      sport: "soccer",
      category: "speed-strength",
      budgetTier: "any",
      goal: "speed"
    });

    expect(matches.some((provider) => provider.sports.includes("multi-sport"))).toBe(true);
  });
});

