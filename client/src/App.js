import { Bot } from 'core/bot/index.js'
import { createMatch } from 'core/createMatch.js'
import { DrawCardsCard } from 'core/DrawCardsCard.js'
import { InRowPlayableCard } from 'core/InRowPlayableCard.js'
import { PassAction } from 'core/PassAction.js'
import { PlayInRowPlayableCardAction } from 'core/PlayInRowPlayableCardAction.js'
import { PlayWeatherCardAction } from 'core/PlayWeatherCardAction.js'
import { Row } from 'core/Row.js'
import { RowSpecialCard } from 'core/RowSpecialCard.js'
import { serialize } from 'core/serialize.js'
import { WeatherCard } from 'core/WeatherCard.js'
import React from 'react'
import './App.css'
import { PlayerSide } from './PlayerSide.js'
import { WeatherCards } from './WeatherCards.js'
import { deserializeMatch } from 'core/deserializeMatch.js'

export class App extends React.Component {
  constructor(props) {
    super(props)

    window.app = this

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
          isDroppableInFrontRow: false,
          isDroppableInCenterRow: false,
          isDroppableInBackRow: false,
          isDroppableInFrontRowSpecialCardSlot: false,
          isDroppableInCenterRowSpecialCardSlot: false,
          isDroppableInBackRowSpecialCardSlot: false,
        },
        {
          isDroppableInFrontRow: false,
          isDroppableInCenterRow: false,
          isDroppableInBackRow: false,
          isDroppableInFrontRowSpecialCardSlot: false,
          isDroppableInCenterRowSpecialCardSlot: false,
          isDroppableInBackRowSpecialCardSlot: false,
        },
      ],
      height: this._calculateHeight(),
    }

    this._onCardDragStart = this._onCardDragStart.bind(this)
    this._onCardDragEnd = this._onCardDragEnd.bind(this)
    this._updateHeight = this._updateHeight.bind(this)
    this._onCardDroppedInWeatherCardsZone = this._onCardDroppedInWeatherCardsZone.bind(this)
    this._onCardDropped = this._onCardDropped.bind(this)
    this._onCardDroppedInFrontRow = this._onCardDroppedInFrontRow.bind(this)
    this._onCardDroppedInCenterRow = this._onCardDroppedInCenterRow.bind(this)
    this._onCardDroppedInBackRow = this._onCardDroppedInBackRow.bind(this)
    this._onCardDroppedInPlayer0FrontRow = this._onCardDroppedInPlayer0FrontRow.bind(this)
    this._onCardDroppedInPlayer0CenterRow = this._onCardDroppedInPlayer0CenterRow.bind(this)
    this._onCardDroppedInPlayer0BackRow = this._onCardDroppedInPlayer0BackRow.bind(this)
    this._onCardDroppedInPlayer1FrontRow = this._onCardDroppedInPlayer1FrontRow.bind(this)
    this._onCardDroppedInPlayer1CenterRow = this._onCardDroppedInPlayer1CenterRow.bind(this)
    this._onCardDroppedInPlayer1BackRow = this._onCardDroppedInPlayer1BackRow.bind(this)
    this._onPlayCard = this._onPlayCard.bind(this)
    this._onPlayer0Pass = this._onPlayer0Pass.bind(this)
    this._onPlayer1Pass = this._onPlayer1Pass.bind(this)
    this._onPass = this._onPass.bind(this)
    this._onCardDroppedInFrontRowSpecialCardSlot = this._onCardDroppedInFrontRowSpecialCardSlot.bind(this)
    this._onCardDroppedInCenterRowSpecialCardSlot = this._onCardDroppedInCenterRowSpecialCardSlot.bind(this)
    this._onCardDroppedInBackRowSpecialCardSlot = this._onCardDroppedInBackRowSpecialCardSlot.bind(this)
  }

  exportMatch() {
    return serialize(this.match)
  }

  importMatch(serializedMatch) {
    if (typeof serializedMatch === 'object') {
      serializedMatch = JSON.stringify(serializedMatch)
    }
    const match = deserializeMatch(serializedMatch)
    this.match = match
    this.match.afterAct = this._afterAct
    this.forceUpdate()
    this._afterAct()
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
          isDroppableInFrontRow: false,
          isDroppableInCenterRow: false,
          isDroppableInBackRow: false,
          isDroppableInFrontRowSpecialCardSlot: false,
          isDroppableInCenterRowSpecialCardSlot: false,
          isDroppableInBackRowSpecialCardSlot: false,
        },
        {
          isDroppableInFrontRow: false,
          isDroppableInCenterRow: false,
          isDroppableInBackRow: false,
          isDroppableInFrontRowSpecialCardSlot: false,
          isDroppableInCenterRowSpecialCardSlot: false,
          isDroppableInBackRowSpecialCardSlot: false,
        },
      ],
    }

    const playerIndex = player.index
    if (this.match.playerToAct === playerIndex) {
      if (card instanceof InRowPlayableCard) {
        const isDroppableInRow = state.isDroppableInRow[card instanceof DrawCardsCard ?
          (playerIndex + 1) % 2 :
          playerIndex]
        if (card.row === Row.FRONT) {
          isDroppableInRow.isDroppableInFrontRow = true
        } else if (card.row === Row.CENTER) {
          isDroppableInRow.isDroppableInCenterRow = true
        } else if (card.row === Row.BACK) {
          isDroppableInRow.isDroppableInBackRow = true
        }
      } else if (card instanceof WeatherCard) {
        state.isDroppableInWeatherCardsZone = true
      } else if (card instanceof RowSpecialCard) {
        const isDroppableInRow = state.isDroppableInRow[playerIndex]
        isDroppableInRow.isDroppableInFrontRowSpecialCardSlot = true
        isDroppableInRow.isDroppableInCenterRowSpecialCardSlot = true
        isDroppableInRow.isDroppableInBackRowSpecialCardSlot = true
      }
    }

    this.setState(state)
  }

  _onCardDragEnd() {
    this.setState({
      isDroppableInWeatherCardsZone: false,
      isDroppableInRow: [
        {
          isDroppableInFrontRow: false,
          isDroppableInCenterRow: false,
          isDroppableInBackRow: false,
        },
        {
          isDroppableInFrontRow: false,
          isDroppableInCenterRow: false,
          isDroppableInBackRow: false,
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

  _onCardDroppedInFrontRow(player, index) {
    this._onCardDropped(player, Row.FRONT, index)
  }

  _onCardDroppedInCenterRow(player, index) {
    this._onCardDropped(player, Row.CENTER, index)
  }

  _onCardDroppedInBackRow(player, index) {
    this._onCardDropped(player, Row.BACK, index)
  }

  _onCardDroppedInPlayer0FrontRow(index) {
    this._onCardDroppedInFrontRow(this.match.players[0], index)
  }

  _onCardDroppedInPlayer0CenterRow(index) {
    this._onCardDroppedInCenterRow(this.match.players[0], index)
  }

  _onCardDroppedInPlayer0BackRow(index) {
    this._onCardDroppedInBackRow(this.match.players[0], index)
  }

  _onCardDroppedInPlayer1FrontRow(index) {
    this._onCardDroppedInFrontRow(this.match.players[1], index)
  }

  _onCardDroppedInPlayer1CenterRow(index) {
    this._onCardDroppedInCenterRow(this.match.players[1], index)
  }

  _onCardDroppedInPlayer1BackRow(index) {
    this._onCardDroppedInBackRow(this.match.players[1], index)
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

  _onCardDroppedInFrontRowSpecialCardSlot(index) {
    const card = this.match.actingPlayer.hand.cards[index]
    this._act(new PlayInRowPlayableCardAction(card, Row.FRONT), this.match.playerToAct)
  }

  _onCardDroppedInCenterRowSpecialCardSlot(index) {
    const card = this.match.actingPlayer.hand.cards[index]
    this._act(new PlayInRowPlayableCardAction(card, Row.CENTER), this.match.playerToAct)
  }

  _onCardDroppedInBackRowSpecialCardSlot(index) {
    const card = this.match.actingPlayer.hand.cards[index]
    this._act(new PlayInRowPlayableCardAction(card, Row.BACK), this.match.playerToAct)
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
            onCardDroppedInFrontRow={ this._onCardDroppedInPlayer0FrontRow }
            onCardDroppedInCenterRow={ this._onCardDroppedInPlayer0CenterRow }
            onCardDroppedInBackRow={ this._onCardDroppedInPlayer0BackRow }
            onPlayCard={ this._onPlayCard }
            onPass={ this._onPlayer0Pass }
            height={ this.state.height }
            isDroppableInFrontRow={ this.state.isDroppableInRow[0].isDroppableInFrontRow }
            isDroppableInCenterRow={ this.state.isDroppableInRow[0].isDroppableInCenterRow }
            isDroppableInBackRow={ this.state.isDroppableInRow[0].isDroppableInBackRow }
            onCardDroppedInFrontRowSpecialCardSlot={ this._onCardDroppedInFrontRowSpecialCardSlot }
            isDroppableInFrontRowSpecialCardSlot={ this.state.isDroppableInRow[0].isDroppableInFrontRowSpecialCardSlot }
            onCardDroppedInCenterRowSpecialCardSlot={ this._onCardDroppedInCenterRowSpecialCardSlot }
            isDroppableInCenterRowSpecialCardSlot={ this.state.isDroppableInRow[0].isDroppableInCenterRowSpecialCardSlot }
            onCardDroppedInBackRowSpecialCardSlot={ this._onCardDroppedInBackRowSpecialCardSlot }
            isDroppableInBackRowSpecialCardSlot={ this.state.isDroppableInRow[0].isDroppableInBackRowSpecialCardSlot }
            showCards={ !this.botEnabled }
            showPassButton={ !this.botEnabled }
          />
          <PlayerSide
            match={ this.match }
            player={ this.match.players[1] }
            reverse
            onCardDragStart={ this._onCardDragStart }
            onCardDragEnd={ this._onCardDragEnd }
            onCardDroppedInFrontRow={ this._onCardDroppedInPlayer1FrontRow }
            onCardDroppedInCenterRow={ this._onCardDroppedInPlayer1CenterRow }
            onCardDroppedInBackRow={ this._onCardDroppedInPlayer1BackRow }
            onPlayCard={ this._onPlayCard }
            onPass={ this._onPlayer1Pass }
            height={ this.state.height }
            isDroppableInFrontRow={ this.state.isDroppableInRow[1].isDroppableInFrontRow }
            isDroppableInCenterRow={ this.state.isDroppableInRow[1].isDroppableInCenterRow }
            isDroppableInBackRow={ this.state.isDroppableInRow[1].isDroppableInBackRow }
            onCardDroppedInFrontRowSpecialCardSlot={ this._onCardDroppedInFrontRowSpecialCardSlot }
            isDroppableInFrontRowSpecialCardSlot={ this.state.isDroppableInRow[1].isDroppableInFrontRowSpecialCardSlot }
            onCardDroppedInCenterRowSpecialCardSlot={ this._onCardDroppedInCenterRowSpecialCardSlot }
            isDroppableInCenterRowSpecialCardSlot={ this.state.isDroppableInRow[1].isDroppableInCenterRowSpecialCardSlot }
            onCardDroppedInBackRowSpecialCardSlot={ this._onCardDroppedInBackRowSpecialCardSlot }
            isDroppableInBackRowSpecialCardSlot={ this.state.isDroppableInRow[1].isDroppableInBackRowSpecialCardSlot }
            showCards={ true }
            showPassButton={ true }
          />
        </div>
      </div>
    )
  }
}
