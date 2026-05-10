import './Footer.css';

const IconInstagram = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <circle cx="12" cy="12" r="4"/>
    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
  </svg>
);

const IconLinkedIn = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect x="2" y="9" width="4" height="12"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);

const IconSuggestions = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
  </svg>
);

const Footer = () => {
  return (
    <footer className="atmos-footer">
      <div className="atmos-footer-shell">
        <div className="atmos-footer-top">
          <div className="atmos-footer-brand">
            <img
              className="atmos-footer-logo"
              src="/images/logo.png"
              alt=""
              aria-hidden="true"
            />
            <div className="atmos-footer-brand-text">
              <p className="atmos-footer-wordmark">
                AI<span className="atmos-footer-at">@</span>UW
              </p>
              <p className="atmos-footer-eyebrow">
                The Artificial Intelligence Club at UW&ndash;Madison
              </p>
            </div>
          </div>

          <div className="atmos-footer-links">
            <a
              className="atmos-footer-link"
              href="https://www.instagram.com/aiclubuw/"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
            >
              <IconInstagram />
              Instagram
            </a>
            <a
              className="atmos-footer-link"
              href="https://www.linkedin.com/company/aiclub-uwmadison"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
            >
              <IconLinkedIn />
              LinkedIn
            </a>
            <a
              className="atmos-footer-link"
              href="https://docs.google.com/forms/d/e/1FAIpQLSdpbz1I_cmMtlJIx5LDufsIFybab7qvBPqHW42fXVBLcDGZNQ/viewform?usp=publish-editor"
              target="_blank"
              rel="noreferrer"
              aria-label="Suggestions Box"
            >
              <IconSuggestions />
              Suggestions
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
