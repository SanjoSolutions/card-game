import { Bot } from 'core/bot/index.js'
import { createMatch } from 'core/createMatch.js'
import { DrawCardsCard } from 'core/DrawCardsCard.js'
import { InRowPlayableCard } from 'core/InRowPlayableCard.js'
import { PassAction } from 'core/PassAction.js'
import { PlayInRowPlayableCardAction } from 'core/PlayInRowPlayableCardAction.js'
import { PlayWeatherCardAction } from 'core/PlayWeatherCardAction.js'
import { Row } from 'core/Row.js'
import { RowSpecialCard } from 'core/RowSpecialCard.js'
import { WeatherCard } from 'core/WeatherCard.js'
import React from 'react'
import './App.css'
import { PlayerSide } from './PlayerSide.js'
import { WeatherCards } from './WeatherCards.js'

export class App extends React.Component {
  constructor(props) {
    super(props)

    this.match = createMatch()
    this.match.initialize()

    this.botEnabled = true
    this.bot = new Bot()
    this._afterAct = this._afterAct.bind(this)
    this._botTryToAct = this._botTryToAct.bind(this)
    this.match.afterAct = this._afterAct

    this.state = {
      isDroppableInWeatherCardsZone: false,
      isDroppableInRow: [
        {
          isDroppableInMeleeRow: false,
          isDroppableInRangedRow: false,
          isDroppableInSiegeRow: false,
          isDroppableInMeleeRowSpecialCardSlot: false,
          isDroppableInRangedRowSpecialCardSlot: false,
          isDroppableInSiegeRowSpecialCardSlot: false,
        },
        {
          isDroppableInMeleeRow: false,
          isDroppableInRangedRow: false,
          isDroppableInSiegeRow: false,
          isDroppableInMeleeRowSpecialCardSlot: false,
          isDroppableInRangedRowSpecialCardSlot: false,
          isDroppableInSiegeRowSpecialCardSlot: false,
        },
      ],
      height: this._calculateHeight(),
    }

    this._onCardDragStart = this._onCardDragStart.bind(this)
    this._onCardDragEnd = this._onCardDragEnd.bind(this)
    this._updateHeight = this._updateHeight.bind(this)
    this._onCardDroppedInWeatherCardsZone = this._onCardDroppedInWeatherCardsZone.bind(this)
    this._onCardDropped = this._onCardDropped.bind(this)
    this._onCardDroppedInMeleeRow = this._onCardDroppedInMeleeRow.bind(this)
    this._onCardDroppedInRangedRow = this._onCardDroppedInRangedRow.bind(this)
    this._onCardDroppedInSiegeRow = this._onCardDroppedInSiegeRow.bind(this)
    this._onCardDroppedInPlayer0MeleeRow = this._onCardDroppedInPlayer0MeleeRow.bind(this)
    this._onCardDroppedInPlayer0RangedRow = this._onCardDroppedInPlayer0RangedRow.bind(this)
    this._onCardDroppedInPlayer0SiegeRow = this._onCardDroppedInPlayer0SiegeRow.bind(this)
    this._onCardDroppedInPlayer1MeleeRow = this._onCardDroppedInPlayer1MeleeRow.bind(this)
    this._onCardDroppedInPlayer1RangedRow = this._onCardDroppedInPlayer1RangedRow.bind(this)
    this._onCardDroppedInPlayer1SiegeRow = this._onCardDroppedInPlayer1SiegeRow.bind(this)
    this._onPlayCard = this._onPlayCard.bind(this)
    this._onPlayer0Pass = this._onPlayer0Pass.bind(this)
    this._onPlayer1Pass = this._onPlayer1Pass.bind(this)
    this._onPass = this._onPass.bind(this)
    this._onCardDroppedInMeleeRowSpecialCardSlot = this._onCardDroppedInMeleeRowSpecialCardSlot.bind(this)
    this._onCardDroppedInRangedRowSpecialCardSlot = this._onCardDroppedInRangedRowSpecialCardSlot.bind(this)
    this._onCardDroppedInSiegeRowSpecialCardSlot = this._onCardDroppedInSiegeRowSpecialCardSlot.bind(this)
  }

  componentDidMount() {
    window.addEventListener('resize', this._updateHeight)
    if (this.botEnabled) {
      setTimeout(this._botTryToAct, 0)
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this._updateHeight)
  }

  _afterAct() {
    if (this.match.determineWinner() !== null || !this.match.canSomeoneStillAct()) {
      setTimeout(() => {
        this.match.initialize()
        this.forceUpdate()
      }, 1000)
    } else if (this.botEnabled) {
      this._botTryToAct()
    }
  }

  _botTryToAct() {
    if (this.match.playerToAct === 0) {
      this.bot.act(this.match)
      this.forceUpdate()
    }
  }

