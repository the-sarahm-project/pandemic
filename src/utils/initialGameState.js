/*
Certain collections will still need to be added in later:
usedInfectionCards
usedCityCards
usedDiseaseCubes
usedEventCards
player: currentHand

Certain fields need to be added:
playerDeck: array
*/

const init = (db, collections, numPlayers, difficultyLevel) => {
  const game = db.collection('games').doc()
  game.set({
    infectionRate: 0, //the infection rate marker
    numOutbreaks: 0, //the outbreak rate marker
    remainingResearchStations: 6,
    currentTurn: Math.floor(Math.random(numPlayers)) + 1,
    numPlayers,
    difficultyLevel
  })
  const cureMarkers = Object.keys(collections.cureMarkers)
  const unusedDiseaseCubes = Object.keys(collections.unusedDiseaseCubes)
  const unusedEventCards = Object.keys(collections.unusedEventCards)
  const players = Object.keys(collections.players)
  const cubes = Object.keys(collections.cubes)
  const cities = Object.keys(collections.cities)
  const unusedInfectionCards = Object.keys(collections.unusedInfectionCards)
  const unusedCityCards = Object.keys(collections.unusedCityCards)

  //add remainingEpidemicCards
  for (let i=0;i<difficultyLevel;i++) {
    game.collection('epidemicCards').add({name: 'Epidemic'})
  }
  //add cureMarkers
  cureMarkers.forEach(cureMarker => {
    game.collection('cureMarkers').doc(cureMarker).set({cured: false})
  })

  //add unusedDiseaseCubes
  unusedDiseaseCubes.forEach(unusedDiseaseCube => {
    game.collection('unusedDiseaseCubes').doc(unusedDiseaseCube).set({count: collections.unusedDiseaseCubes[unusedDiseaseCube]})
  })

  //add unusedEventCards
  unusedEventCards.forEach(unusedEventCard => {
    game.collection('unusedEventCards').doc(unusedEventCard).set(collections.unusedEventCards[unusedEventCard])
  })

  //add players
  players.forEach(player => {
    game.collection('players').doc(player).set(collections.players[player])
  })

  //add cities with cube counters
  cities.forEach(city => {
    game.collection('cities').doc(city).set(collections.cities[city])
    cubes.forEach(cube => {
      //game.collection('cities').doc(city).collection('cubes').doc(cube).set({count: 0})
      game.collection('cities').doc(city).set({[cube]: 0}, {merge: true});
    })
  })

  //add unusedInfectionCards
  unusedInfectionCards.forEach(unusedInfectionCard => {
    game.collection('unusedInfectionCards').doc(unusedInfectionCard).set(collections.unusedInfectionCards[unusedInfectionCard])
  })

  //add unusedCityCards
  unusedCityCards.forEach(unusedCityCard => {
    game.collection('unusedCityCards').doc(unusedCityCard).set(collections.unusedCityCards[unusedCityCard])
  })
}

export default init
