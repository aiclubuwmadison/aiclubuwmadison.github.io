import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Nav from './components/Nav';
import Footer from './components/Footer';
import Home from './components/Home';
import About from './components/About';
import Involvement from './components/Involvement';
import Leadership from './components/Leadership';
import Contact from './components/Contact';
import Seminars from './components/Seminars';

function App() {
  return (
    <div>
      <Router>
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
