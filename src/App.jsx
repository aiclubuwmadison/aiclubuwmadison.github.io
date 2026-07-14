import { lazy, Suspense, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from "react-router-dom";
import Nav from "./components/Nav";
import Footer from "./components/Footer";

const About = lazy(() => import("./components/About"));
const Involvement = lazy(() => import("./components/Involvement"));
const Leadership = lazy(() => import("./components/Leadership"));
const Contact = lazy(() => import("./components/Contact"));
const Seminars = lazy(() => import("./components/Seminars"));
const Projects = lazy(() => import("./components/Projects"));
const Resources = lazy(() => import("./components/Resources"));
const PitchBuilder = lazy(() => import("./components/PitchBuilder"));
const Sandbox = lazy(() => import("./components/Sandbox"));

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
  return (
    <div>
      <Router>
        <ScrollToTop />
        <Nav />
        <div id="body-wrapper">
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
              <Route
                path="/pitch"
                element={<><PitchBuilder /><Footer /></>}
              />
              <Route
                path="/sandbox"
                element={<><Sandbox /><Footer /></>}
              />
            </Routes>
          </Suspense>
        </div>
      </Router>
    </div>
  );
}

export default App;

