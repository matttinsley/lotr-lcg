export class Deck {
  constructor() {
    this._cards = [];
  }

  get cards() {
    return this._cards;
  }

  set cards(cards) {
    this._cards = cards;
  }

  addCard(card) {
    this._cards.push(card);
  }

  removeCard(id) {
    this._cards.splice(id, 1);
  }

  getCard(id) {
    return this._cards[id];
  }

  drawCard() {
    return this._cards.pop();
  }

  drawCards(num) {
    let cards = [];
    for (let i = 0; i < num; i++) {
      cards.add(this.drawCard());
    }
    return cards;
  }
}
