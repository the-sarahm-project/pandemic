import React from 'react';
import { Image, Container } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect, isLoaded } from 'react-redux-firebase';
import { getCurrentHand, getEventCards } from '../utils';

const PlayerHand = ({ currentHand, eventCards } ) => {
  return (
    isLoaded(eventCards) && isLoaded(currentHand) &&
    <Container className="cards-container">
      {
        currentHand.map(cardRef => {
          const playerCard = cardRef.id;
          const src = `assets/images/${playerCard}.png`;
          return <Image key={playerCard} className="hand-card" src={src} size="small" />;
        })
      }
    </Container>
  );
};

const mapStateToProps = (state) => {
  return {
    currentHand: getCurrentHand(state),
    eventCards: getEventCards(state)
  };
};

export default compose(
  firestoreConnect(),
  connect(mapStateToProps)
)(PlayerHand);

