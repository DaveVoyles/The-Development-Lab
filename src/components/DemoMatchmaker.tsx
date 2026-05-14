import { FormEvent, useMemo, useState } from "react";
import { budgetLabels, categoryLabels, providers, type BudgetTier, type ProviderCategory } from "../data/providers";
import { rankProviders, type MatchFormValues } from "../lib/matchmaking";

const initialValues: MatchFormValues = {
  sport: "lacrosse",
  category: "all",
  budgetTier: "any",
  goal: "skill"
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
          This proof-of-concept uses static sample data to show how families could be matched with providers by sport,
          need, budget, and goals.
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
                <span>{categoryLabels[match.category]}</span>
                <h3>{match.name}</h3>
              </div>
              <strong>{match.score}% fit</strong>
              <p>{match.location}</p>
              <ul>
                {match.reasons.map((reason) => (
                  <li key={reason}>{reason}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

