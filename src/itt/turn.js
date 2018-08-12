// import Core from './core';

class Turn extends Core {
  constructor(n) {
    super();
    this.n = n;
  }

  resolve(player, hand, turn, card) {
    trace('Turn.resolve(',player, hand, turn, card,') ===', [turn, this.n])
    return turn === this.n;
  }

  update(e) {
    this.n = e.value;
  }

  html() {
    return `<span style=""><button id="${this.key + '_del'}">x</button> Current <b>Turn</b> is {<input id="${this.key}" value="${this.n}">}</span>`;
  }

  log() {
    super.log('turn');
  }

  dbg(player, hand, turn, card) {
    return `Turn(${turn} == ${this.n} -> ${this.resolve(player, hand, turn, card)})`;
  }

  serialize() {
    return 'new Turn(' + this.n + ')';
  }
}

// export default Turn;
