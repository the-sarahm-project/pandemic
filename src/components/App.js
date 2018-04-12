import React, { Component } from 'react';
import '../App.css';
import {Sidebar, Board} from './index';
import { firestoreConnect } from 'react-redux-firebase';
// import { connect } from 'react-redux';
import { compose } from 'redux';
// import { db } from '../store';
// import { init, collections, setupLogic } from '../utils';

class App extends Component {
  componentDidMount() {
    // let numPlayers = 4, difficultyLevel = 4;

    // setupLogic(db.collection('games').doc('ytQnw2I0gonsoYXo6M02'), numPlayers, difficultyLevel);
    // init(db, collections, numPlayers, difficultyLevel);
  }

  render() {
    return (
      <div className="game">
        <Sidebar />
        <Board />
      </div>
    );
  }
}

export default compose(
  firestoreConnect(() => [
    {collection: 'games', doc: 'ytQnw2I0gonsoYXo6M02', subcollections: [{ collection: 'players' }]},
    {collection: 'games', doc: 'ytQnw2I0gonsoYXo6M02', subcollections: [{ collection: 'unusedEventCards' }]},
  ])
)(App);
