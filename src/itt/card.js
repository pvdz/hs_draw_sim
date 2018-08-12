// import Core from './core';

class Card extends Core {
  constructor(card) {
    super();
    this.card = card;
  }

  resolve(player, hand, turn, card) {
    trace('Card.resolve(',player, hand, turn, card,') ===', [card, this.card], card === this.card)
    return card === this.card;
  }

  getValue() {
    return this.card;
  }

  update(e) {
    this.card = e.value;
  }

  html() {
    return `<span style=""><button id="${this.key + '_del'}">x</button> Current <b>Card</b> is {<input id="${this.key}" value="${this.getValue()}">}</span>`;
  }

  log() {
    super.log('card');
  }

  dbg(player, hand, turn, card) {
    return `Card(${card} == ${this.card} -> ${this.resolve(player, hand, turn, card)})`;
  }

  serialize() {
    return 'new Card("'+this.card+'")';
  }
}

// export default Card;
