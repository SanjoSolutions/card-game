import { DrawCardsCard } from 'core/DrawCardsCard.js'
import { HeroCard } from 'core/HeroCard.js'
import { SpecialCard } from 'core/SpecialCard.js'
import { UnitCard } from 'core/UnitCard.js'
import { WeatherCard } from 'core/WeatherCard.js'

export function toCardTypeString(card) {
  if (card instanceof UnitCard) {
    return 'Unit'
  } else if (card instanceof DrawCardsCard) {
    return 'Draw'
  } else if (card instanceof HeroCard) {
    return 'Hero'
  } else if (card instanceof SpecialCard) {
    return 'Special'
  } else if (card instanceof WeatherCard) {
    return 'Weather'
  }
}
