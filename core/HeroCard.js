import { InRowPlayableCard } from './InRowPlayableCard.js'

export class HeroCard extends InRowPlayableCard {
  getCurrentPoints(match) {
    return this.points
  }
}
