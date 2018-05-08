export const setResearchStationTrue = async (currentCityRef) => {
  try {
    return await currentCityRef.update({ researchStation: true });
  } catch(err) {
    console.log(err);
  }
};

export const setRemainingResearchStations = async (game) => {
  const remainingResearchStations = game.data().remainingResearchStations;
  try {
    return await game.ref.update({ remainingResearchStations: remainingResearchStations - 1 });
  } catch(err) {
    console.log(err);
  }
};
