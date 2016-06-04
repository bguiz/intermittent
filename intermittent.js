'use strict';

const co = require('co');

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

  function delayBeforeNextThing() {
    return new Promise((resolve) => {
      let delay =
        (intervalVariance === 0) ?
        interval :
        Math.floor(
          interval - intervalVariance - (2 * Math.random() * intervalVariance)
        );
      setTimeout(() => {
        resolve(true);
      }, delay);
    })
  }

  function doNextThing() {
    return co(function* () {
      let result;
      while (true) {
        try {
          result = yield thing();
        }
        catch (ex) {
          //TODO intercept certain exceptions to thorw another type of error
          throw ex;
        }
        if (!result || !result.hasNext) {
          // Exit point from the while loop here
          // because it needs to happen between doing thing,
          // and the delay for the next thing
          break;
        }
        yield delayBeforeNextThing();
      }
      return true;
    });
  }
  return doNextThing();
}
