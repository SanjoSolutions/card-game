import { Card } from 'core/Card.js'
import { useCallback, useRef } from 'react'
import { Card as CardComponent } from './Card.js'
import './WeatherCards.css'

export function WeatherCards({ match, height, droppable, onCardDropped, isShown }) {
  const ref = useRef(null)

  const onDragEnter = useCallback(
    function onDragEnter(event) {
      event.preventDefault()
      event.dataTransfer.dropEffect = 'move'
      ref.current.classList.add('weather-cards__inner--drag-over')
    },
    [],
  )

  const onDragOver = useCallback(
    function onDragOver(event) {
      event.preventDefault()
    },
    [],
  )

  const removeDragOverStyle = useCallback(
    function removeDragOverStyle() {
      ref.current.classList.remove('weather-cards__inner--drag-over')
    },
    [ref],
  )

  const onDragLeave = useCallback(
    function onDragLeave() {
      removeDragOverStyle()
    },
    [removeDragOverStyle],
  )

  const onDrop = useCallback(
    function onDrop(event) {
      const { index } = JSON.parse(event.dataTransfer.getData('application/json'))
      event.preventDefault()
      if (onCardDropped) {
        onCardDropped(index)
      }
      removeDragOverStyle()
    },
    [onCardDropped, removeDragOverStyle],
  )

  const cards = Array.from(match.weatherCards)
  while (cards.length < 3) {
    const card = new Card()
    cards.push(card)
  }

  return (
    <div className="weather-cards" style={{display: isShown ? 'flex' : undefined}}>
      <div
        ref={ ref }
        className="weather-cards__inner" style={ { height: `${ height }px` } }
        onDragEnter={ droppable ? onDragEnter : undefined }
        onDragOver={ droppable ? onDragOver : undefined }
        onDragLeave={ droppable ? onDragLeave : undefined }
        onDrop={ droppable ? onDrop : undefined }
      >
        {
          cards.map(
            (card, index) => <CardComponent
              key={ card.id }
              card={ card }
              className={ index > (match.weatherCards.length - 1) ? 'card--empty-slot' : '' }
            />,
          )
        }
      </div>
    </div>
  )
}
