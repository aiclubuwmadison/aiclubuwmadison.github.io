import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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

function App() {
  return (
    <div>
      <Router>
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

