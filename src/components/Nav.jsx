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

  // Close the mobile panel when the route changes.
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const isActive = (to) => location.pathname === to;

  return (
    <>
      <header className="atmos-nav">
        <div className="atmos-shell atmos-nav-inner">
          <Link to="/" className="atmos-nav-brand" aria-label="AI@UW home">
            <span className="atmos-nav-brand-mark" aria-hidden="true">
              <img src="/images/logo.png" alt="" />
            </span>
            <span className="atmos-nav-brand-text">
              <span className="atmos-nav-brand-name">AI@UW</span>
              <span className="atmos-nav-brand-meta">Madison &middot; Est. MMXXIII</span>
            </span>
          </Link>

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
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <Link to="/contact" className="atmos-nav-cta">
            Become a Member <span className="atmos-arr" aria-hidden="true">&rarr;</span>
          </Link>

          <button
            type="button"
            className="atmos-nav-burger"
            aria-expanded={mobileOpen}
            aria-controls="atmos-nav-mobile-panel"
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? 'Close' : 'Menu'}
          </button>
        </div>
      </header>

      <div
        id="atmos-nav-mobile-panel"
        className={
          'atmos-nav-mobile-panel' +
          (mobileOpen ? ' atmos-nav-mobile-open' : '')
        }
      >
        {NAV_ITEMS.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className={
              'atmos-nav-mobile-link' +
              (isActive(item.to) ? ' atmos-nav-link-active' : '')
            }
          >
            {item.label}
          </Link>
        ))}
        <Link to="/contact" className="atmos-nav-mobile-cta">
          Become a Member <span className="atmos-arr" aria-hidden="true">&rarr;</span>
        </Link>
      </div>
    </>
  );
};

export default Nav;
