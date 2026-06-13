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
    window.scrollTo(0, 0);
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

