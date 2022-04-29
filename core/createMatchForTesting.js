import { jest } from '@jest/globals'
import { createMatch } from './createMatch.js'

export function createMatchForTesting() {
  const match = createMatch()
  jest.spyOn(match, '_determinePlayerToStart').mockReturnValue(0)
  match.initialize()
  return match
}
