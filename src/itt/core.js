class Core {
  constructor() {
    this.key = 's' + ('' + Math.random()).slice(2)
    this.box = document.createElement('span');
    reg.register(this);
    this.value = '';
  }

  setParent(p) {
    this.parent = p;
  }

  getParent() {
    if (!this.parent) throw 'no parent?';
    return this.parent;
  }

  getSelection() {
    let e = document.getElementById(this.key);
    return e.children[e.selectedIndex].value;
  }

  update() {
    throw new Error('extend update()');
  }

  replace() {
    throw new Error('extend replace()');
  }

  resolve(player, hand, turn, card) {
    throw new Error('extend resolve()');
  }

  html() {
    throw new Error('extend html()');
  }

  log(type) {
    console.log((type || '?core?') + (':' + this.key));
    if (this.children) this.children.forEach(e => e.log());
    if (this.arg) this.arg.log();
    if (this.left) this.left.log();
    if (this.right) this.right.log();
  }

  dbg() {
    throw new Error('extend dbg()');
  }

  serialize() {
    throw new Error('extend serialize()');
  }

  destroy() {
    this.parent.removeMe(this);
  }

  removeMe() {
    throw new Error('extend removeMe()');
  }
}

// export default Core;
