import { describe, expect, it, jest, test } from '@jest/globals'
import { createMatchForTesting as createMatch } from './createMatchForTesting.js'
import { Match } from './Match.js'
import { PassAction } from './PassAction.js'
import { PlayInRowPlayableCardAction } from './PlayInRowPlayableCardAction.js'
import { Player } from './Player.js'
import { Row } from './Row.js'
import { UnitCard } from './UnitCard.js'

describe('Match', () => {
  test('instantiating a match', () => {
    const match = createMatch()
    expect(match.players).toHaveLength(2)
    expect(match.players[0]).toBeInstanceOf(Player)
    expect(match.players[1]).toBeInstanceOf(Player)
  })

  describe('initialization', () => {
    describe('determine player to start', () => {
      it('is rolled out randomly who starts', () => {
        const match = createMatch()
        match._determinePlayerToStart.mockRestore()
        jest.spyOn(Math, 'random').mockReturnValue(0)
        match.initialize()
        expect(match.playerToAct).toEqual(0)
        expect(Math.random).toHaveBeenCalled()
      })
    })

    test('each player has 10 cards in the hand', () => {
      const match = createMatch()
      expect(match.players[0].hand.cards).toHaveLength(10)
      expect(match.players[1].hand.cards).toHaveLength(10)
    })
  })

  describe('when both players have passed', () => {
    test('it is determined who wins the round', () => {
      const match = createMatch()
      match.act(new PlayInRowPlayableCardAction(new UnitCard(1, Row.FRONT), Row.FRONT))
      match.act(new PassAction())
      match.act(new PassAction())
      expect(match.roundsWon[0]).toEqual(1)
      expect(match.roundsWon[1]).toEqual(0)
    })

    test('player 1 wins when he has more points on board', () => {
      const match = createMatch()
      match.act(new PassAction())
      match.act(new PlayInRowPlayableCardAction(new UnitCard(1, Row.FRONT), Row.FRONT))
      match.act(new PassAction())
      expect(match.roundsWon[0]).toEqual(0)
      expect(match.roundsWon[1]).toEqual(1)
    })
  })

  describe('winning a match', () => {
    test('the player who wins 2 rounds first, wins the match', () => {
      const match = createMatch()
      const winner = match.determineWinner()
      expect(winner).toBeNull()
    })

    describe(
      `when player 0 has won ${ Match.ROUNDS_TO_WIN_TO_WIN_MATCH } rounds and player 1 has won less than ${ Match.ROUNDS_TO_WIN_TO_WIN_MATCH } round`,
      () => {
        it('player 0 wins', () => {
          const match = createMatch()
          match.roundsWon[0] = Match.ROUNDS_TO_WIN_TO_WIN_MATCH
          match.roundsWon[1] = 0
          const winner = match.determineWinner()
          expect(winner).toEqual(0)
        })
      },
    )

    describe(
      `when player 1 has won ${ Match.ROUNDS_TO_WIN_TO_WIN_MATCH } rounds and player 0 has won less than ${ Match.ROUNDS_TO_WIN_TO_WIN_MATCH } round`,
      () => {
        it('player 1 wins', () => {
          const match = createMatch()
          match.roundsWon[0] = 0
          match.roundsWon[1] = Match.ROUNDS_TO_WIN_TO_WIN_MATCH
          const winner = match.determineWinner()
          expect(winner).toEqual(1)
        })
      },
    )
  })
})
