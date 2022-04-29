import { Deck } from './Deck.js'
import { DoublePointsInRowCard } from './DoublePointsInRowCard.js'
import { DrawCardsCard } from './DrawCardsCard.js'
import { HeroCard } from './HeroCard.js'
import { MeleeWeatherCard } from './MeleeWeatherCard.js'
import { RangedWeatherCard } from './RangedWeatherCard.js'
import { Row } from './Row.js'
import { SiegeWeatherCard } from './SiegeWeatherCard.js'
import { UnitCard } from './UnitCard.js'

export function createDeck(playerIndex) {
  return new Deck([
    new UnitCard(2, Row.RANGED),
    new UnitCard(3, Row.SIEGE),
    new UnitCard(4, Row.MELEE),
    new UnitCard(5, Row.RANGED),
    new UnitCard(6, Row.SIEGE),
    new UnitCard(7, Row.MELEE),
    new UnitCard(8, Row.RANGED),
    new UnitCard(9, Row.SIEGE),
    new UnitCard(10, Row.MELEE),
    new UnitCard(2, Row.SIEGE),
    new UnitCard(3, Row.MELEE),
    new UnitCard(4, Row.RANGED),
    new UnitCard(5, Row.SIEGE),
    new UnitCard(6, Row.MELEE),
    new UnitCard(7, Row.RANGED),
    new UnitCard(8, Row.SIEGE),
    new UnitCard(9, Row.MELEE),
    new HeroCard(10, Row.RANGED),
    new HeroCard(10, Row.MELEE),
    new DrawCardsCard(5, Row.MELEE),
    new DrawCardsCard(4, Row.RANGED),
    new DrawCardsCard(1, Row.SIEGE),
    new MeleeWeatherCard(playerIndex),
    new RangedWeatherCard(playerIndex),
    new SiegeWeatherCard(playerIndex),
    new DoublePointsInRowCard(),
    new DoublePointsInRowCard(),
    new DoublePointsInRowCard(),
  ])
}
