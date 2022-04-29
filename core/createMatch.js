import { createPlayer } from './createPlayer.js'
import { Match } from './Match.js'

export function createMatch() {
  return new Match([
    createPlayer({index: 0}),
    createPlayer({index: 1}),
  ])
}
