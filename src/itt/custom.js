// import Core from './core';

class Custom extends Core {
  constructor(callback) {
    super();
    this.callback = callback;
  }

  resolve(player, hand, turn, card) {
    trace('Custom.resolve()');
    return this.callback(player, hand, turn, card);
  }

  html() {
    return `<span style=""><button id="${this.key + '_del'}">x</button> ???</span>`;
  }

  log() {
    super.log('custom');
  }

  dbg(player, hand, turn, card) {
    return `Custom(-> ${this.resolve(player, hand, turn, card)})`;
  }

  serialize() {
    // sure, we could get this to work...
    return 'new Card("'+this.callback.toString()+'")';
  }
}

// export default Custom;
