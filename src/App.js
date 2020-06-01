import React from 'react';
import {
  BrowserRouter as Router,
  Link,
  Switch
} from 'react-router-dom';
import './App.css';
import Nav from './components/Nav'
import Footer from './components/Footer';


function App() {
  return (
    <div>
      <Router>
        <Nav/>
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
      </Router>
      <Footer></Footer>
    </div>
  );
}

export default App;
