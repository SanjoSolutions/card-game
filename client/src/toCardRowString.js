import { MeleeWeatherCard } from 'core/MeleeWeatherCard.js'
import { RangedWeatherCard } from 'core/RangedWeatherCard.js'
import { Row } from 'core/Row.js'
import { SiegeWeatherCard } from 'core/SiegeWeatherCard.js'
import { WeatherCard } from 'core/WeatherCard.js'

export function toCardRowString(card) {
  if (typeof card.row === 'number') {
    if (card.row === Row.MELEE) {
      return 'M'
    } else if (card.row === Row.RANGED) {
      return 'R'
    } else if (card.row === Row.SIEGE) {
      return 'S'
    }
  } else if (card instanceof WeatherCard) {
    if (card instanceof MeleeWeatherCard) {
      return 'M'
    } else if (card instanceof RangedWeatherCard) {
      return 'R'
    } else if (card instanceof SiegeWeatherCard) {
      return 'S'
    }
  }
  return ''
}
