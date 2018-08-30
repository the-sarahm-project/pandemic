import React from 'react';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { Marker } from 'react-leaflet';
import { iconContainer, getCities, getSelf, changeCurrentCity, getActionsRemaining, getNextTurn, getOwnHand, shuttleFlight, charterFlight, isCurrentTurn, getCurrentTurn, getGameRef, getCityRef, getGame, getDispatchTarget, getPlayerCities } from '../utils';
import ChooseCardModal from './ChooseCardModal';

const checkMedic = async (self, city, game, cities) => {
  if (self.role === 'Medic') {
    const gameRef = await getGameRef();
    const cityRef = await getCityRef(city, gameRef);
    const colors = ['blue', 'black', 'yellow', 'red'];
    for (const color of colors) {
      if (game[`${color}CureMarker`]) {
        cityRef.update({ [color]: 0 });
        gameRef.update({ [`${color}DiseaseCubes`]: game[`${color}DiseaseCubes`] + cities[city][color], medicCurrentCity: city });
      }
    }
  }
};

const CityHighlightMarker = ({ game, city, cities, self, actionsRemaining, nextTurn, ownHand, currentTurn, dispatchTarget, playerCities }) => {
  // check for dispatcher.
  self = dispatchTarget ? dispatchTarget : self;
  const neighbors = cities[self.currentCity].neighbors;
  const isNotSelf = city.id !== self.currentCity;
  const isCityInHand = ownHand.find(card => card.id === city.id);
  const isCurrentCityInHand = ownHand.find(card => card.id === self.currentCity);
  const isCurrentCityResearchStation = cities[self.currentCity].researchStation;
  const isResearchStation = isCurrentCityResearchStation && city.researchStation;
  const isNeighbor = neighbors.includes(city.id);

  // Operations Expert - move from a research station to any other city by discarding a card.
  const isOperationsExpert = self.role === 'Operations Expert';
  const isOperationsExpertSpecial = isOperationsExpert && self.hasOESpecial && cities[self.currentCity].researchStation;

  // Dispatcher - also highlight cities with players in them.
  const playerCity = self.role === 'Dispatcher' && Object.keys(playerCities).includes(city.id);
  // whether to display highlight.
  const isHighlighted = self.isMoving && isNotSelf &&
    (isCityInHand || isCurrentCityInHand || isResearchStation || isNeighbor || isOperationsExpertSpecial || playerCity);
  const changeCity = () => {
    checkMedic(self, city.id, game, cities);
    return changeCurrentCity(self.id, city.id, actionsRemaining, nextTurn);
  };
  const changeHandCity = async (selectedCard, clickedCity) => {
    if (Array.isArray(selectedCard)) {
      if (selectedCard.length > 1) return alert('Please select a single card to discard');
      else {
        selectedCard[0].id !== self.currentCity ?
          shuttleFlight(self.id, selectedCard[0].id, ownHand, actionsRemaining, nextTurn, clickedCity) :
          charterFlight(self, city.id, ownHand, actionsRemaining, nextTurn, clickedCity);
        checkMedic(self, clickedCity, game, cities);
      }
    } else {
      isCityInHand ?
        shuttleFlight(self.id, city.id, ownHand, actionsRemaining, nextTurn) :
        charterFlight(self, city.id, ownHand, actionsRemaining, nextTurn);
      checkMedic(self, city.id, game, cities);
    }
  };
  // just change cities or remove cards.
  const getMoveFunc = (isResearchStation || isNeighbor || playerCity) ? changeCity : changeHandCity;
  const cards = isOperationsExpert && isCurrentCityResearchStation ? ownHand : ownHand.filter(card => card.id === city.id || card.id === self.currentCity);
  return (
    // If a user can both shuttleFlight or charterFlight, let user choose which card to discard.
    isHighlighted && (!isNeighbor && ((isOperationsExpert && isCurrentCityResearchStation) || (isCityInHand && isCurrentCityInHand)) ?
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
};

const mapStateToProps = (state) => {
  return {
    game: getGame(state),
    cities: getCities(state),
    self: getSelf(state),
    actionsRemaining: getActionsRemaining(state),
    nextTurn: getNextTurn(state),
    ownHand: getOwnHand(state),
    currentTurn: getCurrentTurn(state),
    dispatchTarget: getDispatchTarget(state),
    playerCities: getPlayerCities(state)
  };
};

export default compose(
  firestoreConnect(),
  connect(mapStateToProps)
)(CityHighlightMarker);
