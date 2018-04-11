import React, { Component } from 'react';
import '../App.css';
import {Sidebar, Board} from './index';
import { firestoreConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { db } from '../store';
import { init, collections, setupLogic } from '../utils';

class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    let numPlayers = 4, difficultyLevel = 4;

    //setupLogic(db.collection('games').doc('ytQnw2I0gonsoYXo6M02'), numPlayers, difficultyLevel);
    //init(db, collections, numPlayers, difficultyLevel);
  }

  render() {
    return (
      <div>
        <Sidebar />
        <Board />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  cities: state.firestore.ordered.cities
});

export default compose(firestoreConnect((props) => [{collection: 'cities'}]), connect(mapStateToProps))(App);
