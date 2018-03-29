import React, { Component } from 'react';
import '../App.css';
import Board from './Board';
import { firestoreConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { db } from '../store';
import { init, collections, gameState } from '../utils/initialGameState'

class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // init(db, gameState, collections)
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
