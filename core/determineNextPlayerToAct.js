export function determineNextPlayerToAct(currentPlayer, numberOfPlayers) {
  return (currentPlayer + 1) % numberOfPlayers
}
