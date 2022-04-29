import { describe, test } from '@jest/globals'
import { MeleeRow } from './MeleeRow.js'
import { RangedRow } from './RangedRow.js'
import { SiegeRow } from './SiegeRow.js'

describe('rows', () => {
  test('instantiating rows', () => {
    const meleeRow = new MeleeRow()
    const rangedRow = new RangedRow()
    const siegeRow = new SiegeRow()
  })
})
