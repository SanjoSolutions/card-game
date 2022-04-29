import { Row } from './Row.js'
import { WeatherCard } from './WeatherCard.js'

export class SiegeWeatherCard extends WeatherCard {
  get row() {
    return Row.SIEGE
  }
}
