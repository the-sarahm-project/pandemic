import React from 'react';
import { Container, Image } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect, isLoaded } from 'react-redux-firebase';

const GameHeader = (props) => {
  const { game, playerDeck } = props;
  return (
    isLoaded(game) && isLoaded(playerDeck) && (
      <Container className="game-header">
        <Container className="game-header-container">
          <Image src="/assets/images/empty_card.png" size="mini" />
          <Image src="/assets/images/player_card.png" size="mini" /><div>{playerDeck.length}</div>
          <Image src="/assets/images/cube_blue.png" size="mini" /><div>20</div>
          <Image src="/assets/images/cube_yellow.png" size="mini" /><div>20</div>
          <Image src="/assets/images/cube_black.png" size="mini" /><div>20</div>
          <Image src="/assets/images/cube_red.png" size="mini" /><div>20</div>
          <Image src="/assets/images/station.png" size="mini" /><div>10</div>
          <Image src="/assets/images/infection_rate.png" size="mini" /><div>10</div>
          <Image src="/assets/images/outbreaks.png" size="mini" /><div>10</div>
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
