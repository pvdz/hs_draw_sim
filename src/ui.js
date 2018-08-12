const noSavedExpName = '{no stored experments, create one!}';

// This preset is a placeholder for when you have nothing in local storage.
// It won't actually be stored there unless you save it yourself.
// (Because no need to clutter the LS with our junk)
const preset = {
  "spite by 7": {
    "mulligan": "new Noop(new Neg(new Card(\"spite\")))",
    "wincon": "new Noop(new Hand(\"spite\"))",
    "deck": "spite\nspite\n",
    "$exp_name": "spite by 7",
    "$exp_desc": "odds of having drawn at least one spiteful summoner by turn 7",
    "$max_cards": "7",
    "$correct_for_coin": "undefined",
    "$sim_count": "10000",
    "$pradio_1": false,
    "$pradio_2": false,
    "$pradio_3": true
  },
  "bricked spite": {
    "mulligan": "new Noop(new Logic(\"or\", new Card(\"ui1\"), new Card(\"ui2\"), new Neg(new Logic(\"or\", new Hand(\"spite1\"), new Hand(\"spite2\"), new Add())), new Add()))",
    "wincon": "new Noop(new Logic(\"and\", new Neg(new Turn(-1)), new Hand(\"ui1\"), new Hand(\"ui2\"), new Add()))",
    "deck": "spite1\nspite2\nui1\nui2\n",
    "$exp_name": "bricked spite",
    "$exp_desc": "odds of having spiteful bricked by turn 7 by having both uis in hand",
    "$max_cards": "7",
    "$correct_for_coin": false,
    "$sim_count": "10000",
    "$pradio_1": false,
    "$pradio_2": false,
    "$pradio_3": true
  }
};

function _save() {
  return Array.from($config_panel.querySelectorAll('input')).reduce((obj, e) => {
    if (e.type === 'checkbox' || e.type === 'radio') obj[e.id] = e.checked;
    else obj[e.id] = e.value;
    return obj;
  }, {
    mulligan: global_mullItt.serialize(),
    wincon: global_winconItt.serialize(),
    deck: $deck_area.value,
  });
}

function save() {
  let obj = _save();

  let json = JSON.parse(localStorage.getItem('hearthstone_draw_sim.list') || '{}');
  json[$exp_name.value] = obj;
  localStorage.setItem('hearthstone_draw_sim.list', JSON.stringify(json));

  console.log('this experiment ->', obj)
  console.log('complete saved json:', json)

  fillLoadSelect();
}

function exp() {
  $impexp_field.value = JSON.stringify(_save());
}

function fillLoadSelect() {
  const json = JSON.parse(localStorage.getItem('hearthstone_draw_sim.list') || '0') || preset;
  const names = Object.getOwnPropertyNames(json);
  $load_select.innerHTML = ''; // clear the select first
  if (names.length) names.forEach(name => $load_select.appendChild(document.createElement('option')).innerHTML = name);
  else $load_select.appendChild(document.createElement('option')).innerHTML = noSavedExpName;
}

function dump() {
  let json = JSON.parse(localStorage.getItem('hearthstone_draw_sim.list') || '{}');
  let str = JSON.stringify(json); // irony!
  console.log(json);
  console.log(JSON.stringify(str));
  $impexp_field.value = str;
}

function _load(toLoad) {
  $deck_area.value = toLoad.deck;

  Array.from($config_panel.querySelectorAll('input')).forEach(e => {
    if (e.type === 'checkbox' || e.type === 'radio') e.checked = !!toLoad[e.id];
    else e.value = toLoad[e.id];
  });

  // #m dr_evil
  global_mullItt = eval(toLoad.mulligan);
  if (toLoad.mulligan !== global_mullItt.serialize()) console.error('The mulligan deserialization did not match expectation');
  console.log('mullItt:', global_mullItt.serialize())
  global_winconItt = eval(toLoad.wincon);
  if (toLoad.wincon !== global_winconItt.serialize()) console.error('The wincon deserialization did not match expectation');
  console.log('winconItt:', global_winconItt.serialize())

  if (!document.querySelector('input[name="pradio"]:checked')) {
    // Make sure at least one player radio is checked
    $pradio_3.checked = true;
  }

  // This connects the logic rules to a DOM node
  // See examples.js on what these constructs might look like as code
  setupIttDom($mull_area, global_mullItt);
  setupIttDom($wincon_area, global_winconItt);

  $output_area.innerHTML = '';
}

function load(name) {
  let nameToLoad = $load_select.children[$load_select.selectedIndex].innerHTML;
  if (!name && nameToLoad === noSavedExpName) return fillLoadSelect(console.warn('Warning: Did not find name in localStorage, repopulating and bailing'));
console.log('loading', [name, nameToLoad])
  let json = JSON.parse(localStorage.getItem('hearthstone_draw_sim.list') || '0') || preset;
  let toLoad = json[name] || json[nameToLoad];
  console.log('loading:', toLoad)
  if (!toLoad) return console.log('local storage did not have this name...');

  return _load(toLoad);
}

function imp() {
  _load(JSON.parse($impexp_field.value));
}

