import { Board } from './Board.js'
import { copyOverEntries } from './copy.js'
import { PassAction } from './PassAction.js'
import { Hand } from './Hand.js'
import { Leader } from './Leader.js'

export class Player {
  static deserialize(value) {
    const player = new Player({
      index: value.index,
      deck: value.deck
    })
    Object.assign(player, value)
    return player
  }

  constructor({ index, deck }) {
    this.index = index
    this.deck = deck
    this.discardPile = []
    this.hand = new Hand()
    this.leader = new Leader()
    this.board = new Board()
  }

  requestAction() {
    return new PassAction()
  }

  copy() {
    const playerCopy = new Player({
      index: null,
      deck: null
    })
    copyOverEntries(playerCopy, this)
    return playerCopy
  }
}
