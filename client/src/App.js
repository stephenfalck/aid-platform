import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './App.css';
import LandingPage from'./landing_page/landing_layout'
import SignUpPage from'./sign_up_page/sign_up_layout'

class App extends React.Component {
  render() {
    return (
      <Router>
        <Route path="/" exact component={LandingPage} />
        <Route path="/signup" component={SignUpPage} />
      </Router>
    )
  }
}

export default App;
