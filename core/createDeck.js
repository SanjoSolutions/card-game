import { Deck } from './Deck.js'
import { DoublePointsInRowCard } from './DoublePointsInRowCard.js'
import { DrawCardsCard } from './DrawCardsCard.js'
import { HeroCard } from './HeroCard.js'
import { FrontWeatherCard } from './FrontWeatherCard.js'
import { CenterWeatherCard } from './CenterWeatherCard.js'
import { Row } from './Row.js'
import { BackWeatherCard } from './BackWeatherCard.js'
import { UnitCard } from './UnitCard.js'

export function createDeck(playerIndex) {
  return new Deck([
    new UnitCard(2, Row.CENTER),
    new UnitCard(3, Row.BACK),
    new UnitCard(4, Row.FRONT),
    new UnitCard(5, Row.CENTER),
    new UnitCard(6, Row.BACK),
    new UnitCard(7, Row.FRONT),
    new UnitCard(8, Row.CENTER),
    new UnitCard(9, Row.BACK),
    new UnitCard(10, Row.FRONT),
    new UnitCard(2, Row.BACK),
    new UnitCard(3, Row.FRONT),
    new UnitCard(4, Row.CENTER),
    new UnitCard(5, Row.BACK),
    new UnitCard(6, Row.FRONT),
    new UnitCard(7, Row.CENTER),
    new UnitCard(8, Row.BACK),
    new UnitCard(9, Row.FRONT),
    new HeroCard(10, Row.CENTER),
    new HeroCard(10, Row.FRONT),
    new DrawCardsCard(5, Row.FRONT),
    new DrawCardsCard(4, Row.CENTER),
    new DrawCardsCard(1, Row.BACK),
    new FrontWeatherCard(playerIndex),
    new CenterWeatherCard(playerIndex),
    new BackWeatherCard(playerIndex),
    new DoublePointsInRowCard(),
    new DoublePointsInRowCard(),
    new DoublePointsInRowCard(),
  ])
}
