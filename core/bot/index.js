import { copy } from '../copy.js'
import { DoublePointsInRowCard } from '../DoublePointsInRowCard.js'
import { InRowPlayableCard } from '../InRowPlayableCard.js'
import { PassAction } from '../PassAction.js'
import { PlayInRowPlayableCardAction } from '../PlayInRowPlayableCardAction.js'
import { PlayWeatherCardAction } from '../PlayWeatherCardAction.js'
import { WeatherCard } from '../WeatherCard.js'

export class Bot {
  act(match) {
    const playerIndex = match.playerToAct
    const otherPlayerIndex = (match.playerToAct + 1) % 2
    if (match.hasPlayerPassed[otherPlayerIndex]) {
      if (match.players[playerIndex].board.determineTotalPoints(match) >
        match.players[otherPlayerIndex].board.determineTotalPoints(match)) {
        const justPassStrategy = new JustPassStrategy()
        justPassStrategy.act(match)
        return
      } else {
        b(match)
        return
      }
    } else {
      b(match)
    }
  }
}

function b(match) {
  const otherPlayerIndex = (match.playerToAct + 1) % 2
  const needsToWinRoundToStayInTheMatch = match.roundsWon[otherPlayerIndex] ===
    1
  const gainLeadStrategy = new GainLeadStrategy()
  if (needsToWinRoundToStayInTheMatch ||
    gainLeadStrategy.isThereACardThatCanBePlayedToGainTheLead(match)) {
    gainLeadStrategy.act(match)
  } else {
    const giveUpRoundStrategy = new GiveUpRoundStrategy()
    giveUpRoundStrategy.act(match)
  }
}

export class GiveUpRoundStrategy {
  act(match) {
    match.act(new PassAction())
  }
}

export class JustPassStrategy {
  act(match) {
    match.act(new PassAction())
  }
}

export class GainLeadStrategy {
  act(match) {
    const bestCandidate = this.findBestCandidate(match)
    if (bestCandidate) {
      const { action } = bestCandidate
      match.act(action)
    } else {
      match.act(new PassAction())
    }
  }

  isThereACardThatCanBePlayedToGainTheLead(match) {
    const candidates = this._generateCandidates(match)
    const candidatesThatGiveTheLead = this._filterCandidatesThatGiveTheLead(
      candidates)
    return candidatesThatGiveTheLead.length >= 1
  }

  findBestCandidate(match) {
    const candidates = this._generateCandidates(match)
    if (candidates.length >= 1) {
      candidates.sort(compareCandidates)
      const candidatesThatGiveTheLead = this._filterCandidatesThatGiveTheLead(
        candidates)
      return candidatesThatGiveTheLead.length >= 1 ?
        candidatesThatGiveTheLead[0] :
        candidates[0]
    } else {
      return null
    }
  }

  _generateCandidates(match) {
    const playerIndex = match.playerToAct
    const candidates = match.actingPlayer.hand.cards
      .filter(card => (
        card instanceof InRowPlayableCard ||
        card instanceof WeatherCard
      ))
      .flatMap(card => {
        if (card instanceof DoublePointsInRowCard) {
          const candidates = []
          match.players[playerIndex].board.rows.forEach(
            (row, rowIndex) => {
              if (!row.specialCard) {
                const action = new PlayInRowPlayableCardAction(card, rowIndex)
                const nextMatch = simulateAction(match, action)
                const candidate = {
                  action,
                  pointsAdvantage: calculatePointsAdvantage(
                    match,
                    nextMatch,
                    playerIndex,
                  ),
                }
                candidates.push(candidate)
              }
            },
          )
          return candidates
        } else {
          let action
          if (card instanceof InRowPlayableCard) {
            action = new PlayInRowPlayableCardAction(card, card.row)
          } else if (card instanceof WeatherCard) {
            action = new PlayWeatherCardAction(card)
          } else {
            throw new Error(`Not implemented for card type: ${ card.constructor.name }`)
          }
          const nextMatch = simulateAction(match, action)
          return {
            action,
            pointsAdvantage: calculatePointsAdvantage(
              match,
              nextMatch,
              playerIndex,
            ),
          }
        }
      })
    return candidates
  }

  _filterCandidatesThatGiveTheLead(candidates) {
    return candidates.filter(({ pointsAdvantage }) => pointsAdvantage >= 1)
  }
}

function simulateAction(match, action) {
  const nextMatch = copy(match)
  nextMatch.act(action)
  return nextMatch
}

function calculatePointsAdvantage(match, nextMatch, playerIndex) {
  return (
    nextMatch.players[playerIndex].board.determineTotalPoints(match) -
    nextMatch.players[(playerIndex + 1) %
    2].board.determineTotalPoints(match)
  )
}

function compareCandidates(a, b) {
  return a.pointsAdvantage - b.pointsAdvantage
}
