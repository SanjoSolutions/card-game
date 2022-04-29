import { Row } from './Row.js'

export function RangedRow(props) {
  return (
    <Row { ...props } className="ranged-row" totalPointsTitle="total points in ranged row" />
  )
}
