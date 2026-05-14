import { audiencePaths } from "../data/siteContent";

export function AudiencePaths() {
  return (
    <section className="section-shell" id="audiences">
      <p className="eyebrow">Built for every side of the ecosystem</p>
      <div className="audience-grid">
        {audiencePaths.map((path) => (
          <article className="feature-card audience-card" key={path.title}>
            <h3>{path.title}</h3>
            <p>{path.body}</p>
            <a href="#contact">{path.cta}</a>
          </article>
        ))}
      </div>
    </section>
  );
}

