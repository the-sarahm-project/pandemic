import React from 'react';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import Login from './Login';
import { db } from '../store';
import history from '../history';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gameExists: false
    };
  }

  /* eslint-disable react/no-did-mount-set-state */
  async componentDidMount() {
    await this.props.firebase.auth().signInAnonymously();
    const gameId = history.location.pathname.slice(1);
    const game = gameId && await db.collection('games').doc(gameId).get();
    if (game.exists) {
      await this.setState({ gameExists: true });
    } else {
      history.push('/');
    }
  }

  render() {
    return (
      this.state.gameExists && <Login />
    );
  }
}

export default withRouter(compose(
  firestoreConnect(() => [
    {collection: 'games', doc: history.location.pathname.slice(1), subcollections: [{ collection: 'players' }]},
    {collection: 'games', doc: history.location.pathname.slice(1), subcollections: [{ collection: 'unusedEventCards' }]},
    {collection: 'games', doc: history.location.pathname.slice(1), subcollections: [{ collection: 'unusedCityCards' }]},
    {collection: 'games', doc: history.location.pathname.slice(1), subcollections: [{ collection: 'cities' }]},
    {collection: 'games', doc: history.location.pathname.slice(1)}
  ]),
)(Game));
