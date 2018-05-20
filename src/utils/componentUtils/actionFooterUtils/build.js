export const setResearchStationTrue = currentCityRef => {
  return currentCityRef.update({ researchStation: true });
};

export const setRemainingResearchStations = game => {
  const remainingResearchStations = game.data().remainingResearchStations;
  return game.ref.update({ remainingResearchStations: remainingResearchStations - 1 });
};
