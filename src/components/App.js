import React, { Component } from 'react';
import '../App.css';
import Board from './Board';
import { firestoreConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { db } from '../store';
import { init, collections } from '../utils'

class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.cities = db.collection('cities');
    console.log(Object.keys(this.cities))
    //this.cities.doc('Atlanta').collection('cubes').doc('black').update({count: 3})
    //.then(console.log);
  //gameState.collection('cities').doc(card.name).update(card.color, 3)
    // let numPlayers = 4
    // let difficultyLevel = 4
    // init(db, collections, numPlayers, difficultyLevel)
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
