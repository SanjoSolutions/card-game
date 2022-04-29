export class Card {
  static nextId = 1

  static generateUniqueID() {
    const id = Card.nextId
    Card.nextId++
    return id
  }

  constructor() {
    this.id = Card.generateUniqueID()
  }
}
