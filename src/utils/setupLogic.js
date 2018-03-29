let gameState = db.collection('gameId').doc('gameState');

function setupLogic() {
  //Watch as one research station is placed in Atlanta.
  gameState.collection('cities').doc('Atlanta').update(
  "researchStation", true);
  //Watch as outbreaks and cure markers are placed
  // `numOutbreaks = 0` and `curesMarker: {red: 0, yellow: 0, blue: 0, black: 0}

  //Watch as the infection rate marker is placed.
  gameState.infectionRate.set(2);
  //Watch as the Infection cards are flipped.
  let threeCubesFlip = gameState.collection('unusedInfectionCards').limit(3);
  //how can i access the files and remove objects in here?


  //Watch as cities are infected with disease cubes.
  //Watch as each player receives a role.
  //Watch as the player pawns are placed in Atlanta.
  //Watch as the Epidemic cards are shuffled into the Player Deck.
  //Watch as cards are distributed according to the number of players.
  //See my own hand and if host chooses, everyone else's current hand.
  //Be able to see how many cards are in the discard pile (possibly inspect/search through them).
  //See who is automatically selected to go first.
}
