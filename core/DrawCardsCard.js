import { InRowPlayableCard } from './InRowPlayableCard.js'

export class DrawCardsCard extends InRowPlayableCard {
  constructor(points, row) {
    super(points, row)
    this.numberOfCardsToDraw = 2
  }
}
