import { marketStats } from "../data/siteContent";

export function MarketOpportunity() {
  return (
    <section className="section-shell opportunity" id="opportunity">
      <div>
        <p className="eyebrow">Why it matters</p>
        <h2>Youth development works best when the whole athlete is supported.</h2>
        <p>
          Families rely on word of mouth to find trusted help. Providers spend energy chasing the right clients. The
          Development Lab bridges that gap with a clearer, more personalized way to connect.
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

