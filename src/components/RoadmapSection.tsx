import { roadmap } from "../data/siteContent";

export function RoadmapSection() {
  return (
    <section className="section-shell roadmap" id="roadmap">
      <div className="section-heading">
        <p className="eyebrow">Roadmap</p>
        <h2>Starting simple. Building toward a full service ecosystem.</h2>
        <p>
          The first release validates demand and tells the story. Later phases can add accounts, booking, payments,
          recommendations, and athlete intelligence.
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

