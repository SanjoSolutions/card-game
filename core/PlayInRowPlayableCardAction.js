import { Action } from './Action.js'
import { copyOverEntries } from './copy.js'
import { DrawCardsCard } from './DrawCardsCard.js'
import { InRowPlayableCard } from './InRowPlayableCard.js'
import { RowSpecialCard } from './RowSpecialCard.js'

export class PlayInRowPlayableCardAction extends Action {
  constructor(card, row) {
    super()
    this.card = card
    this.row = row
  }

  do(match) {
    const { card } = this
    const player = match.actingPlayer
    const index = player.hand.cards.indexOf(card)
    player.hand.cards.splice(index, 1)

    if (card instanceof DrawCardsCard) {
      const otherPlayerIndex = (match.playerToAct + 1) % 2
      const row = match.players[otherPlayerIndex].board.rows[this.row]
      row.add(card)
      card.playerIndex = otherPlayerIndex
      card.rowPlayedIn = this.row

      player.hand.cards.push(...player.deck.draw(2))
    } else if (card instanceof InRowPlayableCard) {
      const row = player.board.rows[this.row]
      row.add(card)
      card.playerIndex = player.index
      card.rowPlayedIn = this.row
    } else if (card instanceof RowSpecialCard) {
      const row = player.board.rows[this.row]
      row.specialCard = card
    }
  }

  copy() {
    const actionCopy = new PlayInRowPlayableCardAction(null, null)
    copyOverEntries(actionCopy, this)
    return actionCopy
  }
}
