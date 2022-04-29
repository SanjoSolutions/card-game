import { MeleeWeatherCard } from './MeleeWeatherCard.js'
import { RangedWeatherCard } from './RangedWeatherCard.js'
import { Row } from './Row.js'
import { SiegeWeatherCard } from './SiegeWeatherCard.js'

export function getWeatherCardForRow(row) {
  switch (row) {
    case Row.MELEE:
      return MeleeWeatherCard
    case Row.RANGED:
      return RangedWeatherCard
    case Row.SIEGE:
      return SiegeWeatherCard
  }
}
