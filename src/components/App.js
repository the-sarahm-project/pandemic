import React, { Component } from 'react';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import '../App.css';
import { SidebarCards, Board, ActionFooter, CreateGame } from './index';
import { doc, initAndSetupGame } from '../utils';

export class App extends Component {
  async componentDidMount() {
    const numPlayers = 3, difficultyLevel = 4, create = false;
    try {
      await initAndSetupGame(numPlayers, difficultyLevel, create);
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    const createGame = true;
    return (
      createGame ?
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh'
        }}>
          <CreateGame />
        </div> :
        <div className="game">
          <SidebarCards />
          <Board />
          <ActionFooter />
        </div>
    );
  }
}

export default compose(
  firestoreConnect(() => [
    {collection: 'games', doc: doc, subcollections: [{ collection: 'players' }]},
    {collection: 'games', doc: doc, subcollections: [{ collection: 'unusedEventCards' }]},
    {collection: 'games', doc: doc, subcollections: [{ collection: 'unusedCityCards' }]},
    {collection: 'games', doc: doc, subcollections: [{ collection: 'cities' }]},
    {collection: 'games', doc: doc}
  ])
)(App);
