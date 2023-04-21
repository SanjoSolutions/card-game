import { FrontWeatherCard } from 'core/FrontWeatherCard.js'
import { CenterWeatherCard } from 'core/CenterWeatherCard.js'
import { Row } from 'core/Row.js'
import { BackWeatherCard } from 'core/BackWeatherCard.js'
import { WeatherCard } from 'core/WeatherCard.js'

export function toCardRowString(card) {
  if (typeof card.row === 'number') {
    if (card.row === Row.FRONT) {
      return 'Front'
    } else if (card.row === Row.CENTER) {
      return 'Center'
    } else if (card.row === Row.BACK) {
      return 'Back'
    }
  } else if (card instanceof WeatherCard) {
    if (card instanceof FrontWeatherCard) {
      return 'Front'
    } else if (card instanceof CenterWeatherCard) {
      return 'Center'
    } else if (card instanceof BackWeatherCard) {
      return 'Back'
    }
  }
  return ''
}
