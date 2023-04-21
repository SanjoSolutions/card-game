import { FrontWeatherCard } from './FrontWeatherCard.js'
import { CenterWeatherCard } from './CenterWeatherCard.js'
import { Row } from './Row.js'
import { BackWeatherCard } from './BackWeatherCard.js'

export function getWeatherCardForRow(row) {
  switch (row) {
    case Row.FRONT:
      return FrontWeatherCard
    case Row.CENTER:
      return CenterWeatherCard
    case Row.BACK:
      return BackWeatherCard
  }
}
