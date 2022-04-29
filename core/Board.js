import { sum } from '@sanjo/mathematics'
import { MeleeRow } from './MeleeRow.js'
import { RangedRow } from './RangedRow.js'
import { SiegeRow } from './SiegeRow.js'

export class Board {
  constructor() {
    this.rows = [
      new MeleeRow(),
      new RangedRow(),
      new SiegeRow()
    ]
  }

  determineTotalPoints(match) {
    return sum(this.rows.map(row => row.determineTotalPoints(match)))
  }
}
