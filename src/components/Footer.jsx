import { Link } from 'react-router-dom';
import { NAV_ITEMS } from '../constants/nav';
import './Footer.css';

const DISCORD_URL = 'https://discord.gg/TTSykcZAg4';

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

const IconDiscord = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M19.27 5.33A18.13 18.13 0 0 0 14.7 4l-.21.42a17.3 17.3 0 0 0-4.97 0L9.3 4a18.13 18.13 0 0 0-4.57 1.33C2.05 9.27 1.32 13.1 1.68 16.88a18.4 18.4 0 0 0 5.57 2.81c.45-.61.85-1.26 1.19-1.94-.65-.24-1.27-.54-1.86-.89.16-.11.31-.23.46-.35a13 13 0 0 0 11.92 0c.15.12.3.24.46.35-.59.35-1.21.65-1.86.9.34.67.74 1.32 1.19 1.93a18.4 18.4 0 0 0 5.57-2.81c.43-4.39-.74-8.18-3.05-11.55ZM8.52 14.5c-1.1 0-2-.99-2-2.2s.88-2.2 2-2.2c1.13 0 2.03 1 2 2.2 0 1.21-.88 2.2-2 2.2Zm6.96 0c-1.1 0-2-.99-2-2.2s.88-2.2 2-2.2c1.13 0 2.03 1 2 2.2 0 1.21-.87 2.2-2 2.2Z" />
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
              className="atmos-footer-link"
              href={DISCORD_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Discord"
            >
              <IconDiscord />
              Discord
            </a>
            <a
              className="atmos-footer-link"
              href="https://www.instagram.com/aiclubuw/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <IconInstagram />
              Instagram
            </a>
            <a
              className="atmos-footer-link"
              href="https://www.linkedin.com/company/aiclub-uwmadison"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <IconLinkedIn />
              LinkedIn
            </a>
            <a
              className="atmos-footer-link"
              href="https://docs.google.com/forms/d/e/1FAIpQLSdpbz1I_cmMtlJIx5LDufsIFybab7qvBPqHW42fXVBLcDGZNQ/viewform?usp=publish-editor"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Suggestions Box"
            >
              <IconSuggestions />
              Suggestions
            </a>
          </div>
        </div>
        <nav className="atmos-footer-nav" aria-label="Site">
          {NAV_ITEMS.map(({ to, label }) => (
            <Link key={to} className="atmos-footer-nav-link" to={to}>
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
