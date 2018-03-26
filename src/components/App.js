import React, { Component } from 'react';
import '../App.css';
import Board from './Board';
import { firestoreConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { db } from '../store';

class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // console.log('this is props', this.props.firestore.database().ref());
    // console.log('this is firebase', this.props.firebase)
    this.cities = db.collection('cities');
    this.cities.add({name: "Atlanta", coords: [33.7490, -84.3880], icon: "blueIcon"});
    console.log('this is the database area', this.cities);
    console.log('this is its path', this.cities.toString());
  }
  render() {
    db.collection('cities').get().then(cities => console.log(cities))
    return (
      <div>
        <button onClick={() => db.collection('cities').get()}>Click me!</button>
        {this.props.cities && this.props.cities.map(city => (<div key={city.name}>{city.name}</div>))}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  cities: state.firestore.ordered.cities
})

export default compose(firestoreConnect((props) => [{collection: 'cities'}]), connect(mapStateToProps))(App);
