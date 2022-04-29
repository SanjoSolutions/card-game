import { Card } from './Card.js'
import { copyOverEntries } from './copy.js'
import { DoublePointsInRowCard } from './DoublePointsInRowCard.js'
import { getWeatherCardForRow } from './getWeatherCardForRow.js'
import { Row } from './Row.js'

export class InRowPlayableCard extends Card {
  constructor(points, row) {
    super()
    this.points = points
    this.row = row
    this.playerIndex = null
    this.rowPlayedIn = null
    this.match = null
  }

  getCurrentPoints(match) {
    let currentPoints
    if (
      typeof this.rowPlayedIn === 'number' &&
      match &&
      match.isAWeatherCardOfTypeActive(getWeatherCardForRow(this.rowPlayedIn))
    ) {
      currentPoints = 1
    } else {
      currentPoints = this.points
    }
    if (
      match &&
      typeof this.playerIndex === 'number' &&
      typeof this.rowPlayedIn === 'number' &&
      match.players[this.playerIndex].board.rows[this.rowPlayedIn].specialCard instanceof DoublePointsInRowCard
    ) {
      currentPoints *= 2
    }
    return currentPoints
  }

  copy() {
    const cardCopy = new InRowPlayableCard(0, Row.MELEE)
    copyOverEntries(cardCopy, this)
    return cardCopy
  }
}
