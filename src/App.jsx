import { Suspense, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from "react-router-dom";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import RouteErrorBoundary from "./components/RouteErrorBoundary";
import { prefetchAllRoutesWhenIdle } from "./utils/routePrefetch";
import { lazyWithRetry } from "./utils/lazyWithRetry";

const About = lazyWithRetry(() => import("./components/About"), { name: "about" });
const Involvement = lazyWithRetry(() => import("./components/Involvement"), { name: "involvement" });
const Leadership = lazyWithRetry(() => import("./components/Leadership"), { name: "leadership" });
const Contact = lazyWithRetry(() => import("./components/Contact"), { name: "contact" });
const Seminars = lazyWithRetry(() => import("./components/Seminars"), { name: "seminars" });
const Projects = lazyWithRetry(() => import("./components/Projects"), { name: "projects" });
const Resources = lazyWithRetry(() => import("./components/Resources"), { name: "resources" });

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    // `html { scroll-behavior: smooth }` (App.css) would otherwise make this
    // animate on every route change. `behavior: "instant"` is only reliably
    // supported in Chrome/Firefox (not part of the ScrollToOptions spec, and
    // unsupported in Safari), so instead temporarily force the CSS property
    // to "auto" around the scroll — this is the cross-browser-safe way to
    // guarantee an instant jump while leaving in-page smooth scrolling
    // (e.g. anchor links) untouched afterward.
    const root = document.documentElement;
    const previousScrollBehavior = root.style.scrollBehavior;
    root.style.scrollBehavior = "auto";
    window.scrollTo(0, 0);
    root.style.scrollBehavior = previousScrollBehavior;
  }, [pathname]);
  return null;
}

function App() {
  useEffect(() => {
    prefetchAllRoutesWhenIdle();
  }, []);

  return (
    <div>
      <Router>
        <ScrollToTop />
        <Nav />
        <div id="body-wrapper">
          <RouteErrorBoundary>
            <Suspense fallback={<div className="atmos-route-loading" aria-live="polite">Loading…</div>}>
              <Routes>
              <Route
                path="/"
                element={<><About /><Footer /></>}
              />
              <Route
                path="/about"
                element={<Navigate to="/" replace />}
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
              <Route
                path="/projects"
                element={<><Projects /><Footer /></>}
              />
              <Route
                path="/resources"
                element={<><Resources /><Footer /></>}
              />
              </Routes>
            </Suspense>
          </RouteErrorBoundary>
        </div>
      </Router>
    </div>
  );
}

export default App;

