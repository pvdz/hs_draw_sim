// import Core from './core';

class Add extends Core {
  constructor() {
    super();
  }

  resolve(player, hand, turn, card) {
    // noop
    trace('Add.resolve() noop');
  }

  replace(from, to) {
    trace('Add.replacing', from, 'with', to)
    let pos = this.children.indexOf(from);
    if (pos >= 0) {
      this.children[pos] = to;
      to.setParent(this);
    }
    throw new Error('not my child');
  }

  update() {
    trace('Add.update', this.getSelection());
    let sel = this.getSelection();
    let obj = null;
    switch (sel) {
      case 'card':
        obj = new Card('name');
        break;
      case 'hand':
        obj = new Hand('name');
        break;
      case 'turn':
        obj = new Turn(1);
        break;
      case 'player':
        obj = new Player(1);
        break;
      case 'and':
      case 'or':
        if (this.parent.optype === sel) return; // dont add And to And and Or to Or
        obj = new Logic(sel, new Add(), new Add());
        break;
      case 'not':
        if (this.parent.optype === sel) return; // dont double invert
        obj = new Neg(new Add());
        break;
      default:
        throw new Error('add me: ' + sel);
    }

    this.parent.replace(this, obj);
  }

  html(target, key) {
    return `
      <select id="${key || this.key}">
        <option>...extend</option>  
        <option${target === 'card' ? ' selected' : ''} value="card">Card is</option>  
        <option${target === 'hand' ? ' selected' : ''} value="hand">Hand contains</option>  
        <option${target === 'turn' ? ' selected' : ''} value="turn">Turn is</option>  
        <option${target === 'player' ? ' selected' : ''} value="player">Player is</option>  
        <option${target === 'not' ? ' selected' : ''} value="not">Invert()</option>  
        ${this.parent.optype === 'and' ? '' : `<option${target === 'and' ? ' selected' : ''} value="and">And()</option>`}  
        ${this.parent.optype === 'or' ? '' : `<option${target === 'or' ? ' selected' : ''} value="or">Or()</option>`} 
      </select> 
    `;
  }

  log() {
    super.log('add');
  }

  dbg() {
    return 'Add(NOOP)';
  }
  serialize() {
    return 'new Add()';
  }
}

// export default Add;
