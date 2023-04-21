import { Board } from './Board.js'
import { Deck } from './Deck.js'
import { deserialize } from './deserialize.js'
import { DoublePointsInRowCard } from './DoublePointsInRowCard.js'
import { DrawCardsCard } from './DrawCardsCard.js'
import { Hand } from './Hand.js'
import { HeroCard } from './HeroCard.js'
import { Leader } from './Leader.js'
import { Match } from './Match.js'
import { FrontRow } from './FrontRow.js'
import { FrontWeatherCard } from './FrontWeatherCard.js'
import { Player } from './Player.js'
import { CenterRow } from './CenterRow.js'
import { CenterWeatherCard } from './CenterWeatherCard.js'
import { BackRow } from './BackRow.js'
import { BackWeatherCard } from './BackWeatherCard.js'
import { UnitCard } from './UnitCard.js'

export function deserializeMatch(serializedMatch) {
  const typeMapping = new Map([
    ['Match', Match],
    ['Player', Player],
    ['Deck', Deck],
    ['UnitCard', UnitCard],
    ['DrawCardsCard', DrawCardsCard],
    ['HeroCard', HeroCard],
    ['FrontWeatherCard', FrontWeatherCard],
    ['CenterWeatherCard', CenterWeatherCard],
    ['BackWeatherCard', BackWeatherCard],
    ['DoublePointsInRowCard', DoublePointsInRowCard],
    ['Hand', Hand],
    ['Leader', Leader],
    ['Board', Board],
    ['FrontRow', FrontRow],
    ['CenterRow', CenterRow],
    ['BackRow', BackRow]
  ])
  return deserialize(typeMapping, serializedMatch)
}
