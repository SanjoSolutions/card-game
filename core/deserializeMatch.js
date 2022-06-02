import { Board } from './Board.js'
import { Deck } from './Deck.js'
import { deserialize } from './deserialize.js'
import { DoublePointsInRowCard } from './DoublePointsInRowCard.js'
import { DrawCardsCard } from './DrawCardsCard.js'
import { Hand } from './Hand.js'
import { HeroCard } from './HeroCard.js'
import { Leader } from './Leader.js'
import { Match } from './Match.js'
import { MeleeRow } from './MeleeRow.js'
import { MeleeWeatherCard } from './MeleeWeatherCard.js'
import { Player } from './Player.js'
import { RangedRow } from './RangedRow.js'
import { RangedWeatherCard } from './RangedWeatherCard.js'
import { SiegeRow } from './SiegeRow.js'
import { SiegeWeatherCard } from './SiegeWeatherCard.js'
import { UnitCard } from './UnitCard.js'

export function deserializeMatch(serializedMatch) {
  const typeMapping = new Map([
    ['Match', Match],
    ['Player', Player],
    ['Deck', Deck],
    ['UnitCard', UnitCard],
    ['DrawCardsCard', DrawCardsCard],
    ['HeroCard', HeroCard],
    ['MeleeWeatherCard', MeleeWeatherCard],
    ['RangedWeatherCard', RangedWeatherCard],
    ['SiegeWeatherCard', SiegeWeatherCard],
    ['DoublePointsInRowCard', DoublePointsInRowCard],
    ['Hand', Hand],
    ['Leader', Leader],
    ['Board', Board],
    ['MeleeRow', MeleeRow],
    ['RangedRow', RangedRow],
    ['SiegeRow', SiegeRow]
  ])
  return deserialize(typeMapping, serializedMatch)
}
