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
  const isCurrentCityResearchStation = cities[self.currentCity].researchStation;
  const isResearchStation = isCurrentCityResearchStation && city.researchStation;
  const isNeighbor = neighbors.includes(city.id);

  // Operations Expert - move from a research station to any other city by discarding a card.
  const isOperationsExpert = self.role === 'Operations Expert';
  const isOperationsExpertSpecial = isOperationsExpert && self.hasOESpecial && cities[self.currentCity].researchStation;

  // whether to display highlight.
  const isHighlighted = self.isMoving && isNotSelf &&
    (isCityInHand || isCurrentCityInHand || isResearchStation || isNeighbor || isOperationsExpertSpecial);

  const changeCity = () => changeCurrentCity(self.id, city.id, actionsRemaining, nextTurn);
  const changeHandCity = async (selectedCard, clickedCity) => {
    if (Array.isArray(selectedCard)) {
      if (selectedCard.length > 1) return alert('Please select a single card to discard');
      else {
        selectedCard[0].id !== self.currentCity ?
          shuttleFlight(self.id, selectedCard[0].id, ownHand, actionsRemaining, nextTurn, clickedCity) :
          charterFlight(self, city.id, ownHand, actionsRemaining, nextTurn, clickedCity);
      }
    } else {
      isCityInHand ?
        shuttleFlight(self.id, city.id, ownHand, actionsRemaining, nextTurn) :
        charterFlight(self, city.id, ownHand, actionsRemaining, nextTurn);
    }
  };
  // just change cities or remove cards.
  const getMoveFunc = (isResearchStation || isNeighbor) ? changeCity : changeHandCity;
  const cards = isOperationsExpert && isCurrentCityResearchStation ? ownHand : ownHand.filter(card => card.id === city.id || card.id === self.currentCity);
  return (
    // If a user can both shuttleFlight or charterFlight, let user choose which card to discard.
    isHighlighted && ((isOperationsExpert && isCurrentCityResearchStation) || (isCityInHand && isCurrentCityInHand) ?
    <ChooseCardModal
      ModalTrigger={(
        <Marker
          id={city.id}
          position={city.coords}
          icon={iconContainer.highlight}
          zIndexOffset={1001}
        />
      )}
      disabled={false}
      cards={cards}
      action={changeHandCity}
      clickable={isCurrentTurn(currentTurn)}
    /> :
    <Marker
      id={city.id}
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