  _onCardDragStart({ card, player }) {
    const state = {
      isDroppableInWeatherCardsZone: false,
      isDroppableInRow: [
        {
          isDroppableInMeleeRow: false,
          isDroppableInRangedRow: false,
          isDroppableInSiegeRow: false,
          isDroppableInMeleeRowSpecialCardSlot: false,
          isDroppableInRangedRowSpecialCardSlot: false,
          isDroppableInSiegeRowSpecialCardSlot: false,
        },
        {
          isDroppableInMeleeRow: false,
          isDroppableInRangedRow: false,
          isDroppableInSiegeRow: false,
          isDroppableInMeleeRowSpecialCardSlot: false,
          isDroppableInRangedRowSpecialCardSlot: false,
          isDroppableInSiegeRowSpecialCardSlot: false,
        },
      ],
    }

    const playerIndex = player.index
    if (this.match.playerToAct === playerIndex) {
      if (card instanceof InRowPlayableCard) {
        const isDroppableInRow = state.isDroppableInRow[card instanceof DrawCardsCard ?
          (playerIndex + 1) % 2 :
          playerIndex]
        if (card.row === Row.MELEE) {
          isDroppableInRow.isDroppableInMeleeRow = true
        } else if (card.row === Row.RANGED) {
          isDroppableInRow.isDroppableInRangedRow = true
        } else if (card.row === Row.SIEGE) {
          isDroppableInRow.isDroppableInSiegeRow = true
        }
      } else if (card instanceof WeatherCard) {
        state.isDroppableInWeatherCardsZone = true
      } else if (card instanceof RowSpecialCard) {
        const isDroppableInRow = state.isDroppableInRow[playerIndex]
        isDroppableInRow.isDroppableInMeleeRowSpecialCardSlot = true
        isDroppableInRow.isDroppableInRangedRowSpecialCardSlot = true
        isDroppableInRow.isDroppableInSiegeRowSpecialCardSlot = true
      }
    }

    this.setState(state)
  }

  _onCardDragEnd() {
    this.setState({
      isDroppableInWeatherCardsZone: false,
      isDroppableInRow: [
        {
          isDroppableInMeleeRow: false,
          isDroppableInRangedRow: false,
          isDroppableInSiegeRow: false,
        },
        {
          isDroppableInMeleeRow: false,
          isDroppableInRangedRow: false,
          isDroppableInSiegeRow: false,
        },
      ],
    })
  }

  _updateHeight() {
    this.setState({
      height: this._calculateHeight(),
    })
  }

  _calculateHeight() {
    const rem = 16
    return ((document.body.clientHeight / 2) - (5 * 0.5 * rem) - (6 * 1)) / 4
  }

  _onCardDroppedInWeatherCardsZone(index) {
    const card = this.match.actingPlayer.hand.cards[index]
    this._act(new PlayWeatherCardAction(card), this.match.playerToAct)
  }

  _onCardDropped(player, row, index) {
    const card = this.match.actingPlayer.hand.cards[index]
    this._act(new PlayInRowPlayableCardAction(card, row), this.match.playerToAct)
  }

  _onCardDroppedInMeleeRow(player, index) {
    this._onCardDropped(player, Row.MELEE, index)
  }

  _onCardDroppedInRangedRow(player, index) {
    this._onCardDropped(player, Row.RANGED, index)
  }

  _onCardDroppedInSiegeRow(player, index) {
    this._onCardDropped(player, Row.SIEGE, index)
  }

  _onCardDroppedInPlayer0MeleeRow(index) {
    this._onCardDroppedInMeleeRow(this.match.players[0], index)
  }

  _onCardDroppedInPlayer0RangedRow(index) {
    this._onCardDroppedInRangedRow(this.match.players[0], index)
  }

  _onCardDroppedInPlayer0SiegeRow(index) {
    this._onCardDroppedInSiegeRow(this.match.players[0], index)
  }

  _onCardDroppedInPlayer1MeleeRow(index) {
    this._onCardDroppedInMeleeRow(this.match.players[1], index)
  }

  _onCardDroppedInPlayer1RangedRow(index) {
    this._onCardDroppedInRangedRow(this.match.players[1], index)
  }

  _onCardDroppedInPlayer1SiegeRow(index) {
    this._onCardDroppedInSiegeRow(this.match.players[1], index)
  }

  _onPlayCard({ player, card }) {
    if (player.index === this.match.playerToAct) {
      // TODO: When cards are introduced which have the option to play them in one of multiple different rows, then add the necessary conditions here.
      if (card instanceof InRowPlayableCard) {
        this._act(new PlayInRowPlayableCardAction(card, card.row), player.index)
      } else if (card instanceof WeatherCard) {
        this._act(new PlayWeatherCardAction(card), player.index)
      }
    }
  }

  _onPlayer0Pass() {
    this._onPass(0)
  }

  _onPlayer1Pass() {
    this._onPass(1)
  }

  _onPass(playerIndex) {
    this._act(new PassAction(), playerIndex)
  }

