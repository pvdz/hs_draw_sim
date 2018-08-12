class Eventer {
  constructor() {
    this.map = new Map;
  }

  register(obj) {
    this.map.set(obj.key, obj);
  }

  update(id, e) {
    this.map.get(id).update(e);
  }

  destroy(id) {
    this.map.get(id).destroy();
  }
}

const trace = ()=>0;//(...args) => console.log(...args);
