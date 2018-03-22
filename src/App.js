import React, { Component } from 'react';
import './App.css';
import Board from './Board';
import init from './scripts/fire';

class App extends Component {
  constructor(props) {
    super(props);
    init();
  }

  render() {
    return (
      <Board />
    );
  }
}

export default App;
