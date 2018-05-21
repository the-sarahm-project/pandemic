import React from 'react';
import { Map, TileLayer } from 'react-leaflet';
import { CityLines, PlayerHand, GameHeader, CityMarkers, PlayerMarkers, CityHighlightMarker, CurrentHandHighlightMarker, CharterHighlightMarker } from './index';
import { darkTiles, getCurrentPlayer } from '../utils';
import { connect } from 'react-redux';
import { firestoreConnect, isLoaded } from 'react-redux-firebase';
import { compose } from 'redux';

const Board = ({ currentPlayer }) => {
  const center = [0, 0];
  const zoomLevel = 2.3;
  const maxBounds = [[70, -100], [-60, 120]];
  console.log(currentPlayer);
  return isLoaded(currentPlayer) && (
    <Map
      center={center}
      zoom={zoomLevel}
      minZoom={zoomLevel}
      maxZoom={zoomLevel}
      maxBounds={maxBounds}
      className="map"
    >
      <GameHeader />
      <PlayerHand />
      <TileLayer url={darkTiles} />
      <PlayerMarkers />
      <CityMarkers />
      <CityLines />
      {currentPlayer.currentHand.find(card => card.id === currentPlayer.currentCity) !== undefined ?
        <CharterHighlightMarker />
        :
      (
        <div>
          <CityHighlightMarker />
          <CurrentHandHighlightMarker />
        </div>
      )}
    </Map>
  );
};

const mapStateToProps = (state) => {
  return {
    currentPlayer: getCurrentPlayer(state)
  };
};

export default compose(
  firestoreConnect(),
  connect(mapStateToProps)
)(Board);
