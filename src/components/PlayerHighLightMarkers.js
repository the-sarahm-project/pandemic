import React from 'react';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { Marker } from 'react-leaflet';
import { iconContainer, getGameRef, getCurrentPlayer, getPlayers, getPlayerCities, getIsDispatching, getDispatchTarget, getCities } from '../utils';
import ChoosePlayerModal from './ChoosePlayerModal';

const PlayerHighlightMarkers = ({ currentPlayer, playerCities, cities, isDispatching, dispatchTarget }) => {
  return (
    Object.entries(playerCities).map(([city, players]) => {
      const coords = cities[city].coords;
      return isDispatching && !dispatchTarget && (players.length > 1 ?
        <ChoosePlayerModal
          key={`${city}PlayerHighlightMarker`}
          ModalTrigger={(
            <Marker
              position={coords}
              icon={iconContainer.highlight}
              zIndexOffset={1001}
            />
          )}
          actionsRemaining
          players={players}
          action={dispatcherMove.bind(this, currentPlayer)}
          clickable
        /> :
        <Marker
          key={`${city}PlayerHighlightMarker`}
          position={coords}
          icon={iconContainer.highlight}
          zIndexOffset={1001}
          onClick={() => dispatcherMove(currentPlayer, players[0])}
        />);
    })
  );
};

export const dispatcherMove = async (currentPlayer, player) => {
  if (currentPlayer.role === 'Dispatcher') {
    const game = await getGameRef();
    const playerRole = player.role;
    // remove movement role Operations Expert
    const targetPlayer = playerRole === 'Operations Expert'
      ? { ...player, role: '', isMoving: true }
      : { ...player, isMoving: true };
    await game.update({ isDispatching: false, dispatchTarget: targetPlayer });
  }
};


const mapStateToProps = (state) => {
  return {
    currentPlayer: getCurrentPlayer(state),
    players: getPlayers(state),
    playerCities: getPlayerCities(state),
    isDispatching: getIsDispatching(state),
    dispatchTarget: getDispatchTarget(state),
    cities: getCities(state)
  };
};

export default compose(
  firestoreConnect(),
  connect(mapStateToProps)
)(PlayerHighlightMarkers);
