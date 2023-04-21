import { Row } from './Row.js'
import { WeatherCard } from './WeatherCard.js'

export class BackWeatherCard extends WeatherCard {
  get row() {
    return Row.BACK
  }
}
