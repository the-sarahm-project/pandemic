import React from 'react';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { Marker } from 'react-leaflet';
import { iconContainer, getCities, getSelf, changeCurrentCity, getActionsRemaining, getNextTurn, getOwnHand, getNeighbors, shuttleFlight, charterFlight, isCurrentTurn, getCurrentTurn } from '../utils';
import ChooseCardModal from './ChooseCardModal';

const CityHighlightMarker = ({ city, cities, self, actionsRemaining, nextTurn, ownHand, neighbors, currentTurn }) => {
  const isNotSelf = city.id !== self.currentCity;
  const isCityInHand = ownHand.find(card => card.id === city.id);
  const isCurrentCityInHand = ownHand.find(card => card.id === self.currentCity);
  const isResearchStation = cities[self.currentCity].researchStation && city.researchStation;
  const isNeighbor = neighbors.includes(city.id);

  // whether to display highlight.
  const isHighlighted = self.isMoving && isNotSelf &&
    (isCityInHand || isCurrentCityInHand || isResearchStation || isNeighbor);

  const changeCity = () => changeCurrentCity(self.id, city.id, actionsRemaining, nextTurn);
  const changeHandCity = (selectedCard) => {
    if (Array.isArray(selectedCard)) {
      if (selectedCard.length > 1) return alert('Please select a single card to discard');
      else {
        selectedCard[0].id !== self.currentCity ?
          shuttleFlight(self.id, selectedCard[0].id, ownHand, actionsRemaining, nextTurn) :
          charterFlight(self, selectedCard[0].id, ownHand, actionsRemaining, nextTurn);
      }
    } else {
      isCityInHand ?
        shuttleFlight(self.id, city.id, ownHand, actionsRemaining, nextTurn) :
        charterFlight(self, city.id, ownHand, actionsRemaining, nextTurn);
    }
  };
  // just change cities or remove cards.
  const getMoveFunc = (isResearchStation || isNeighbor) ? changeCity : changeHandCity;
  return (
    // If a user can both shuttleFlight or charterFlight, let user choose which card to discard.
    isHighlighted && ((isCityInHand && isCurrentCityInHand) ?
    <ChooseCardModal
      ModalTrigger={(
        <Marker
          position={city.coords}
          icon={iconContainer.highlight}
          zIndexOffset={1001}
        />
      )}
      disabled={false}
      cards={ownHand.filter(card => card.id === city.id || card.id === self.currentCity)}
      action={changeHandCity}
      clickable={isCurrentTurn(currentTurn)}
    /> :
    <Marker
      position={city.coords}
      icon={iconContainer.highlight}
      zIndexOffset={1001}
      onClick={getMoveFunc}
    />)
  );
}

const mapStateToProps = (state) => {
  return {
    cities: getCities(state),
    self: getSelf(state),
    actionsRemaining: getActionsRemaining(state),
    nextTurn: getNextTurn(state),
    ownHand: getOwnHand(state),
    neighbors: getNeighbors(state),
    currentTurn: getCurrentTurn(state)
  };
};

export default compose(
  firestoreConnect(),
  connect(mapStateToProps)
)(CityHighlightMarker);
