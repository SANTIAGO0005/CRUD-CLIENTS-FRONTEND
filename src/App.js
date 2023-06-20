import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import ClienteList from './components/ClienteList';
import ClienteForm from './components/ClienteForm';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={ClienteList} />
        <Route path="/clients/:id" component={ClienteForm} />
      </Switch>
    </Router>
  );
}

export default App;
