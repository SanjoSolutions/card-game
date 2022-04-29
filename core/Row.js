import { sum } from '@sanjo/mathematics'

export class Row {
  static MELEE = 0
  static RANGED = 1
  static SIEGE = 2

  constructor() {
    this.specialCard = null
    this.cards = []
  }

  add(card) {
    this.cards.push(card)
  }

  determineTotalPoints(match) {
    return sum(this.cards.map(card => card.getCurrentPoints(match)))
  }

  clear() {
    this.specialCard = null
    this.cards = []
  }
}
