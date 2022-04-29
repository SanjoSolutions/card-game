import React from 'react'
import './Board.css'
import { cssClasses } from './cssClasses.js'
import { MeleeRow } from './MeleeRow.js'
import { RangedRow } from './RangedRow.js'
import { SiegeRow } from './SiegeRow.js'

export function Board({
  board,
  match,
  player,
  onCardDroppedInMeleeRow,
  onCardDroppedInRangedRow,
  onCardDroppedInSiegeRow,
  onPass,
  droppableInMeleeRow,
  droppableInRangedRow,
  droppableInSiegeRow,
  reverse,
  onCardDroppedInMeleeRowSpecialCardSlot,
  isDroppableInMeleeRowSpecialCardSlot,
  onCardDroppedInRangedRowSpecialCardSlot,
  isDroppableInRangedRowSpecialCardSlot,
  onCardDroppedInSiegeRowSpecialCardSlot,
  isDroppableInSiegeRowSpecialCardSlot,
  showPassButton
}) {
  return (
    <div className={ cssClasses(['board', ['board--reverse', reverse]]) }>
      <div className="board__number-of-wins">
        <div className="board__number-of-wins-text" title="rounds won">
          { match.roundsWon[player.index] }
        </div>
      </div>
      <div className="board__total-points" title="total points">
        { board.determineTotalPoints(match) }
      </div>
      <div
        className={
          cssClasses([
            'board__rows',
            ['board__rows--reverse', reverse],
          ])
        }
      >
        <SiegeRow
          row={ board.rows[2] }
          player={ player }
          match={ match }
          onCardDropped={ onCardDroppedInSiegeRow }
          droppable={ droppableInSiegeRow }
          onCardDroppedInSpecialCardSlot={ onCardDroppedInSiegeRowSpecialCardSlot }
          droppableInSpecialCardSlot={ isDroppableInSiegeRowSpecialCardSlot }
        />
        <RangedRow
          row={ board.rows[1] }
          player={ player }
          match={ match }
          onCardDropped={ onCardDroppedInRangedRow }
          droppable={ droppableInRangedRow }
          onCardDroppedInSpecialCardSlot={ onCardDroppedInRangedRowSpecialCardSlot }
          droppableInSpecialCardSlot={ isDroppableInRangedRowSpecialCardSlot }
        />
        <MeleeRow
          row={ board.rows[0] }
          player={ player }
          match={ match }
          onCardDropped={ onCardDroppedInMeleeRow }
          droppable={ droppableInMeleeRow }
          onCardDroppedInSpecialCardSlot={ onCardDroppedInMeleeRowSpecialCardSlot }
          droppableInSpecialCardSlot={ isDroppableInMeleeRowSpecialCardSlot }
        />
      </div>
      <div
        className={
          cssClasses([
            'board__pass',
            ['board__pass--reverse', reverse],
          ])
        }
      >
        <button
          className={
            cssClasses([
              'board__pass-button',
              ['board__pass-button--hidden', !showPassButton]
            ])
          }
          onClick={ onPass }
        >
          Pass
        </button>
        <div className="board__has-passed">
          { match.hasPlayerPassed[player.index] ? 'Has passed' : '' }
        </div>
      </div>
    </div>
  )
}
