import React, { Component } from 'react';
import '../App.css';
import Board from './Board';
import { firestoreConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { db } from '../store';
import { init, collections, setupLogic } from '../utils'

class App extends Component {
  constructor(props) {
    super(props);
  }

  async componentDidMount() {
    let numPlayers = 4, difficultyLevel = 4;

    setupLogic(db.collection('games').doc('zgYhVRG8J9LWNPaAWIkp'), numPlayers, difficultyLevel);
    //init(db, collections, numPlayers, difficultyLevel)
  }

  render() {
    return (
      <Board />
    );
  }
}

const mapStateToProps = (state) => ({
  cities: state.firestore.ordered.cities
})

export default compose(firestoreConnect((props) => [{collection: 'cities'}]), connect(mapStateToProps))(App);
