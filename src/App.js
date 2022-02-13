import React from 'react';
import {
  Route,
  Switch,
  HashRouter as Router
} from 'react-router-dom';
import './App.css';
import Nav from './components/Nav'
import Footer from './components/Footer';
import Home from './components/Home';
import About from './components/About';
import Involvement from './components/Involvement';
import Leadership from './components/Leadership';
import Contact from './components/Contact';
import Projects from './components/Projects';
import StudyGroups from './components/StudyGroups';
import Seminars from './components/Seminars';

function App() {
  return (
    <div>
      <Router>
        <Nav/>
        <div id="body-wrapper">
          <Switch>
            <Route path="/about">
              <About/>
              <Footer></Footer>
            </Route>
            <Route path="/involvement">
              <Involvement/>
              <Footer></Footer>
            </Route>
            {/* <Route path = "/projects"> // Uncomment to bring in projects page
              <Projects />
              <Footer></Footer>
            </Route> */}
            <Route path="/leadership">
              <Leadership/>
              <Footer></Footer>
            </Route>
            <Route path="/contact">
              <Contact/>
              <Footer></Footer>
            </Route>
            <Route path="/seminars">
              <Seminars/>
              <Footer></Footer>
            </Route>
            <Route path="/study">
              <StudyGroups/>
              <Footer></Footer>
            </Route>
            <Route path="/">
              <Home/>
            </Route>
          </Switch>
        </div>
      </Router>

    </div>
  );
}

export default App;
