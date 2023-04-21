import React from 'react'
import './Board.css'
import { cssClasses } from './cssClasses.js'
import { FrontRow } from './FrontRow.js'
import { CenterRow } from './CenterRow.js'
import { BackRow } from './BackRow.js'

export function Board({
  board,
  match,
  player,
  onCardDroppedInFrontRow,
  onCardDroppedInCenterRow,
  onCardDroppedInBackRow,
  onPass,
  droppableInFrontRow,
  droppableInCenterRow,
  droppableInBackRow,
  reverse,
  onCardDroppedInFrontRowSpecialCardSlot,
  isDroppableInFrontRowSpecialCardSlot,
  onCardDroppedInCenterRowSpecialCardSlot,
  isDroppableInCenterRowSpecialCardSlot,
  onCardDroppedInBackRowSpecialCardSlot,
  isDroppableInBackRowSpecialCardSlot,
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
        <BackRow
          row={ board.rows[2] }
          player={ player }
          match={ match }
          onCardDropped={ onCardDroppedInBackRow }
          droppable={ droppableInBackRow }
          onCardDroppedInSpecialCardSlot={ onCardDroppedInBackRowSpecialCardSlot }
          droppableInSpecialCardSlot={ isDroppableInBackRowSpecialCardSlot }
        />
        <CenterRow
          row={ board.rows[1] }
          player={ player }
          match={ match }
          onCardDropped={ onCardDroppedInCenterRow }
          droppable={ droppableInCenterRow }
          onCardDroppedInSpecialCardSlot={ onCardDroppedInCenterRowSpecialCardSlot }
          droppableInSpecialCardSlot={ isDroppableInCenterRowSpecialCardSlot }
        />
        <FrontRow
          row={ board.rows[0] }
          player={ player }
          match={ match }
          onCardDropped={ onCardDroppedInFrontRow }
          droppable={ droppableInFrontRow }
          onCardDroppedInSpecialCardSlot={ onCardDroppedInFrontRowSpecialCardSlot }
          droppableInSpecialCardSlot={ isDroppableInFrontRowSpecialCardSlot }
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
