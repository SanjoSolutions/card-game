import { Board } from './Board.js'
import { cssClasses } from './cssClasses.js'
import { Hand } from './Hand.js'
import './PlayerSide.css'

export function PlayerSide({
  match,
  player,
  reverse,
  onCardDragStart,
  onCardDragEnd,
  onCardDroppedInMeleeRow,
  onCardDroppedInRangedRow,
  onCardDroppedInSiegeRow,
  onPlayCard,
  onPass,
  height,
  isDroppableInMeleeRow,
  isDroppableInRangedRow,
  isDroppableInSiegeRow,
  showCards,
  showPassButton,
  onCardDroppedInMeleeRowSpecialCardSlot,
  isDroppableInMeleeRowSpecialCardSlot,
  onCardDroppedInRangedRowSpecialCardSlot,
  isDroppableInRangedRowSpecialCardSlot,
  onCardDroppedInSiegeRowSpecialCardSlot,
  isDroppableInSiegeRowSpecialCardSlot
}) {
  return (
    <div
      className={
        cssClasses([
          'player-side',
          ['player-side--player-to-act', match.playerToAct === player.index],
          ['player-side--reverse', reverse],
        ])
      }
    >
      <Hand
        hand={ player.hand }
        player={ player }
        onCardDragStart={ onCardDragStart }
        onCardDragEnd={ onCardDragEnd }
        onPlayCard={ onPlayCard }
        height={ height }
        showCards={ showCards }
      />
      <Board
        board={ player.board }
        match={ match }
        player={ player }
        onCardDroppedInMeleeRow={ onCardDroppedInMeleeRow }
        onCardDroppedInRangedRow={ onCardDroppedInRangedRow }
        onCardDroppedInSiegeRow={ onCardDroppedInSiegeRow }
        onPass={ onPass }
        droppableInMeleeRow={ isDroppableInMeleeRow }
        droppableInRangedRow={ isDroppableInRangedRow }
        droppableInSiegeRow={ isDroppableInSiegeRow }
        reverse={ reverse }
        onCardDroppedInMeleeRowSpecialCardSlot={ onCardDroppedInMeleeRowSpecialCardSlot }
        isDroppableInMeleeRowSpecialCardSlot={ isDroppableInMeleeRowSpecialCardSlot }
        onCardDroppedInRangedRowSpecialCardSlot={ onCardDroppedInRangedRowSpecialCardSlot }
        isDroppableInRangedRowSpecialCardSlot={ isDroppableInRangedRowSpecialCardSlot }
        onCardDroppedInSiegeRowSpecialCardSlot={ onCardDroppedInSiegeRowSpecialCardSlot }
        isDroppableInSiegeRowSpecialCardSlot={ isDroppableInSiegeRowSpecialCardSlot }
        showPassButton={ showPassButton }
      />
    </div>
  )
}
