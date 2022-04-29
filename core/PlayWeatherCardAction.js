import { Action } from './Action.js'
import { copyOverEntries } from './copy.js'

export class PlayWeatherCardAction extends Action {
  constructor(card) {
    super()
    this.card = card
  }

  do(match) {
    const { card } = this
    const player = match.actingPlayer
    const index = player.hand.cards.indexOf(card)
    player.hand.cards.splice(index, 1)

    if (match.isAWeatherCardOfSameTypeActive(card)) {
      match.actingPlayer.discardPile.push(card)
    } else {
      match.weatherCards.push(card)
    }
  }

  copy() {
    const actionCopy = new PlayWeatherCardAction(null)
    copyOverEntries(actionCopy, this)
    return actionCopy
  }
}
