'use strict';

module.exports = {
  run: runIntermittently,
};

function runIntermittently(options) {
  if (!options) {
    throw 'Must specify options';
  }
  let interval = options.interval;
  let intervalVariance = options.intervalVariance;
  let thing = options.thing;

  // validation
  if (typeof interval !== 'number' || interval < 1) {
    throw 'Must have interval that is number, 1 or more';
  }
  if (typeof intervalVariance !== 'number') {
    intervalVariance = 0;
  }
  if (intervalVariance > interval) {
    throw 'Interval variance may not exceed the interval';
  }
  if (typeof thing !== 'function') {
    throw 'Must have a thing that is a function';
  }

  // run
  function doNextThing() {
    return new Promise((resolve, reject) => {
      console.log('doNextThing');
      let thinged = thing();
      if (typeof thinged.then !== 'function') {
        reject('The thing must return a promise');
        return;
      }
      thinged
        .then((result) => {
          console.log('result', result);
          if (!result.hasNext) {
            resolve(true);
            return;
          }
          return new Promise((innerResolve) => {
            let delay = Math.floor(
              interval - intervalVariance - (2 * Math.random() * intervalVariance)
            );
            setTimeout(() => {
              innerResolve(true);
            }, delay);
          })
          .then(doNextThing);
        })
        .catch(reject);
    });
  }
  return doNextThing();
}
