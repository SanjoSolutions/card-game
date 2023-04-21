import { Row } from './Row.js'

export function BackRow(props) {
  return (
    <Row { ...props } className="back-row" totalPointsTitle="total points in back row" />
  )
}
