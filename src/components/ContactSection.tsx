export function ContactSection() {
  return (
    <section className="section-shell contact-section" id="contact">
      <div>
        <p className="eyebrow">Next step</p>
        <h2>Let&apos;s build the right support system together.</h2>
        <p>
          The first launch can collect interest from families, specialists, programs, and investors while the deeper
          marketplace is planned.
        </p>
      </div>
      <div className="contact-card">
        <h3>Launch-ready static CTA</h3>
        <p>
          Until a dedicated form endpoint is selected, use the public project repo to open a launch inquiry for
          families, specialists, programs, or investors.
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
