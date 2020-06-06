import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import { Paper } from '@material-ui/core';
import './App.css';
import Nav from './components/Nav'
import Footer from './components/Footer';
import Home from './components/Home';
import About from './components/About';
import Involvement from './components/Involvement';
import Contact from './components/Contact';

function App() {
  return (
    <div>
      <Router>
        <Nav/>
        <Paper>
          <Switch>
            <Route path="/">
              <Home/>
            </Route>
            <Route path="/about">
              <About/>
            </Route>
            <Route path="/involvement">
              <Involvement/>
            </Route>
            <Route path="/contact">
              <Contact/>
            </Route>
          </Switch>
        </Paper>
      </Router>
      <Footer></Footer>
    </div>
  );
}

export default App;
