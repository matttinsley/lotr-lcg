export class Deck {
  constructor(obj = {}) {
    this.cards = [];
    if (obj.cards) {
      this.cards = obj.cards;
    }
  }

  fromObject(obj) {
    this.cards = obj.cards;
  }

  toObject() {
    return {
      cards: this.cards
    }
  }

  addCard(card) {
    this.cards.push(card);
  }

  removeCard(id) {
    this.cards.splice(id, 1);
  }

  getCard(id) {
    return this.cards[id];
  }

  drawCard() {
    return this.cards.pop();
  }

  drawCards(num) {
    let cards = [];
    for (let i = 0; i < num; i++) {
      cards.add(this.drawCard());
    }
    return cards;
  }
}
