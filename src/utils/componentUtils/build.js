import { doc } from '../index';

export const setCityResearchStation = async (firestore, currentTurn, currentCity, unusedCityCards, cardsToRemove) => {
  if (cardsToRemove.length < 5) {
    console.log('Not enough cards selected');
    return;
  }
  try {
    const game = await getGame(firestore);
    const currentCityRef = game.ref.collection('cities').doc(currentCity.id);
    const currentPlayerSnapshot = await getCurrentPlayerSnapshot(game, currentTurn, currentCityRef);
    await setResearchStationTrue(currentCityRef);
    await updateCurrentHand(currentPlayerSnapshot, unusedCityCards, currentCity);
    await removeCards(cardsToRemove);
  } catch(err) {
    console.log(err);
  }
};

async function getGame(firestore) {
  return await firestore.get(`games/${doc}`);
}

async function getCurrentPlayerSnapshot(game, currentTurn, currentCityRef) {
  const currentTurnRef = game.ref.collection('players').doc(`${currentTurn}`);
  setResearchStationTrue(currentCityRef);
  setRemainingResearchStations(game);
  return await currentTurnRef.get();
}

//build research station
async function setResearchStationTrue(currentCityRef) {
  return await currentCityRef.update({ researchStation: true });
}

async function setRemainingResearchStations(game) {
  const remainingResearchStations = game.data().remainingResearchStations;
  return await game.ref.update({ remainingResearchStations: remainingResearchStations - 1 });
}

async function removeCards(cardsToRemove) {
  //remove cards from unusedCityCards
  await Promise.all(cardsToRemove.map(card => card.delete()));
  // for (let card of cardsToRemove) {
  //   await card.delete();
  // }
}

async function updateCurrentHand(currentPlayerSnapshot, unusedCityCards, currentCity) {
  const currentHand = currentPlayerSnapshot.data().currentHand;
  const newCurrentHand = currentHand.filter(card => unusedCityCards[card.id].color !== currentCity.color);
  await currentPlayerSnapshot.ref.update({ currentHand: newCurrentHand });
}
