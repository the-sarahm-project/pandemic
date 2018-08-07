import React from 'react';
import { Image, Container } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { getOwnHand } from '../utils';

const PlayerHand = ({ playerHand }) => {
  return (
    <Container className="cards-container">
    {
      playerHand.map(cardRef => {
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
    playerHand: getOwnHand(state)
  };
};

export default compose(
  firestoreConnect(),
  connect(mapStateToProps)
)(PlayerHand);
