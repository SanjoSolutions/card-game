export class Action {
  /**
   * @abstract
   */
  do(match) {
    throw new Error('Please implement.')
  }
}