  _act(action, playerIndex) {
    if (this.match.playerToAct === playerIndex) {
      this.match.act(action)
      this.forceUpdate()
    }
  }

  _onCardDroppedInMeleeRowSpecialCardSlot(index) {
    const card = this.match.actingPlayer.hand.cards[index]
    this._act(new PlayInRowPlayableCardAction(card, Row.MELEE), this.match.playerToAct)
  }

  _onCardDroppedInRangedRowSpecialCardSlot(index) {
    const card = this.match.actingPlayer.hand.cards[index]
    this._act(new PlayInRowPlayableCardAction(card, Row.RANGED), this.match.playerToAct)
  }

  _onCardDroppedInSiegeRowSpecialCardSlot(index) {
    const card = this.match.actingPlayer.hand.cards[index]
    this._act(new PlayInRowPlayableCardAction(card, Row.SIEGE), this.match.playerToAct)
  }

  render() {
    return (
      <div className="app">
        <WeatherCards
          match={ this.match }
          height={ this.state.height }
          droppable={ this.state.isDroppableInWeatherCardsZone }
          onCardDropped={ this._onCardDroppedInWeatherCardsZone }
        />
        <div className="app__player-sides">
          <PlayerSide
            match={ this.match }
            player={ this.match.players[0] }
            onCardDragStart={ this._onCardDragStart }
            onCardDragEnd={ this._onCardDragEnd }
            onCardDroppedInMeleeRow={ this._onCardDroppedInPlayer0MeleeRow }
            onCardDroppedInRangedRow={ this._onCardDroppedInPlayer0RangedRow }
            onCardDroppedInSiegeRow={ this._onCardDroppedInPlayer0SiegeRow }
            onPlayCard={ this._onPlayCard }
            onPass={ this._onPlayer0Pass }
            height={ this.state.height }
            isDroppableInMeleeRow={ this.state.isDroppableInRow[0].isDroppableInMeleeRow }
            isDroppableInRangedRow={ this.state.isDroppableInRow[0].isDroppableInRangedRow }
            isDroppableInSiegeRow={ this.state.isDroppableInRow[0].isDroppableInSiegeRow }
            onCardDroppedInMeleeRowSpecialCardSlot={ this._onCardDroppedInMeleeRowSpecialCardSlot }
            isDroppableInMeleeRowSpecialCardSlot={ this.state.isDroppableInRow[0].isDroppableInMeleeRowSpecialCardSlot }
            onCardDroppedInRangedRowSpecialCardSlot={ this._onCardDroppedInRangedRowSpecialCardSlot }
            isDroppableInRangedRowSpecialCardSlot={ this.state.isDroppableInRow[0].isDroppableInRangedRowSpecialCardSlot }
            onCardDroppedInSiegeRowSpecialCardSlot={ this._onCardDroppedInSiegeRowSpecialCardSlot }
            isDroppableInSiegeRowSpecialCardSlot={ this.state.isDroppableInRow[0].isDroppableInSiegeRowSpecialCardSlot }
            showCards={ !this.botEnabled }
            showPassButton={ !this.botEnabled }
          />
          <PlayerSide
            match={ this.match }
            player={ this.match.players[1] }
            reverse
            onCardDragStart={ this._onCardDragStart }
            onCardDragEnd={ this._onCardDragEnd }
            onCardDroppedInMeleeRow={ this._onCardDroppedInPlayer1MeleeRow }
            onCardDroppedInRangedRow={ this._onCardDroppedInPlayer1RangedRow }
            onCardDroppedInSiegeRow={ this._onCardDroppedInPlayer1SiegeRow }
            onPlayCard={ this._onPlayCard }
            onPass={ this._onPlayer1Pass }
            height={ this.state.height }
            isDroppableInMeleeRow={ this.state.isDroppableInRow[1].isDroppableInMeleeRow }
            isDroppableInRangedRow={ this.state.isDroppableInRow[1].isDroppableInRangedRow }
            isDroppableInSiegeRow={ this.state.isDroppableInRow[1].isDroppableInSiegeRow }
            onCardDroppedInMeleeRowSpecialCardSlot={ this._onCardDroppedInMeleeRowSpecialCardSlot }
            isDroppableInMeleeRowSpecialCardSlot={ this.state.isDroppableInRow[1].isDroppableInMeleeRowSpecialCardSlot }
            onCardDroppedInRangedRowSpecialCardSlot={ this._onCardDroppedInRangedRowSpecialCardSlot }
            isDroppableInRangedRowSpecialCardSlot={ this.state.isDroppableInRow[1].isDroppableInRangedRowSpecialCardSlot }
            onCardDroppedInSiegeRowSpecialCardSlot={ this._onCardDroppedInSiegeRowSpecialCardSlot }
            isDroppableInSiegeRowSpecialCardSlot={ this.state.isDroppableInRow[1].isDroppableInSiegeRowSpecialCardSlot }
            showCards={ true }
            showPassButton={ true }
          />
        </div>
      </div>
    )
  }
}
