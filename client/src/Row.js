import { useCallback, useRef } from "react"
import { Card as CardComponent } from "./Card.js"
import "./Row.css"

export function Row({
  row, player, match, onCardDropped, droppable, totalPointsTitle, className,
  onCardDroppedInSpecialCardSlot, droppableInSpecialCardSlot,
}) {
  return (
    <div className={ `row${ className ? ` ${ className }` : "" }` }>
      <div className="row__total-points" title={ totalPointsTitle }>
        { row.determineTotalPoints(match) }
      </div>
      <RowSpecialCardSlot
        specialCard={ row.specialCard }
        onCardDropped={ onCardDroppedInSpecialCardSlot }
        droppable={ droppableInSpecialCardSlot }
      />
      <RowUnitCards
        row={ row }
        match={ match }
        onCardDropped={ onCardDropped }
        droppable={ droppable }
      />
    </div>
  )
}

export function RowSpecialCardSlot({ specialCard, onCardDropped, droppable }) {
  const ref = useRef(null)

  const onDragEnter = useCallback(
    function onDragEnter(event) {
      event.preventDefault()
      event.dataTransfer.dropEffect = "move"
      ref.current.classList.add("row__special-card-slot--drag-over")
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
      ref.current.classList.remove("row__special-card-slot--drag-over")
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
      const { index } = JSON.parse(event.dataTransfer.getData("application/json"))
      event.preventDefault()
      if (onCardDropped) {
        onCardDropped(index)
      }
      removeDragOverStyle()
    },
    [onCardDropped, removeDragOverStyle],
  )

  return (
    <div
      ref={ ref }
      className="row__special-card-slot"
      onDragEnter={ droppable ? onDragEnter : undefined }
      onDragOver={ droppable ? onDragOver : undefined }
      onDragLeave={ droppable ? onDragLeave : undefined }
      onDrop={ droppable ? onDrop : undefined }
    >
      <div className="row__special-card-slot-inner">
        {
          specialCard ? <CardComponent
            className="row__special-card"
            card={ specialCard }
          /> : null
        }
      </div>
    </div>
  )
}

export function RowUnitCards({ row, match, onCardDropped, droppable }) {
  const unitCardsRef = useRef(null)

  const onDragEnter = useCallback(
    function onDragEnter(event) {
      event.preventDefault()
      event.dataTransfer.dropEffect = "move"
      unitCardsRef.current.classList.add("row__unit-cards--drag-over")
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
      unitCardsRef.current.classList.remove("row__unit-cards--drag-over")
    },
    [unitCardsRef],
  )

  const onDragLeave = useCallback(
    function onDragLeave() {
      removeDragOverStyle()
    },
    [removeDragOverStyle],
  )

  const onDrop = useCallback(
    function onDrop(event) {
      const { index } = JSON.parse(event.dataTransfer.getData("application/json"))
      event.preventDefault()
      if (onCardDropped) {
        onCardDropped(index)
      }
      removeDragOverStyle()
    },
    [onCardDropped, removeDragOverStyle],
  )

  return (
    <div
      ref={ unitCardsRef }
      className="row__unit-cards"
      onDragEnter={ droppable ? onDragEnter : undefined }
      onDragOver={ droppable ? onDragOver : undefined }
      onDragLeave={ droppable ? onDragLeave : undefined }
      onDrop={ droppable ? onDrop : undefined }
    >
      {
        row.cards.map(
          card => <CardComponent
            key={ card.id }
            card={ card }
            match={ match }
          />,
        )
      }
    </div>
  )
}
