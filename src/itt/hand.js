// import Core from './core';

class Hand extends Core {
  constructor(card) {
    super();
    this.card = card;
  }

  resolve(player, hand, turn, card) {
    trace('Hand.resolve(', player, hand, turn, card, ') ===', [card, this.card], hand.includes(this.getValue()))
    return hand.includes(this.getValue());
  }

  getValue() {
    return this.card;
  }

  update(e) {
    this.card = e.value;
  }

  html() {
    return `<span style=""><button id="${this.key + '_del'}">x</button> <b>Hand</b> contains {<input id="${this.key}" value="${this.getValue()}">}</span>`;
  }

  log() {
    super.log('card');
  }

  dbg(player, hand, turn, card) {
    return `Hand([${hand.join(', ')}].includes(${this.card}) -> ${this.resolve(player, hand, turn, card)})`;
  }

  serialize() {
    return 'new Hand("' + this.card + '")';
  }
}

// export default Hand;

