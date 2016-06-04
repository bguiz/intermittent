'use strict';

const co = require('co');

module.exports = {
  run: runIntermittently,
};

function runIntermittently (options) {
  if (!options) {
    throw Error('Must specify options');
  }
  let interval = options.interval;
  let intervalVariance = options.intervalVariance;
  let thing = options.thing;

  // validation
  if (typeof interval !== 'number' || interval < 1) {
    throw Error('Must have interval that is number, 1 or more');
  }
  if (typeof intervalVariance !== 'number') {
    intervalVariance = 0;
  }
  if (intervalVariance < 0) {
    throw Error('Interval variance must be postive');
  }
  if (intervalVariance > interval) {
    throw Error('Interval variance may not exceed the interval');
  }
  if (typeof thing !== 'function') {
    throw Error('Must have a thing that is a function');
  }

  return doNextThing(interval, intervalVariance, thing);
}

function delayBeforeNextThing (interval, intervalVariance) {
  return new Promise((resolve) => {
    let delay =
      (intervalVariance === 0)
      ? interval
      : Math.floor(
        interval - intervalVariance + (2 * Math.random() * intervalVariance)
      );
    setTimeout(() => {
      resolve(true);
    }, delay);
  });
}

function doNextThing (interval, intervalVariance, thing) {
  return co(function* () {
    let result;

    /*eslint-disable  no-constant-condition*/

    while (true) {

    /*eslint-enable  no-constant-condition*/

      result = yield thing();
      if (!result || !result.hasNext) {
        // Exit point from the while loop here
        // because it needs to happen between doing thing,
        // and the delay for the next thing
        break;
      }
      yield delayBeforeNextThing(interval, intervalVariance);
    }
    return true;
  });
}
