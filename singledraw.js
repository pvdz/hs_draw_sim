
// all the cards in the deck
// empty spots get fillers
const DECK = [
  'boomguy',
  'boomguy',
];

// stop when you've drawn this many cards (after the mulligan)
const MAX_DRAW = 10;
const CYCLES = 1000000;
const KEEP = 1;
let FIRST = true;


const BEFORE_MULL = 30;
const AFTER_MULL = 31;
const NOPE = 32;
let stats = Array(33).fill(0);
const statsFirst = Array(33).fill(0);
const statsSecond = Array(33).fill(0);


start(DECK, CYCLES);
print();








function print() {
  console.log('First:');
  printOne(statsFirst);
  console.log('Second:');
  printOne(statsSecond);
}
function printOne(stats) {
  console.log('   m1  |    m2  ||   m    ||'+Array(MAX_DRAW).fill(0).map((_,i) => `    ${i<10?i+' ':i}  `).join('|')+'| R/T');
  console.log(__k(stats[BEFORE_MULL]) + ' | ' + __k(stats[AFTER_MULL]) + ' ||        || ' + stats.slice(0, MAX_DRAW).map(n => __k(n)).join('   '));
  console.log(__p(stats[BEFORE_MULL]) + ' | ' + __p(stats[AFTER_MULL]) + ' || ' + __p(stats[BEFORE_MULL] + stats[AFTER_MULL]) + ' || ' + stats.slice(0, MAX_DRAW).map(__p).join('   ') + ' | ' + __p(stats[NOPE]));
  const str = [];
  stats.slice(0, MAX_DRAW).reduce((prev, now) => (str.push(__p(prev + now)), prev + now), stats[AFTER_MULL]+stats[BEFORE_MULL]);
  console.log(__p(stats[BEFORE_MULL]) + ' | ' + __p(stats[AFTER_MULL]+stats[BEFORE_MULL]) + ' || ' + __p(stats[BEFORE_MULL] + stats[AFTER_MULL]) + ' || ' + str.join('   ') + ' | ' + __p(stats[NOPE]));
}
function __k(n) { return ((n > 100000) ? Math.floor(n/1000)+'k' : ''+n).padStart(6, ' ');}
function __p(n) { return ((n/CYCLES*100).toFixed(2)+'%').padStart(6, ' '); }
function start(indeck, cycles) {
  const deck = [...indeck, ...Array(31 - indeck.length).fill(0)];
  console.log('The total deck[' + deck.length +']: ' + deck.join(', '))

  FIRST = true;
  stats = statsFirst;
  for (let i=0; i<cycles; ++i) {
    cycle(deck);
  }
  FIRST = false;
  stats = statsSecond;
  for (let i=0; i<cycles; ++i) {
    cycle(deck);
  }
}
function cycle(deckList) {
  const deck = deckList.slice(0);
  shuffle(deck);

  // if we get here we mulled the cards above, need to shuffle them back in the deck
  if (FIRST) {if (mullFirst(deck, stats)) return;}
  else {if (mullSecond(deck, stats)) return;}

  shuffle(deck);

  // now go through the rest of the deck
  for (let i=0, l=Math.min(deck.length, MAX_DRAW); i<l; ++i) {
    if (deck[i]) {
      ++stats[i];
      return;
    }
  }

  ++stats[NOPE];
}
function mullFirst(deck, stats) {
  // first three drawn cards. if they aren't the target then we need to shuffle them back.
  let A = deck.pop();
  let B = deck.pop();
  let C = deck.pop();
  if (A || B || C) {
    ++stats[BEFORE_MULL];
    return true;
  }

  if (KEEP === 0) {
    let D = deck.pop();
    let E = deck.pop();
    let F = deck.pop();
    if (D || E || F) {
      ++stats[AFTER_MULL];
      return true;
    }
    deck.push(A, B, C);
  } else if (KEEP === 1) {
    let D = deck.pop();
    let E = deck.pop();
    if (D || E) {
      ++stats[AFTER_MULL];
      return true;
    }
    deck.push(A, B);
  } else if (KEEP === 2) {
    let D = deck.pop();
    if (D) {
      ++stats[AFTER_MULL];
      return true;
    }
    deck.push(A);
  }
  return false;
}
function mullSecond(deck, stats) {
  // first three drawn cards. if they aren't the target then we need to shuffle them back.
  let A = deck.pop();
  let B = deck.pop();
  let C = deck.pop();
  let D = deck.pop();
  if (A || B || C || D) {
    ++stats[BEFORE_MULL];
    return true;
  }

  if (KEEP === 0) {
    let D = deck.pop();
    let E = deck.pop();
    let F = deck.pop();
    let G = deck.pop();
    if (D || E || F || G) {
      ++stats[AFTER_MULL];
      return true;
    }
    deck.push(A, B, C, D);
  } else if (KEEP === 1) {
    let D = deck.pop();
    let E = deck.pop();
    let F = deck.pop();
    if (D || E || F) {
      ++stats[AFTER_MULL];
      return true;
    }
    deck.push(A, B, C);
  } else if (KEEP === 2) {
    let D = deck.pop();
    let E = deck.pop();
    if (D || E) {
      ++stats[AFTER_MULL];
      return true;
    }
    deck.push(A, B);
  } else if (KEEP === 3) {
    let D = deck.pop();
    if (D) {
      ++stats[AFTER_MULL];
      return true;
    }
    deck.push(A);
  }
  return false;
}
function shuffle(deck, offset = 0, count = deck.length) {
  const size = deck.length;
  for (let i = 0; i<count; ++i) {
    let n = Math.floor(Math.random() * size);
    swap(deck, offset + i, n);
  }
}
function swap(deck, i, j) {
  let a = deck[i];
  let b = deck[j];
  deck[i] = b;
  deck[j] = a;
}
