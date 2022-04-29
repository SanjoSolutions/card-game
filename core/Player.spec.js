import { describe, expect, test } from '@jest/globals'
import { createPlayer } from './createPlayer.js'
import { Leader } from './Leader.js'
import { Player } from './Player.js'

describe('Player', () => {
  test('instantiating a player', () => {
    const player = createPlayer()
  })

  test('has a leader', () => {
    const player = createPlayer()
    expect(player.leader).toBeInstanceOf(Leader)
  })
})
