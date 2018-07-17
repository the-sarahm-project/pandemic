import React from 'react';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { SidebarCards, Board, ActionFooter } from './index';
import history from '../history';

const Game = () => {
  return (
    <div className="game">
      <SidebarCards />
      <Board />
      <ActionFooter />
    </div>
  );
};

export default withRouter(compose(
  firestoreConnect(() => [
    {collection: 'games', doc: history.location.pathname.slice(1), subcollections: [{ collection: 'players' }]},
    {collection: 'games', doc: history.location.pathname.slice(1), subcollections: [{ collection: 'unusedEventCards' }]},
    {collection: 'games', doc: history.location.pathname.slice(1), subcollections: [{ collection: 'unusedCityCards' }]},
    {collection: 'games', doc: history.location.pathname.slice(1), subcollections: [{ collection: 'cities' }]},
    {collection: 'games', doc: history.location.pathname.slice(1)}
  ])
)(Game));
