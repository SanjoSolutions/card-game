import { MeleeWeatherCard } from 'core/MeleeWeatherCard.js'
import { RangedWeatherCard } from 'core/RangedWeatherCard.js'
import { Row } from 'core/Row.js'
import { SiegeWeatherCard } from 'core/SiegeWeatherCard.js'
import { WeatherCard } from 'core/WeatherCard.js'

export function toCardRowString(card) {
  if (typeof card.row === 'number') {
    if (card.row === Row.MELEE) {
      return 'Melee'
    } else if (card.row === Row.RANGED) {
      return 'Ranged'
    } else if (card.row === Row.SIEGE) {
      return 'Siege'
    }
  } else if (card instanceof WeatherCard) {
    if (card instanceof MeleeWeatherCard) {
      return 'Melee'
    } else if (card instanceof RangedWeatherCard) {
      return 'Ranged'
    } else if (card instanceof SiegeWeatherCard) {
      return 'Siege'
    }
  }
  return ''
}
