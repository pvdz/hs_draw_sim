// import Core from './core';

class Logic extends Core {
  constructor(optype, ...args) {
    super();
    this.optype = optype;
    this.children = args;
    if (!(args[args.length - 1] instanceof Add)) {
      args.push(new Add());
    }
    args.forEach(e => {
      if (!(e instanceof Core)) console.log('Not instance of Core?', e, args);
      if (!e.setParent) console.log('Instanceof Core but has no setParent?', e, args);
      e.setParent(this);
    });
  }

  replace(from, to) {
    // Every Logic should end with an Add so if this call came from an Add don't replace it
    let pos = this.children.indexOf(from);
    if (pos < 0) throw new Error('not my child');
    let last = pos === this.children.length - 1; // replacing the last Add? Then no you don't.
    this.children.splice(pos, last ? 0 : 1, to);
    if (!(to instanceof Core)) console.log('Not instance of Core?', to);
    if (!to.setParent) console.log('Instanceof Core but has no setParent?', to);
    to.setParent(this);
  }

  resolve(player, hand, turn, card) {
    let r;
    switch (this.optype) {
      case 'and':
        r = this.getRutimeChildren().every(e => e.resolve(player, hand, turn, card));
        break;
      case 'or':
        r = this.getRutimeChildren().some(e => e.resolve(player, hand, turn, card));
        break;
      default:
        throw new Error('need ot implement this');
    }
    trace('Logical', this.optype, '->', r);
    return r;
  }

  getRutimeChildren() {
    return this.children.filter(e => !(e instanceof Add));
  }

  html() {
    return `
      <div style="">
        <button id="${this.key + '_del'}">x</button> 
        Logic(${this.optype})<br>
        <div style="margin-left: 15px;">
          <ul>
            <li>${this.children.map(e => e.html()).join('</li><li>')}</li>
          </ul>
        </div>
      </div>
    `;
  }

  removeMe(child) {
    let pos = this.children.indexOf(child);
    if (pos < 0) throw new Error('Not my child...');
    this.children.splice(pos, 1);
    if (this.children.length < 2) {
      const add = new Add();
      this.children.push(add);
      add.setParent(this);
    }
  }

  log() {
    super.log('logic(' + this.optype + ')');
  }

  dbg(player, hand, turn, card) {
    return `Logic[${this.optype}](${this.getRutimeChildren().map(e => e.dbg(player, hand, turn, card)).join(', ')} -> ${this.resolve(player, hand, turn, card)})`;
  }

  serialize() {
    return 'new Logic("' + this.optype + '", ' + this.children.map(e => e.serialize()).join(', ') + ')';
  }
}

// export default Logic;
