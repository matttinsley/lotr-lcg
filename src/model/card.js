export class Card {
  constructor(title) {
    this._title = title;
  }

  get title() {
    return this._title;
  }

  set title(title) {
    this._title = title;
  }
}
