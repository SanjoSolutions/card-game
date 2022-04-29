import { Row } from './Row.js'
import { WeatherCard } from './WeatherCard.js'

export class RangedWeatherCard extends WeatherCard {
  get row() {
    return Row.RANGED
  }
}
