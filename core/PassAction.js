import { Action } from './Action.js'

export class PassAction extends Action {
  do(match) {
    match.hasPlayerPassed[match.playerToAct] = true
  }
}
