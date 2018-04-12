import React from 'react';
import { Image, Container } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';

const PlayerHand = (props) => {
  let game, player, currentHand, eventCards;
  if (props.game) {
    game = props.game['ytQnw2I0gonsoYXo6M02'];
    eventCards = game.unusedEventCards;
    player = game.players[1];
    currentHand = player.currentHand;
  }
  return (
    <Container className="cards-container">
      {
        props.game && currentHand.map(cardRef => {
          const playerCard = cardRef.id;
          const src = eventCards && eventCards[playerCard] ? `assets/eventCards/${playerCard}.png` : `assets/cityCards/${playerCard}.png`;
          return <Image key={playerCard} className="hand-card" src={src} size='small' />;
        })
      }
    </Container>
  );
};

const mapStateToProps = (state) => ({
  game: state.firestore.data.games,
});

export default compose(
  firestoreConnect(),
  connect(mapStateToProps)
)(PlayerHand);


