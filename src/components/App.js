import React, { Component } from 'react';
import { firestoreConnect } from 'react-redux-firebase';
// import { connect } from 'react-redux';
import { compose } from 'redux';
import '../App.css';
import { Sidebar, Board, ActionFooter } from './index';
// import { db } from '../store';
// import { init, collections, setupLogic } from '../utils';

class App extends Component {
  componentDidMount() {
    // const numPlayers = 4, difficultyLevel = 4;

    // setupLogic(db.collection('games').doc('9irA2eJaPOcagTs53dkV'), numPlayers, difficultyLevel);
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
    {collection: 'games', doc: '9irA2eJaPOcagTs53dkV', subcollections: [{ collection: 'players' }]},
    {collection: 'games', doc: '9irA2eJaPOcagTs53dkV', subcollections: [{ collection: 'unusedEventCards' }]},
    {collection: 'games', doc: '9irA2eJaPOcagTs53dkV', subcollections: [{ collection: 'unusedCityCards' }]},
    {collection: 'games', doc: '9irA2eJaPOcagTs53dkV', subcollections: [{ collection: 'cities' }]},
    {collection: 'games', doc: '9irA2eJaPOcagTs53dkV'}
  ])
)(App);
