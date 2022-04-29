import { copyOverEntries } from './copy.js'
import { determineNextPlayerToAct } from './determineNextPlayerToAct.js'
import { shuffle } from './shuffle.js'

export class Match {
  static ROUNDS_TO_WIN_TO_WIN_MATCH = 2

  get actingPlayer() {
    return this.players[this.playerToAct]
  }

  constructor(players) {
    this.players = players
    this.weatherCards = []
    this.initialize()
  }

  initialize() {
    this._resetForNextRound()
    for (const player of this.players) {
      player.deck.cards = shuffle(player.deck.cards.concat(player.discardPile, player.hand.cards))
      player.disacardPile = []
      player.hand.cards = []
    }
    this.playerToAct = this._determinePlayerToStart()
    this.roundsWon = [0, 0]
    this._givePlayersInitialCards()
  }

  act(action) {
    action.do(this)
    if (this.canSomeoneStillAct()) {
      const nextPlayerToAct = determineNextPlayerToAct(this.playerToAct, this.players.length)
      if (this._canPlayerStillAct(nextPlayerToAct)) {
        this.playerToAct = nextPlayerToAct
      }
    } else {
      const player0TotalPoints = this.players[0].board.determineTotalPoints(this)
      const player1TotalPoints = this.players[1].board.determineTotalPoints(this)
      if (player0TotalPoints > player1TotalPoints) {
        this.roundsWon[0]++
      } else if (player1TotalPoints > player0TotalPoints) {
        this.roundsWon[1]++
      }

      if (this.determineWinner() === null) {
        this._resetForNextRound()
      }
    }
    if (this.afterAct) {
      setTimeout(this.afterAct, 0)
    }
  }

  _resetForNextRound() {
    for (const card of this.weatherCards) {
      this.players[card.playerIndex].discardPile.push(card)
    }
    this.weatherCards = []
    this.hasPlayerPassed = [false, false]
    for (const player of this.players) {
      const rows = player.board.rows
      for (let index = 0; index < rows.length; index++) {
        const row = rows[index]
        player.discardPile = player.discardPile.concat(row.cards)
        if (row.specialCard) {
          player.discardPile.push(row.specialCard)
        }
        row.clear()
      }
    }
  }

  canSomeoneStillAct() {
    return this._canPlayerStillAct(0) || this._canPlayerStillAct(1)
  }

  determineWinner() {
    if (this.roundsWon[0] === Match.ROUNDS_TO_WIN_TO_WIN_MATCH) {
      return 0
    } else if (this.roundsWon[1] === Match.ROUNDS_TO_WIN_TO_WIN_MATCH) {
      return 1
    }
    return null
  }

  isAWeatherCardOfSameTypeActive(card) {
    return this.isAWeatherCardOfTypeActive(card.constructor)
  }

  isAWeatherCardOfTypeActive(weatherCardType) {
    return this.weatherCards.some(weatherCard => weatherCard instanceof weatherCardType)
  }

  _canPlayerStillAct(player) {
    return this.players[player].hand.cards.length >= 1 && !this.hasPlayerPassed[player]
  }

  _determinePlayerToStart() {
    return Math.random() < 0.5 ? 0 : 1
  }

  _givePlayersInitialCards() {
    for (const player of this.players) {
      player.hand.cards = player.deck.draw(10)
    }
  }

  copy() {
    const matchCopy = new Match([])
    copyOverEntries(matchCopy, this)
    return matchCopy
  }
}
