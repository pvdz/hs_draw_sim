// import Core from './core';

class Player extends Core {
  constructor(player) {
    super();
    this.player = player;
  }

  resolve(player, hand, turn, card) {
    trace('Player.resolve(',player, hand, turn, card,') ===', [player, this.player], player === this.player)
    return player === this.player;
  }

  getValue() {
    return this.player;
  }

  update(e) {
    this.player = e.value == 1 ? 1 : 2;
  }

  html() {
    return `<span style=""><button id="${this.key + '_del'}">x</button> Current <b>Player</b> is {<input id="${this.key}" value="${this.getValue()}">}</span>`;
  }

  log() {
    super.log('player');
  }

  dbg(player, hand, turn, card) {
    return `Player(${player} == ${this.player} -> ${this.resolve(player, hand, turn, card)})`;
  }

  serialize() {
    return 'new Player(' + this.player + ')';
  }
}

// export default Card;
