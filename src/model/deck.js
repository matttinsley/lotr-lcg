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

  // Shuffles cards using Fisher-Yates shuffling algorithm
  shuffle() {
    let counter = this.cards.length;

    // While there are cards left
    while (counter > 0) {
        // Pick a random index
        let index = Math.floor(Math.random() * counter);
        // Decrease counter by 1
        counter--;
        // And swap the last element with it
        let temp = this.cards[counter];
        this.cards[counter] = this.cards[index];
        this.cards[index] = temp;
    }
  }
}
