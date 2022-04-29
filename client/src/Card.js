import React from 'react'
import './Card.css'
import { cssClasses } from './cssClasses.js'
import { toCardRowString } from './toCardRowString.js'
import { toCardTypeString } from './toCardTypeString.js'

export class Card extends React.Component {
  constructor(props) {
    super(props)
    this._onDragStart = this._onDragStart.bind(this)
    this._onDragEnd = this._onDragEnd.bind(this)
    this._onDoubleClick = this._onDoubleClick.bind(this)
    this.cardRef = React.createRef()
  }

  componentDidMount() {
    if (this.props.draggable && this.props.onDragEnd) {
      this.cardRef.current.addEventListener('dragend', this._onDragEnd)
    }
  }

  _onDragStart(event) {
    event.dataTransfer.setData('application/json', JSON.stringify({
      index: this.props.index,
    }))
    if (this.props.onDragStart) {
      this.props.onDragStart({
        card: this.props.card,
        player: this.props.player,
      })
    }
    event.dataTransfer.effectAllowed = 'move'
  }

  _onDragEnd() {
    if (this.props.onDragEnd) {
      this.props.onDragEnd({
        card: this.props.card,
        player: this.props.player,
      })
    }
  }

  _onDoubleClick() {
    const { onPlay } = this.props
    if (onPlay) {
      const { card, player } = this.props
      onPlay({ card, player })
    }
  }

  render() {
    const { card, match, draggable, className } = this.props
    const currentPoints = card.getCurrentPoints ? card.getCurrentPoints(match) : null
    return (<div
      ref={ this.cardRef }
      className={ 'card' + (className ? ` ${ className }` : '') }
      draggable={ draggable }
      onDragStart={ draggable ? this._onDragStart : undefined }
      onDoubleClick={ this._onDoubleClick }
    >
      { toCardTypeString(card) }
      <br />
      { toCardRowString(card) }
      <br />
      <span
        className={ cssClasses([
          [
            'card__current-points--reduced',
            currentPoints < card.points,
          ],
          [
            'card__current-points--increased',
            currentPoints > card.points,
          ],
        ]) }
      >{ currentPoints ?? '' }</span>
    </div>)
  }
}
