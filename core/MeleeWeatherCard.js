import { Row } from './Row.js'
import { WeatherCard } from './WeatherCard.js'

export class MeleeWeatherCard extends WeatherCard {
  get row() {
    return Row.MELEE
  }
}
