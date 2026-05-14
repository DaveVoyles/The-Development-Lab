import { FormEvent, useMemo, useState } from "react";
import {
  ageGroupLabels,
  budgetLabels,
  categoryLabels,
  formatLabels,
  providers,
  supportIntensityLabels,
  supportTypeLabels,
  type AgeGroup,
  type BudgetTier,
  type ProviderCategory,
  type ProviderFormat,
  type SupportIntensity,
  type SupportType
} from "../data/providers";
import { rankProviders, type MatchFormValues } from "../lib/matchmaking";

const initialValues: MatchFormValues = {
  sport: "lacrosse",
  category: "all",
  budgetTier: "any",
  goal: "skill",
  ageGroup: "middle-school",
  format: "hybrid",
  supportIntensity: "steady",
  supportType: "monthly"
};

const goals = ["skill", "speed", "confidence", "academics", "strength"];

export function DemoMatchmaker() {
  const [values, setValues] = useState<MatchFormValues>(initialValues);
  const [submittedValues, setSubmittedValues] = useState<MatchFormValues>(initialValues);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const matches = useMemo(() => rankProviders(providers, submittedValues).slice(0, 4), [submittedValues]);

  function submitMatch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmittedValues(values);
    setHasSubmitted(true);
  }

  return (
    <section className="section-shell matchmaker" id="matchmaker">
      <div className="section-heading">
        <p className="eyebrow">Demo matchmaker</p>
        <h2>Find the right fit in minutes.</h2>
        <p>
          This proof-of-concept uses static sample data to show how families could compare trusted providers by sport,
          support type, budget, format, age fit, availability, and proof signals.
        </p>
      </div>
      <div className="matchmaker-layout">
        <form className="match-form" onSubmit={submitMatch}>
          <label>
            Sport
            <select value={values.sport} onChange={(event) => setValues({ ...values, sport: event.target.value })}>
              <option value="lacrosse">Lacrosse</option>
              <option value="football">Football</option>
              <option value="soccer">Soccer</option>
              <option value="multi-sport">Multi-sport</option>
            </select>
          </label>
          <label>
            Support needed
            <select
              value={values.category}
              onChange={(event) => setValues({ ...values, category: event.target.value as ProviderCategory | "all" })}
            >
              <option value="all">Comprehensive support</option>
              {Object.entries(categoryLabels).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </label>
          <label>
            Athlete age
            <select
              value={values.ageGroup}
              onChange={(event) => setValues({ ...values, ageGroup: event.target.value as AgeGroup | "any" })}
            >
              <option value="any">Any age range</option>
              {Object.entries(ageGroupLabels).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </label>
          <label>
            Preferred format
            <select
              value={values.format}
              onChange={(event) => setValues({ ...values, format: event.target.value as ProviderFormat | "any" })}
            >
              <option value="any">Any format</option>
              {Object.entries(formatLabels).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </label>
          <label>
            Support pace
            <select
              value={values.supportIntensity}
              onChange={(event) => setValues({ ...values, supportIntensity: event.target.value as SupportIntensity })}
            >
              {Object.entries(supportIntensityLabels).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </label>
          <label>
            Support type
            <select
              value={values.supportType}
              onChange={(event) => setValues({ ...values, supportType: event.target.value as SupportType | "any" })}
            >
              <option value="any">Flexible support model</option>
              {Object.entries(supportTypeLabels).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </label>
          <label>
            Budget range
            <select
              value={values.budgetTier}
              onChange={(event) => setValues({ ...values, budgetTier: event.target.value as BudgetTier | "any" })}
            >
              <option value="any">Flexible</option>
              {Object.entries(budgetLabels).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </label>
          <label>
            Main goal
            <select value={values.goal} onChange={(event) => setValues({ ...values, goal: event.target.value })}>
              {goals.map((goal) => (
                <option key={goal} value={goal}>
                  {goal[0].toUpperCase() + goal.slice(1)}
                </option>
              ))}
            </select>
          </label>
          <button className="button button-primary" type="submit">
            Show My Matches
          </button>
        </form>

        <div className={`match-results${hasSubmitted ? " match-results-active" : ""}`}>
          <p className="results-label">{hasSubmitted ? "Recommended matches" : "Sample recommendations"}</p>
          {matches.map((match) => (
            <article className="match-card" key={match.id}>
              <div>
                <span className={`cat-${match.category}`}>{categoryLabels[match.category]}</span>
                <h3>{match.name}</h3>
              </div>
              <strong>{match.score}% fit</strong>
              <p>
                {match.location} · {budgetLabels[match.budgetTier]} · {match.responseTime}
              </p>
              <p>{match.matchStrength}</p>

              <div>
                <span>Formats: {match.formats.map((format) => formatLabels[format]).join(", ")}</span>
                <br />
                <span>Availability: {match.availability}</span>
                <br />
                <span>Trust: {match.credentials[0] ?? "Verified provider"} · {match.trustSignals[0] ?? "Trust signals"}</span>
              </div>

              <ul>
                {match.reasons.slice(0, 3).map((reason) => (
                  <li key={reason}>{reason}</li>
                ))}
              </ul>

              <div>
                <strong>Score breakdown</strong>
                <ul>
                  {match.factorBreakdown.map((breakdown) => (
                    <li key={breakdown.key}>
                      {breakdown.label}: {breakdown.score}/{breakdown.max} — {breakdown.detail}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <strong>Best for</strong>
                <ul>
                  {match.bestFor.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>

              <div>
                <strong>Tradeoffs</strong>
                <ul>
                  {match.tradeoffs.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="cta-row">
                <button className="button button-primary" type="button">
                  View details
                </button>
                <button className="button button-secondary" type="button">
                  Compare
                </button>
                <button className="button button-secondary" type="button">
                  Save match
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
