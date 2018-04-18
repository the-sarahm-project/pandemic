import React from 'react';
import { Image, Container } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect, isLoaded } from 'react-redux-firebase';

const PlayerHand = (props) => {
  const { game, currentHand, eventCards } = props;
  return (
    isLoaded(game) && isLoaded(eventCards) && isLoaded(currentHand) &&
    <Container className="cards-container">
      {
        currentHand.map(cardRef => {
          const playerCard = cardRef.id;
          const src = eventCards[playerCard] ? `assets/eventCards/${playerCard}.png` : `assets/cityCards/${playerCard}.png`;
          return <Image key={playerCard} className="hand-card" src={src} size='small' />;
        })
      }
    </Container>
  );
};

const mapStateToProps = (state) => {
  const game = state.firestore.data.games && state.firestore.data.games['9irA2eJaPOcagTs53dkV'];
  const eventCards = game && game.unusedEventCards;
  console.log(game);
  const player = game && game.players[1];
  console.log('player', player);
  const currentHand = player && player.currentHand;
  return {
    game,
    eventCards,
    currentHand
  };
};

export default compose(
  firestoreConnect(),
  connect(mapStateToProps)
)(PlayerHand);


