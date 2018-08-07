export const checkPlayerCards = (playerCards) => {
  if (playerCards <= 0) {
    alert('No more player cards! You lose!');
  }
};

export const checkOutbreaks = (gameSnapshot) => {
  const numOutbreaks = gameSnapshot.data().numOutbreaks;
  if (numOutbreaks >= 8) {
    alert('Too many outbreaks! You lose!');
  }
};

export const checkDiseaseCubes = (gameSnapshot) => {
  const { redDiseaseCubes, blueDiseaseCubes, yellowDiseaseCubes, blackDiseaseCubes } = gameSnapshot.data();
  if (redDiseaseCubes <= 0) {
    alert(`No more red disease cubes! You lose!`);
  }
  if (blueDiseaseCubes <= 0) {
    alert(`No more blue disease cubes! You lose!`);
  }
  if (yellowDiseaseCubes <= 0) {
    alert(`No more yellow disease cubes! You lose!`);
  }
  if (blackDiseaseCubes <= 0) {
    alert(`No more black disease cubes! You lose!`);
  }
};

export const checkCured = (gameSnapshot) => {
  const { redCureMarker, blueCureMarker, yellowCureMarker, blackCureMarker } = gameSnapshot.data();
  if (redCureMarker && blueCureMarker && yellowCureMarker && blackCureMarker) {
    alert('All diseases cured! You win!');
  }
};
