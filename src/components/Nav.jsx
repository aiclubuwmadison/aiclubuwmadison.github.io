import { useState, useEffect } from "react";
import { flushSync } from "react-dom";
import { Link, useLocation } from "react-router-dom";
import { Sun, Moon } from "lucide-react";
import { animateThemeChange } from "../utils/themeTransition";
import "./Nav.css";

const getInitialTheme = () => {
  if (typeof window === "undefined") return "light";
  const stored = window.localStorage.getItem("theme");
  if (stored === "light" || stored === "dark") return stored;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
};

const NAV_ITEMS = [
  { to: "/about", label: "About Us" },
  { to: "/leadership", label: "Leadership" },
  { to: "/seminars", label: "Seminars" },
  { to: "/projects", label: "Projects" },
  { to: "/resources", label: "Resources" },
  { to: "/involvement", label: "FAQ" },
  { to: "/contact", label: "Contact" }
];

const Nav = () => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState(getInitialTheme);
  const [iconAnimKey, setIconAnimKey] = useState(0);
  const [iconTheme, setIconTheme] = useState(null);

  const isActive = (to) => location.pathname === to;

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    window.localStorage.setItem("theme", theme);
  }, [theme]);

  const handleThemeToggle = (event) => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    const rect = event.currentTarget.getBoundingClientRect();
    const originX = rect.left + rect.width / 2;
    const originY = rect.top + rect.height / 2;

    setIconTheme(nextTheme);
    setIconAnimKey((k) => k + 1);

    animateThemeChange(theme, nextTheme, originX, originY, (newTheme) => {
      flushSync(() => {
        setTheme(newTheme);
        setIconTheme(null);
      });
    });
  };

  const themeLabel = theme === "dark" ? "Switch to light mode" : "Switch to dark mode";
  const activeIconTheme = iconTheme ?? theme;
  const ThemeIcon = activeIconTheme === "dark" ? Sun : Moon;

  useEffect(() => {
    let rafId;
    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        setScrolled(window.scrollY > 24);
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <header className={`atmos-nav${scrolled ? " atmos-nav--scrolled" : ""}`}>
        <div className="atmos-shell atmos-nav-inner">

          <div className="atmos-nav-group">
            <Link to="/" className="atmos-nav-brand" aria-label="AI@UW home">
              <span className="atmos-nav-brand-mark" aria-hidden="true">
                <img src="/images/logo.png" alt="AI@UW" />
              </span>
            </Link>

            <span className="atmos-nav-divider" aria-hidden="true" />

            <nav aria-label="Primary">
              <ul className="atmos-nav-links">
                {NAV_ITEMS.map((item) => (
                  <li key={item.to}>
                    <Link
                      to={item.to}
                      className={
                        "atmos-nav-link" +
                        (isActive(item.to) ? " atmos-nav-link-active" : "")
                      }
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className="atmos-nav-actions">
            {/* CTA */}
            <Link to="/contact" className="atmos-nav-cta">
              Join
              <span className="atmos-nav-cta-arrow" aria-hidden="true">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </span>
            </Link>

            {/* Theme toggle */}
            <button
              type="button"
              className="atmos-nav-theme-toggle"
              onClick={handleThemeToggle}
              aria-label={themeLabel}
              title={themeLabel}
            >
              <span
                key={iconAnimKey}
                className="atmos-nav-theme-toggle-icon"
                aria-hidden="true"
              >
                <ThemeIcon size={18} />
              </span>
            </button>
          </div>

          {/* Burger */}
          <button
            type="button"
            className={`atmos-nav-burger${mobileOpen ? " atmos-nav-burger--open" : ""}`}
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
          "atmos-nav-mobile-panel" +
          (mobileOpen ? " atmos-nav-mobile-open" : "")
        }
      >
        <nav>
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setMobileOpen(false)}
              className={
                "atmos-nav-mobile-link" +
                (isActive(item.to) ? " atmos-nav-link-active" : "")
              }
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <button
          type="button"
          className="atmos-nav-mobile-theme-toggle"
          onClick={handleThemeToggle}
          aria-label={themeLabel}
        >
          <span
            key={iconAnimKey}
            className="atmos-nav-theme-toggle-icon"
            aria-hidden="true"
          >
            <ThemeIcon size={18} />
          </span>
          <span>{theme === "dark" ? "Light mode" : "Dark mode"}</span>
        </button>
        <Link
          to="/contact"
          className="atmos-nav-mobile-cta"
          onClick={() => setMobileOpen(false)}
        >
          Join <span aria-hidden="true">→</span>
        </Link>
      </div>
    </>
  );
};

export default Nav;

