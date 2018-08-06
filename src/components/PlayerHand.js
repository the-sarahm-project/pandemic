import React from 'react';
import { Image, Container } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { getPlayers, removeCardFromHand } from '../utils';
import ChooseCardModal from './ChooseCardModal';

const PlayerHand = ({ players, firebase }) => {
  const id = firebase.auth().currentUser.id;
  const playerHand = id ? players[id].currentHand : [];
  return (
    playerHand.length > 7 ?
    <ChooseCardModal
      cards={playerHand}
      header='Choose Card(s) to Remove'
      action={removeCardFromHand.bind(this, id, playerHand)}
      closeOnDimmerClick={false}
      closeOnEscape={false}
      cancelDisabled={true}
    /> :
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
    players: getPlayers(state)
  };
};

export default compose(
  firestoreConnect(),
  connect(mapStateToProps)
)(PlayerHand);
