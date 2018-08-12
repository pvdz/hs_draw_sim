() => {
// Some examples of setting up itt. This file is not used.
// You would normally not do this but in this case we mulligan ultra aggresively
// Meaning if we have a summoner, don't mulligan other cards unless it's a UI.
let mullItt = new Noop(
  new Logic('or',
    new Card('ui1'),
    new Card('ui2'),
    new Neg(new Logic('or',
      new Hand('spite1'),
      new Hand('spite2'),
    )),
  ),
);
// One of the win cons is to have at least one Ultimate
// Infestation in the deck when playing Spiteful Summoner
let winconItt = new Noop(
  new Logic('and',
    new Neg(new Turn(-1)),
    new Hand('ui1'),
    new Hand('ui2'),
  ),
);


// How often do we have at least one spiteful on turn 7 when we can play it?
// let mullItt = new Noop(
//   new Neg(
//     new Card('spite'),
//   )
// );
// let winconItt = new Noop(
//   new Hand('spite'),
// );
}
