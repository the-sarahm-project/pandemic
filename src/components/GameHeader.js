import React from 'react';
import { Container, Image } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect, isLoaded } from 'react-redux-firebase';

const GameHeader = ({ game, playerDeck }) => {
  return (
    isLoaded(game) && isLoaded(playerDeck) && (
      <Container className="game-header">
        <Container className="game-header-container">
          <Image src="/assets/images/empty_card.png" size="mini" />
          <Image src="/assets/images/player_card.png" size="mini" /><div>{playerDeck.length}</div>
          <Image src="/assets/images/cube_blue.png" size="mini" /><div>{game.blueDiseaseCubes}</div>
          <Image src="/assets/images/cube_yellow.png" size="mini" /><div>{game.yellowDiseaseCubes}</div>
          <Image src="/assets/images/cube_black.png" size="mini" /><div>{game.blackDiseaseCubes}</div>
          <Image src="/assets/images/cube_red.png" size="mini" /><div>{game.redDiseaseCubes}</div>
          <Image src="/assets/images/station.png" size="mini" /><div>{game.remainingResearchStations}</div>
          <Image src="/assets/images/infection_rate.png" size="mini" /><div>{game.infectionRate}</div>
          <Image src="/assets/images/outbreaks.png" size="mini" /><div>{game.numOutbreaks}</div>
          <Image src="/assets/images/infection_card.png" size="mini" />
          <Image src="/assets/images/empty_card.png" size="mini" />
        </Container>
      </Container>
    )
  );
};

const mapStateToProps = (state) => {
  const game = state.firestore.data.games && state.firestore.data.games['9irA2eJaPOcagTs53dkV'];
  const playerDeck = game && game.playerDeck;
  return {
    game,
    playerDeck
  };
};

export default compose(
  firestoreConnect(),
  connect(mapStateToProps)
)(GameHeader);
