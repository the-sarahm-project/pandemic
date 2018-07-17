import React from 'react';
import { Route, Switch } from 'react-router-dom';
import '../App.css';
import { Game, HomeScreen } from './index';

const App = () => {
  return (
    <Switch>
      <Route exact path="/" component={HomeScreen} />
      <Route exact path="/:gameid" component={Game} />
    </Switch>
  );
};

export default App;
