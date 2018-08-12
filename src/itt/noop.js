// import Core from './core';

class Noop extends Core {
  constructor(arg) {
    super();
    this.arg = arg;
    arg.setParent(this);
  }

  resolve(player, hand, turn, card) {
    let r = this.arg.resolve(player, hand, turn, card);
    trace('Noop.resolve() ->', r)
    return r;
  }

  replace(from, to) {
    this.arg = to;
    to.setParent(this);
  }

  html() {
    return this.arg.html();
  }

  removeMe(child) {
    if (this.arg !== child) throw new Error('Not my child...');
    const and = new Logic('and');
    this.arg = and;
    and.setParent(this);
  }

  log() {
    super.log('noop');
  }

  dbg(player, hand, turn, card) {
    return `Noop(${this.arg.dbg(player, hand, turn, card)})`;
  }

  serialize() {
    return 'new Noop(' + this.arg.serialize() + ')';
  }
}

// export default Noop;
