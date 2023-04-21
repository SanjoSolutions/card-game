import { Row } from './Row.js'

export function CenterRow(props) {
  return (
    <Row { ...props } className="center-row" totalPointsTitle="total points in center row" />
  )
}
