export class Card {
  constructor(title, cardType) {
    this._title = title;
    this._cardType = cardType;
  }

  get title() {
    return this._title;
  }

  set title(title) {
    this._title = title;
  }

  get cardType() {
    return this._cardType;
  }
  set cardType(cardType) {
    this._cardType = cardType;
  }
}
