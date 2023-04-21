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
  onCardDroppedInFrontRow,
  onCardDroppedInCenterRow,
  onCardDroppedInBackRow,
  onPlayCard,
  onPass,
  height,
  isDroppableInFrontRow,
  isDroppableInCenterRow,
  isDroppableInBackRow,
  showCards,
  showPassButton,
  onCardDroppedInFrontRowSpecialCardSlot,
  isDroppableInFrontRowSpecialCardSlot,
  onCardDroppedInCenterRowSpecialCardSlot,
  isDroppableInCenterRowSpecialCardSlot,
  onCardDroppedInBackRowSpecialCardSlot,
  isDroppableInBackRowSpecialCardSlot
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
        onCardDroppedInFrontRow={ onCardDroppedInFrontRow }
        onCardDroppedInCenterRow={ onCardDroppedInCenterRow }
        onCardDroppedInBackRow={ onCardDroppedInBackRow }
        onPass={ onPass }
        droppableInFrontRow={ isDroppableInFrontRow }
        droppableInCenterRow={ isDroppableInCenterRow }
        droppableInBackRow={ isDroppableInBackRow }
        reverse={ reverse }
        onCardDroppedInFrontRowSpecialCardSlot={ onCardDroppedInFrontRowSpecialCardSlot }
        isDroppableInFrontRowSpecialCardSlot={ isDroppableInFrontRowSpecialCardSlot }
        onCardDroppedInCenterRowSpecialCardSlot={ onCardDroppedInCenterRowSpecialCardSlot }
        isDroppableInCenterRowSpecialCardSlot={ isDroppableInCenterRowSpecialCardSlot }
        onCardDroppedInBackRowSpecialCardSlot={ onCardDroppedInBackRowSpecialCardSlot }
        isDroppableInBackRowSpecialCardSlot={ isDroppableInBackRowSpecialCardSlot }
        showPassButton={ showPassButton }
      />
    </div>
  )
}
