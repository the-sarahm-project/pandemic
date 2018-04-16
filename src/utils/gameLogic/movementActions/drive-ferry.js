export function changeCurrentCity(playerRef, newCity) {
  playerRef.update({currentCity: newCity});
}
