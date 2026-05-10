import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Nav from './components/Nav';
import Footer from './components/Footer';
import Home from './components/Home';
import About from './components/About';
import Involvement from './components/Involvement';
import Leadership from './components/Leadership';
import Contact from './components/Contact';
import Seminars from './components/Seminars';

// Global scroll-reveal — watches specific elements on every page and fades
// them in as they enter the viewport. Re-runs on route change via MutationObserver.
function ScrollReveal() {
  const location = useLocation();

  useEffect(() => {
    const SELECTORS = [
      '.atmos-section-head',
      '.atmos-index-row',
      '.atmos-roster-tile',
      '.atmos-archive-section-head',
      '.atmos-faq-row',
      '.atmos-sem-row',
      '.atmos-channel',
      '.about-section-row',
      '.atmos-hero-notes',
      '.atmos-leadership-foot',
      '.atmos-sem-foot',
      '.atmos-contact-foot',
    ].join(',');

    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('sr-visible');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.08 });

    const observe = () => {
      document.querySelectorAll(SELECTORS).forEach((el, i) => {
        if (el.dataset.srReady) return;
        el.dataset.srReady = '1';
        el.classList.add('sr-hidden');
        el.style.transitionDelay = `${Math.min((i % 5) * 70, 280)}ms`;
        io.observe(el);
      });
    };

    observe();
    const mo = new MutationObserver(() => setTimeout(observe, 30));
    mo.observe(document.getElementById('body-wrapper') || document.body, {
      childList: true, subtree: true,
    });

    return () => { io.disconnect(); mo.disconnect(); };
  }, [location.pathname]);

  return null;
}

function App() {
  return (
    <div>
      <Router>
        <ScrollReveal />
        <Nav />
        <div id="body-wrapper">
          <Routes>
            <Route
              path="/about"
              element={<><About /><Footer /></>}
            />
            <Route
              path="/involvement"
              element={<><Involvement /><Footer /></>}
            />
            <Route
              path="/leadership"
              element={<><Leadership /><Footer /></>}
            />
            <Route
              path="/contact"
              element={<><Contact /><Footer /></>}
            />
            <Route
              path="/seminars"
              element={<><Seminars /><Footer /></>}
            />
            <Route path="/" element={<Home />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
