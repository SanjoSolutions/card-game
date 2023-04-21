import './WeatherCardsToggleButton.css'

export function WeatherCardsToggleButton({ onClick }) {
  return (
    <button onClick={onClick} className="weather-cards-toggle-button" type="button"></button>
  )
}
