import { pillars } from "../data/siteContent";

export function FourPillars() {
  return (
    <section className="section-shell" id="pillars">
      <p className="eyebrow">The four pillars</p>
      <div className="section-heading">
        <h2>One platform for the full youth athlete development journey.</h2>
        <p>
          The Development Lab connects performance, academics, and mindset instead of forcing families to piece it
          together provider by provider.
        </p>
      </div>
      <div className="card-grid">
        {pillars.map((pillar) => (
          <article className="feature-card" key={pillar.title}>
            <span className="card-orb" />
            <h3>{pillar.title}</h3>
            <strong>{pillar.kicker}</strong>
            <p>{pillar.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

