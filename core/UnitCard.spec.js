import { describe, test } from '@jest/globals'
import { Row } from './Row.js'
import { UnitCard } from './UnitCard.js'

describe('UnitCard', () => {
  test('instantiating a unit card', () => {
    const unitCard = new UnitCard(0, Row.FRONT)
  })
})
