import React from 'react'
import { Card } from './Card.js'
import { cssClasses } from './cssClasses.js'
import './Hand.css'

export function Hand({ hand, player, onCardDragStart, onCardDragEnd, onPlayCard, height, showCards }) {
  return (
    <div className={ cssClasses(['hand', ['hand--hide-cards', !showCards]]) } style={ { flexBasis: `${ height }px` } }>
      {
        hand.cards.map(
          (card, index) => <Card
            key={ card.id }
            card={ card }
            player={ player }
            index={ index }
            draggable={ showCards }
            onDragStart={ onCardDragStart }
            onDragEnd={ onCardDragEnd }
            onPlay={ onPlayCard }
          />,
        )
      }
    </div>
  )
}
