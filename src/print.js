// import sim, {BEFORE_MULL, AFTER_MULL, NOPE} from './sim.js';

function printStats(statsFirst, statsSecond, cycles, maxDraw, which, correctForCoin) {
  let s = [];
  if (which & 1) {
    s.push(printOne(statsFirst, cycles, maxDraw));
  }
  if (which & 2) {
    s.push(printOne(statsSecond, cycles, correctForCoin ? maxDraw - 1 : maxDraw));
  }
  return s.join('\n\n');
}

function printOne(stats, cycles, maxDraw) {
  const str = [];
  stats.slice(0, maxDraw).reduce((prev, now) => (str.push(__p(prev + now)), prev + now), stats[AFTER_MULL] + stats[BEFORE_MULL]);
  return [
    '   m1  |    m2  ||   m    ||' + Array(maxDraw).fill(0).map((_, i) => `    ${i < 10 ? i + 1 + ' ' : i + 1}  `).join('|') + '| R/T',
    __k(stats[BEFORE_MULL]) + ' | ' + __k(stats[AFTER_MULL]) + ' ||        || ' + stats.slice(0, maxDraw).map(n => __k(n)).join('   ') + ' | ' + __k(stats[NOPE]),

    __p(stats[BEFORE_MULL]) + ' | ' + __p(stats[AFTER_MULL]) + ' || ' + __p(stats[BEFORE_MULL] + stats[AFTER_MULL]) + ' || ' + stats.slice(0, maxDraw).map(__p).join('   ') + ' | ' + __p(stats[NOPE]),
    __p(stats[BEFORE_MULL]) + ' | ' + __p(stats[AFTER_MULL] + stats[BEFORE_MULL]) + ' || ' + __p(stats[BEFORE_MULL] + stats[AFTER_MULL]) + ' || ' + str.join('   ') + ' | ' + __p(stats[NOPE]),
  ].join('\n');

  function __p(n) {
    return ((n / cycles * 100).toFixed(2) + '%').padStart(6, ' ');
  }
}

function __k(n) {
  return ((n > 100000) ? Math.floor(n / 1000) + 'k' : '' + n).padStart(6, ' ');
}

// export default printStats;
