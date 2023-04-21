import { describe, test } from '@jest/globals'
import { FrontRow } from './FrontRow.js'
import { CenterRow } from './CenterRow.js'
import { BackRow } from './BackRow.js'

describe('rows', () => {
  test('instantiating rows', () => {
    const frontRow = new FrontRow()
    const centerRow = new CenterRow()
    const backRow = new BackRow()
  })
})
