import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Nav.css';

const NAV_ITEMS = [
  { to: '/about', label: 'About Us' },
  { to: '/leadership', label: 'Leadership' },
  { to: '/seminars', label: 'Seminars' },
  { to: '/involvement', label: 'FAQ' },
  { to: '/contact', label: 'Contact' },
];

const Nav = () => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrollPct, setScrollPct] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  const isActive = (to) => location.pathname === to;

  useEffect(() => {
    let rafId;
    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const y = window.scrollY;
        const total = document.documentElement.scrollHeight - window.innerHeight;
        setScrollPct(total > 0 ? (y / total) * 100 : 0);
        setScrolled(y > 24);
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  const [prevPath, setPrevPath] = useState(location.pathname);

  if (location.pathname !== prevPath) {
    setPrevPath(location.pathname);
    setScrollPct(0);
  }

  return (
    <>
      <div
        className="atmos-scroll-progress"
        style={{ width: `${scrollPct}%` }}
        aria-hidden="true"
      />

      <header className={`atmos-nav${scrolled ? ' atmos-nav--scrolled' : ''}`}>
        <div className="atmos-shell atmos-nav-inner">

          {/* Brand */}
          <Link to="/" className="atmos-nav-brand" aria-label="AI@UW home">
            <span className="atmos-nav-brand-mark" aria-hidden="true">
              <img src="/images/logo.png" alt="AI@UW" />
            </span>
          </Link>

          {/* Desktop links */}
          <nav aria-label="Primary">
            <ul className="atmos-nav-links">
              {NAV_ITEMS.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className={
                      'atmos-nav-link' +
                      (isActive(item.to) ? ' atmos-nav-link-active' : '')
                    }
                  >
                    {item.label}
                    {isActive(item.to) && (
                      <span className="atmos-nav-link-dot" aria-hidden="true" />
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* CTA */}
          <Link to="/contact" className="atmos-nav-cta">
            Become a Member
            <span className="atmos-nav-cta-arrow" aria-hidden="true">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </span>
          </Link>

          {/* Burger */}
          <button
            type="button"
            className={`atmos-nav-burger${mobileOpen ? ' atmos-nav-burger--open' : ''}`}
            aria-expanded={mobileOpen}
            aria-controls="atmos-nav-mobile-panel"
            onClick={() => setMobileOpen((v) => !v)}
          >
            <span className="atmos-nav-burger-bar" />
            <span className="atmos-nav-burger-bar" />
            <span className="atmos-nav-burger-bar" />
          </button>

        </div>
      </header>

      {/* Mobile panel */}
      <div
        id="atmos-nav-mobile-panel"
        className={
          'atmos-nav-mobile-panel' +
          (mobileOpen ? ' atmos-nav-mobile-open' : '')
        }
      >
        <nav>
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setMobileOpen(false)}
              className={
                'atmos-nav-mobile-link' +
                (isActive(item.to) ? ' atmos-nav-link-active' : '')
              }
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <Link
          to="/contact"
          className="atmos-nav-mobile-cta"
          onClick={() => setMobileOpen(false)}
        >
          Become a Member <span aria-hidden="true">→</span>
        </Link>
      </div>
    </>
  );
};

export default Nav;
