import { beforeEach, describe, expect, it, jest } from '@jest/globals'
import { identity } from '@sanjo/identity'
import {
  createMatchForTesting as createMatch,
} from '../createMatchForTesting.js'
import { PlayInRowPlayableCardAction } from '../PlayInRowPlayableCardAction.js'
import { shuffle } from '../shuffle.js'
import { Bot } from './index.js'

jest.mock('../shuffle.js')

describe('Bot', () => {
  beforeEach(() => {
    shuffle.mockImplementation(identity)
  })

  describe('act', () => {
    it('does an action', () => {
      const bot = new Bot()

      const match = createMatch()

      const card = match.players[0].hand.cards[0]

      jest.spyOn(match, 'act')

      bot.act(match)

      expect(match.act).toHaveBeenCalledWith(
        new PlayInRowPlayableCardAction(
          card,
          0,
        ),
      )
    })
  })
})
