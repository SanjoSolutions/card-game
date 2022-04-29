import { copyOverEntries } from './copy.js'

export class Deck {
  constructor(cards) {
    this.cards = cards
  }

  draw(amount) {
    const cards = this.cards.splice(this.cards.length - amount, amount)
    return cards
  }

  copy() {
    const deckCopy = new Deck([])
    copyOverEntries(deckCopy, this)
    return deckCopy
  }
}
