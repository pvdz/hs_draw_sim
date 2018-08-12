const reg = new Eventer();

function setupIttDom(element, ittNode) {
  element.innerHTML = ittNode.html();
  element.onchange = e => {
    if (e.target.nodeName === 'SELECT') {
      reg.update(e.target.id, e.target);
      element.innerHTML = ittNode.html();
    } else if (e.target.nodeName === 'INPUT') {
      reg.update(e.target.id, e.target);
    }
  };
  element.onclick = e => {
    const id = e.target.id;
    console.log(e.target, id)
    if (id && id.slice && id.slice(-4) === '_del') {
      reg.destroy(id.slice(0, -4));
      element.innerHTML = ittNode.html();
    }
  };
}
