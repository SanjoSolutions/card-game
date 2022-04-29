import { describe, expect, it } from '@jest/globals'
import { determineNextPlayerToAct } from './determineNextPlayerToAct.js'

describe('determineNextPlayerToAct', () => {
  it('returns 1 when 0 and 2 is passed in as arguments', () => {
    expect(determineNextPlayerToAct(0, 2)).toEqual(1)
  })

  it('returns 0 when 1 and 2 is passed in as arguments', () => {
    expect(determineNextPlayerToAct(1, 2)).toEqual(0)
  })
})
