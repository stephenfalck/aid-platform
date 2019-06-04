import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';
import LandingPage from'./landing_page/landing_layout';
import SignUpPage from'./sign_up_page/sign_up_layout';
import RequestsPage from './requests_page/requests_layout';
import ConversationsPage from './conversations_page/conversations';

class App extends React.Component {
  render() {
    return (
      <Router>
        <Route path="/login" exact component={LandingPage} />
        <Route path="/signup" component={SignUpPage} />
        <Route path="/requests" component={RequestsPage} />
        <Route path="/inbox" component={ConversationsPage} />
      </Router>
    )
  }
}

export default App;
