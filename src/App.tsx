import { lazy, Suspense } from "react";
import { AudiencePaths } from "./components/AudiencePaths";
import { ContactSection } from "./components/ContactSection";
import { DemoMatchmaker } from "./components/DemoMatchmaker";
import { FourPillars } from "./components/FourPillars";
import { InvestorPitchSection } from "./components/InvestorPitchSection";
import { MarketOpportunity } from "./components/MarketOpportunity";
import { ProviderNetwork } from "./components/ProviderNetwork";
import { RoadmapSection } from "./components/RoadmapSection";

const DevelopmentNetwork = lazy(() =>
  import("./webgl/DevelopmentNetwork").then((module) => ({ default: module.DevelopmentNetwork }))
);

const sections = [
  { id: "pillars", label: "Pillars" },
  { id: "matchmaker", label: "Matchmaker" },
  { id: "providers", label: "Providers" },
  { id: "pitch", label: "Pitch" },
  { id: "roadmap", label: "Roadmap" },
  { id: "contact", label: "Contact" }
];

export function App() {
  return (
    <>
      <Suspense fallback={<div className="webgl-fallback" />}>
        <DevelopmentNetwork />
      </Suspense>
      <header className="site-header">
        <a className="brand" href="#home">
          <span className="brand-mark">TDL</span>
          <span>The Development Lab</span>
        </a>
        <nav>
          {sections.map((section) => (
            <a href={`#${section.id}`} key={section.id}>
              {section.label}
            </a>
          ))}
        </nav>
      </header>

      <main>
        <section className="hero section-shell" id="home">
          <p className="eyebrow">Whole-athlete development marketplace · Static MVP</p>
          <h1>The trusted matching layer for youth athlete development.</h1>
          <p className="hero-copy">
            Families need more than referrals. The Development Lab brings training, tutoring, and mindset support into
            one pre-live marketplace concept designed to validate demand, provider supply, and partner pilots.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#matchmaker">
              Find Your Match
            </a>
            <a className="button button-secondary" href="#pitch">
              Investor & Pilot Pitch
            </a>
          </div>
          <div className="hero-strip">
            <span>Sport-specific training</span>
            <span>Speed & strength</span>
            <span>Tutoring</span>
            <span>Mental performance</span>
          </div>
        </section>

        <FourPillars />
        <MarketOpportunity />
        <InvestorPitchSection />
        <section className="section-shell split-section" id="how-it-works">
          <div>
            <p className="eyebrow">How matching works</p>
            <h2>A better way to connect families with the right support.</h2>
          </div>
          <div className="steps">
            {["Tell us what you need", "Get matched to options", "Choose the best fit"].map((step, index) => (
              <article className="step-card" key={step}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{step}</h3>
                <p>
                  {index === 0
                    ? "Share sport, goals, support needs, and budget."
                    : index === 1
                      ? "The demo ranks local specialists against your selected criteria."
                      : "Compare the best-fit options and decide what to explore next."}
                </p>
              </article>
            ))}
          </div>
        </section>
        <DemoMatchmaker />
        <ProviderNetwork />
        <AudiencePaths />
        <RoadmapSection />
        <ContactSection />
      </main>
    </>
  );
}
