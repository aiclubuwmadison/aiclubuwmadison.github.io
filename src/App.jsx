import { useEffect, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Nav from './components/Nav';
import Footer from './components/Footer';
const About = lazy(() => import('./components/About'));
const Involvement = lazy(() => import('./components/Involvement'));
const Leadership = lazy(() => import('./components/Leadership'));
const Contact = lazy(() => import('./components/Contact'));
const Seminars = lazy(() => import('./components/Seminars'));

// Global scroll-reveal — watches specific elements on every page and fades
// them in as they enter the viewport. Re-runs on route change via MutationObserver.
function ScrollReveal() {
  const location = useLocation();

  useEffect(() => {
    const SELECTORS = [
      '.atmos-faq-row',
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
          <Suspense fallback={null}>
            <Routes>
              <Route
                path="/"
                element={<><About /><Footer /></>}
              />
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
            </Routes>
          </Suspense>
        </div>
      </Router>
    </div>
  );
}

export default App;
