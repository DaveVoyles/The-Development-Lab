import { audiencePaths } from "../data/siteContent";

export function AudiencePaths() {
  return (
    <section className="section-shell" id="audiences">
      <p className="eyebrow">Built for every side of the ecosystem</p>
      <div className="section-heading">
        <h2>Useful now for families and providers. Clear enough for pilot partners and investors.</h2>
        <p>
          Each path routes to the same launch inquiry while the marketplace is pre-live, making early demand easier to
          qualify without pretending the platform is already transactional.
        </p>
      </div>
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
