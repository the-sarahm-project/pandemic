import React, { Component } from 'react';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import '../App.css';
import { Sidebar, Board, ActionFooter } from './index';
// import { db } from '../store';
// import { init, collections, setupLogic } from '../utils';

export const doc = 'DGtOTuQcZfamL6ZvJjTn';

class App extends Component {
  componentDidMount() {
    // const numPlayers = 4, difficultyLevel = 4;

    // setupLogic(db.collection('games').doc(doc), numPlayers, difficultyLevel);
    // init(db, collections, numPlayers, difficultyLevel);
  }

  render() {
    return (
      <div className="game">
        <Sidebar />
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
