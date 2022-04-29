import { Card } from './Card.js'

export class WeatherCard extends Card {
  /**
   * @abstract
   */
  get row() {
    throw new Error('Please implement.')
  }

  constructor(playerIndex) {
    super()
    this.playerIndex = playerIndex
  }
}
