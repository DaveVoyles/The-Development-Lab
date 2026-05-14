import { marketStats } from "../data/siteContent";

export function MarketOpportunity() {
  return (
    <section className="section-shell opportunity" id="opportunity">
      <div>
        <p className="eyebrow">Market opportunity</p>
        <h2>Families already spend across the athlete journey. The workflow is still fragmented.</h2>
        <p>
          Training, tutoring, and mental-performance support are usually found through scattered referrals, DMs, and
          spreadsheets. The Development Lab packages that demand into a focused marketplace thesis: help families choose
          trusted support while giving providers and programs a better channel for high-intent matches.
        </p>
      </div>
      <div className="stat-grid">
        {marketStats.map((stat) => (
          <article className="stat-card" key={stat.label}>
            <strong>{stat.value}</strong>
            <span>{stat.label}</span>
          </article>
        ))}
      </div>
    </section>
  );
}
