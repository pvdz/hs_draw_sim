// import Core from './core';

class Neg extends Core {
  constructor(arg) {
    super();
    this.arg = arg;
    arg.setParent(this);
  }

  replace(from, to) {
    this.arg = to;
    to.setParent(this);
  }

  resolve(player, hand, turn, card) {
    let r = !this.arg.resolve(player, hand, turn, card);
    trace('Neg.resolve(', player, hand, turn, card, ') -> ', r);
    return r;
  }

  html() {
    return `
      <div><button id="${this.key + '_del'}">x</button> 
        Invert / Not<br>
        <div style="margin-left: 15px;">
          ${this.arg.html()}
        </div>
      </div>
    `;
  }

  removeMe(child) {
    if (this.arg !== child) throw new Error('Not my child...');
    const add = new Add();
    this.arg = add;
    add.setParent(this);
  }

  log() {
    super.log('neq');
  }


  dbg(player, hand, turn, card) {
    return `Neg(!arg -> ${this.resolve(player, hand, turn, card)})`;
  }

  serialize() {
    return 'new Neg(' + this.arg.serialize() + ')';
  }
}

// export default Neg;
