import { businessModels, moatPoints, proofPoints } from "../data/siteContent";

export function InvestorPitchSection() {
  return (
    <section className="section-shell" id="pitch">
      <p className="eyebrow">Investor pitch</p>
      <div className="section-heading">
        <h2>A whole-athlete marketplace with three monetization paths and a measurable pilot plan.</h2>
        <p>
          The thesis is not that this MVP has live traction yet. It is that youth-athlete support is fragmented, demand
          is high-intent, and a trusted matching layer can compound data, provider quality, and program distribution.
        </p>
      </div>

      <div className="stat-grid">
        {proofPoints.map((point) => (
          <article className="stat-card" key={point.label}>
            <strong>{point.value}</strong>
            <span>{point.label}</span>
          </article>
        ))}
      </div>

      <div className="section-heading">
        <h3>Business model to test in pilots</h3>
      </div>
      <div className="card-grid">
        {businessModels.map((model) => (
          <article className="feature-card" key={model.title}>
            <span className="card-orb" />
            <h3>{model.title}</h3>
            <p>{model.body}</p>
          </article>
        ))}
      </div>

      <div className="section-heading">
        <h3>Moat hypotheses to prove over time</h3>
      </div>
      <div className="card-grid">
        {moatPoints.map((point) => (
          <article className="feature-card" key={point.title}>
            <h3>{point.title}</h3>
            <p>{point.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
