import { createDeck } from './createDeck.js'
import { Player } from './Player.js'

export function createPlayer({ index } = {}) {
  return new Player({
    index,
    deck: createDeck(index),
  })
}
