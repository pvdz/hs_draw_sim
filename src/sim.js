const BEFORE_MULL = 30;
const AFTER_MULL = 31;
const NOPE = 32;

function simulateHsDraws(indeck, cycles, maxDraws, mullItt, winconItt, which, correctForCoin) {
  const deck = [...indeck, ...Array(31 - indeck.length).fill(0)];
  const statsFirst = Array(33).fill(0);
  const statsSecond = Array(33).fill(0);
  trace('simulateHsDraws');
  if (which & 1) {
    for (let i = 0; i < cycles; ++i) {
      cycle(deck, true, cycles, maxDraws, mullItt, winconItt, statsFirst);
    }
  }
  if (which & 2) {
    for (let i = 0; i < cycles; ++i) {
      cycle(deck, false, cycles, correctForCoin ? maxDraws - 1 : maxDraws, mullItt, winconItt, statsSecond);
    }
  }

  return printStats(statsFirst, statsSecond, cycles, maxDraws, which, correctForCoin);
}

function cycle(deckList, first, cycles, maxDraws, mullItt, winconItt, stats) {
  trace('cycle', first, cycles, maxDraws);
  const deck = deckList.slice(0);
  shuffle(deck);

  // if we get here we mulled the cards above, need to shuffle them back in the deck
  trace('mulligan')
  const hand = mulligan(deck, first, mullItt, winconItt, stats);
  if (hand === true) {
    trace('found it in the mull')
    // mulligan found the goal
    return;
  }

  shuffle(deck);
  trace('drawing')

  // now go through the rest of the deck
  for (let i = 0, l = Math.min(deck.length, maxDraws); i < l; ++i) {
    const card = deck[i];
    hand.push(card);
    if (winconItt.resolve(first ? 1 : 2, hand, i + 1, card)) {
      trace('found it in the draw')
      ++stats[i];
      return;
    }
  }

  trace('did not find it')
  ++stats[NOPE];
}

function mulligan(deck, first, mullItt, winconItt, stats) {
  let A = deck.pop();
  let B = deck.pop();
  let C = deck.pop();
  let hand = [A, B, C];
  let D;
  if (!first) {
    D = deck.pop();
    hand.push(D);
  }
  let P = first ? 1 : 2;

  // console.log(('['+hand.join(', ')+']').padStart(25, ' '), winconItt.dbg(P, hand, 0, A))

  trace('checking before')
  if (winconItt.resolve(P, hand, -1, A) || winconItt.resolve(P, hand, -1, B) || winconItt.resolve(P, hand, -1, C) || (!first && winconItt.resolve(P, hand, -1, D))) {
    ++stats[BEFORE_MULL];
    return true;
  }

  trace('mull checks A, before:', hand)
  // true means to mull
  if (mullItt.resolve(P, hand, -1, A)) {
    trace(' - mulling');
    let a = deck.pop();
    deck.unshift(A);
    A = a;
  }
  trace('mull checks B, before:', hand)
  if (mullItt.resolve(P, hand, -1, B)) {
    trace(' - mulling');
    let b = deck.pop();
    deck.unshift(B);
    B = b;
  }
  trace('mull checks C, before:', hand)
  if (mullItt.resolve(P, hand, -1, C)) {
    trace(' - mulling');
    let c = deck.pop();
    deck.unshift(C);
    C = c;
  }

  // the second player gets an extra card. just sayin
  if (!first) {
    trace('mull checks D, before:', hand)
    if (mullItt.resolve(P, hand, -1, D)) {
      trace(' - mulling');
      let d = deck.pop();
      deck.unshift(D);
      D = d;
    }
    hand[3] = D;
  }

  // _now_ update the hand
  hand[0] = A;
  hand[1] = B;
  hand[2] = C;
  // console.log(('['+hand.join(', ')+']').padStart(25, ' '), winconItt.dbg(P, hand, 0, A))

  trace('checking after with hand=', hand)
  if (winconItt.resolve(P, hand, 0, A) || winconItt.resolve(P, hand, 0, B) || winconItt.resolve(P, hand, 0, C) || (first && winconItt.resolve(P, hand, 0, D))) {
    ++stats[AFTER_MULL];
    return true;
  }

  return hand;
}

function shuffle(deck, offset = 0, count = deck.length) {
  const size = deck.length;
  for (let i = 0; i < count; ++i) {
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

// export default simulateHsDraws;
