import { Row } from './Row.js'
import { WeatherCard } from './WeatherCard.js'

export class CenterWeatherCard extends WeatherCard {
  get row() {
    return Row.CENTER
  }
}
