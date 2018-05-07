import { doc } from '../index';

export const setCityResearchStation = async (firestore, currentTurn, currentCity, unusedCityCards, cardsToRemove) => {
  if (cardsToRemove.length < 5) {
    console.log('Not enough cards selected');
    return;
  }
  const game = await getGame(firestore);
  const currentCityRef = game.ref.collection('cities').doc(currentCity.id);
  const currentPlayerSnapshot = await getCurrentPlayerSnapshot(game, currentTurn, currentCityRef);
  await setResearchStationTrue(currentCityRef);
  await updateCurrentHand(currentPlayerSnapshot, unusedCityCards, currentCity);
  await removeCards(cardsToRemove);
};

const getGame = async (firestore) => {
  try {
    return await firestore.get(`games/${doc}`);
  } catch(err) {
    console.log(err);
  }
};

const getCurrentPlayerSnapshot = async (game, currentTurn, currentCityRef) => {
  const currentTurnRef = game.ref.collection('players').doc(`${currentTurn}`);
  setResearchStationTrue(currentCityRef);
  setRemainingResearchStations(game);
  try {
    return await currentTurnRef.get();
  } catch(err) {
    console.log(err);
  }
};

//build research station
const setResearchStationTrue = async (currentCityRef) => {
  try {
    return await currentCityRef.update({ researchStation: true });
  } catch(err) {
    console.log(err);
  }
};

const setRemainingResearchStations = async (game) => {
  const remainingResearchStations = game.data().remainingResearchStations;
  try {
    return await game.ref.update({ remainingResearchStations: remainingResearchStations - 1 });
  } catch(err) {
    console.log(err);
  }
};

const removeCards = async (cardsToRemove) => {
  //remove cards from unusedCityCards
  try {
    await Promise.all(cardsToRemove.map(card => card.delete()));
  } catch(err) {
    console.log(err);
  }
};

const updateCurrentHand = async (currentPlayerSnapshot, unusedCityCards, currentCity) => {
  const currentHand = currentPlayerSnapshot.data().currentHand;
  const newCurrentHand = currentHand.filter(card => unusedCityCards[card.id].color !== currentCity.color);
  try {
    await currentPlayerSnapshot.ref.update({ currentHand: newCurrentHand });
  } catch(err) {
    console.log(err);
  }
};
