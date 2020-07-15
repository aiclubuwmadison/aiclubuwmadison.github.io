import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import './App.css';
import Nav from './components/Nav'
import Footer from './components/Footer';
import Home from './components/Home';
import About from './components/About';
import Involvement from './components/Involvement';
import Leadership from './components/Leadership';
import Contact from './components/Contact';
import FAQ from './components/FAQ';

function App() {
  return (
    <div>
      <Router>
        <Nav/>
        <div id="body-wrapper">
          <Switch>
            <Route path="/about">
              <About/>
            </Route>
            <Route path="/involvement">
              <Involvement/>
            </Route>
            <Route path="/leadership">
              <Leadership/>
            </Route>
            <Route path="/contact">
              <Contact/>
            </Route>
            <Route path="/faq">
              <FAQ/>
            </Route>
            <Route path="/">
              <Home/>
            </Route>
          </Switch>
        </div>
      </Router>
      <Footer></Footer>
    </div>
  );
}

export default App;
