export function ContactSection() {
  return (
    <section className="section-shell contact-section" id="contact">
      <div>
        <p className="eyebrow">Next step</p>
        <h2>Join the pilot, provider network, partner bench, or investor conversation.</h2>
        <p>
          This is a static MVP for collecting qualified interest. Families can request help, providers can join the
          network, programs can explore pilots, and investors or advisors can review the market thesis.
        </p>
      </div>
      <div className="contact-card">
        <h3>Launch inquiry paths</h3>
        <p>
          Until a dedicated form endpoint is selected, use the public project repo to open an inquiry. Include whether
          you are a family, provider, program partner, pilot site, advisor, or investor.
        </p>
        <a
          className="button button-primary"
          href="https://github.com/DaveVoyles/The-Development-Lab/issues/new?title=The%20Development%20Lab%20Inquiry"
        >
          Open a Launch Inquiry
        </a>
      </div>
    </section>
  );
}
