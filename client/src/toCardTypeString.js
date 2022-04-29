import { DrawCardsCard } from 'core/DrawCardsCard.js'
import { HeroCard } from 'core/HeroCard.js'
import { SpecialCard } from 'core/SpecialCard.js'
import { UnitCard } from 'core/UnitCard.js'
import { WeatherCard } from 'core/WeatherCard.js'

export function toCardTypeString(card) {
  if (card instanceof UnitCard) {
    return 'U'
  } else if (card instanceof DrawCardsCard) {
    return 'D'
  } else if (card instanceof HeroCard) {
    return 'H'
  } else if (card instanceof SpecialCard) {
    return 'S'
  } else if (card instanceof WeatherCard) {
    return 'W'
  }
}
