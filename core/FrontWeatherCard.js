import { Row } from './Row.js'
import { WeatherCard } from './WeatherCard.js'

export class FrontWeatherCard extends WeatherCard {
  get row() {
    return Row.FRONT
  }
}
