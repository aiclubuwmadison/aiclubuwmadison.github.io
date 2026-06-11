import './Footer.css';

const IconInstagram = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17" cy="7" r="1" fill="currentColor" stroke="none" />
  </svg>
);

const IconLinkedIn = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="2" y="2" width="20" height="20" rx="4" ry="4" />
    <line x1="7" y1="11" x2="7" y2="17" />
    <circle cx="7" cy="8" r="1" fill="currentColor" stroke="none" />
    <path d="M11 11v6" />
    <path d="M11 13a3 3 0 0 1 6 0v4" />
  </svg>
);

const IconSuggestions = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
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
              loading="lazy"
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
              className="atmos-footer-link atmos-footer-instagram"
              href="https://www.instagram.com/aiclubuw/"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
            >
              <IconInstagram />
              Instagram
            </a>
            <a
              className="atmos-footer-link atmos-footer-linkedin"
              href="https://www.linkedin.com/company/aiclub-uwmadison"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
            >
              <IconLinkedIn />
              LinkedIn
            </a>
            <a
              className="atmos-footer-link atmos-footer-suggestions"
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
        <hr className="atmos-footer-rule-soft" aria-hidden="true" />

        <div className="atmos-footer-bottom">
          <div className="atmos-footer-copy">
            &copy; {new Date().getFullYear()} AI@UW
          </div>
          <div className="atmos-footer-pag">
            Nurturing AI <span className="atmos-footer-pag-cur">for all</span>
          </div>
          <div className="atmos-footer-place">
            Madison, WI
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
