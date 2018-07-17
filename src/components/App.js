import React from 'react';
import { Route, Switch } from 'react-router-dom';
import '../App.css';
import { Game, HomeScreen } from './index';
import { db } from '../store';
import history from '../history';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gameExists: false
    };
  }

  async componentWillMount() {
    const gameId = history.location.pathname.slice(1);
    const game = gameId && await db.collection('games').doc(gameId).get();
    if (game.exists || !gameId) {
      this.setState({ gameExists: true });
    } else {
      history.push('/');
    }
  }

  render() {
    return (

      <Switch>
        <Route exact path="/" component={HomeScreen} />
        {this.state.gameExists && <Route exact path="/:gameid" component={Game} />}
      </Switch>
    );
  }
}

export default App;
