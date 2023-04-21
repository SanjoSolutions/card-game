import { Row } from './Row.js'

export function FrontRow(props) {
  return (
    <Row {...props} className="front-row" totalPointsTitle="total points in front row" />
  )
}
