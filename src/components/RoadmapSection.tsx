import { roadmap } from "../data/siteContent";

export function RoadmapSection() {
  return (
    <section className="section-shell roadmap" id="roadmap">
      <div className="section-heading">
        <p className="eyebrow">Roadmap</p>
        <h2>Milestones that prove demand before scaling the marketplace.</h2>
        <p>
          This release is intentionally honest: a static MVP and pitch asset first, then pilot workflows, monetization
          tests, and product infrastructure only after demand and supply quality are measured.
        </p>
      </div>
      <div className="timeline">
        {roadmap.map((item) => (
          <article className="timeline-card" key={item.phase}>
            <span>{item.phase}</span>
            <h3>{item.title}</h3>
            <p>{item.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
