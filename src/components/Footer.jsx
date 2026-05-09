import './Footer.css';

const Footer = () => {
  return (
    <footer className="atmos-footer">
      <div className="atmos-footer-shell">
        <hr className="atmos-footer-rule" />

        <div className="atmos-footer-top">
          <div className="atmos-footer-brand">
            <img
              className="atmos-footer-logo"
              src="/images/logo_full.png"
              alt="AI@UW logo"
            />
            <div className="atmos-footer-brand-text">
              <p className="atmos-footer-wordmark">
                AI<span className="atmos-footer-at">@</span>UW
              </p>
              <p className="atmos-footer-eyebrow">
                Artificial Intelligence Club &middot; UW&ndash;Madison
              </p>
            </div>
          </div>

          <div className="atmos-footer-elsewhere">
            <p className="atmos-footer-elsewhere-label">Find us elsewhere</p>
            <div className="atmos-footer-links">
              <a
                className="atmos-footer-link"
                href="https://www.instagram.com/aiclubuw/"
                target="_blank"
                rel="noreferrer"
              >
                Instagram
                <span className="atmos-arr" aria-hidden="true">&rarr;</span>
              </a>
              <a
                className="atmos-footer-link"
                title="Suggestions Box"
                href="https://docs.google.com/forms/d/e/1FAIpQLSdpbz1I_cmMtlJIx5LDufsIFybab7qvBPqHW42fXVBLcDGZNQ/viewform?usp=publish-editor"
                target="_blank"
                rel="noreferrer"
              >
                Suggestions
                <span className="atmos-arr" aria-hidden="true">&rarr;</span>
              </a>
              <a
                className="atmos-footer-link"
                href="https://www.linkedin.com/company/aiclub-uwmadison"
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
                <span className="atmos-arr" aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </div>
        </div>

        <hr className="atmos-footer-rule-soft" />

        <div className="atmos-footer-bottom">
          <span className="atmos-footer-copy">
            &copy; AI@UW &middot; MMXXVI
          </span>
          <span className="atmos-footer-pag">
            Folio <span className="atmos-footer-pag-cur">01</span> / 24
          </span>
          <span className="atmos-footer-place">
            Madison, Wisconsin &middot; 43.0747&deg; N
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
