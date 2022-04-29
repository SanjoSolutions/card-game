import { Row } from './Row.js'

export function SiegeRow(props) {
  return (
    <Row { ...props } className="siege-row" totalPointsTitle="total points in siege row" />
  )
}
