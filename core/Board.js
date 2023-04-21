import { sum } from '@sanjo/mathematics'
import { FrontRow } from './FrontRow.js'
import { CenterRow } from './CenterRow.js'
import { BackRow } from './BackRow.js'

export class Board {
  constructor() {
    this.rows = [
      new FrontRow(),
      new CenterRow(),
      new BackRow()
    ]
  }

  determineTotalPoints(match) {
    return sum(this.rows.map(row => row.determineTotalPoints(match)))
  }
}
