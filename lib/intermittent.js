'use strict';

const co = require('co');

/**
 * @class  intermittent
 * @module  intermittent
 */
module.exports = {
  run: runIntermittently,
};

/**
 * Run something intermittently
 *
 * Example usage:
 *
 * ```
 * const intermittent = require('intermittent');
 * intermittent.run({
 *   interval: 5000,
 *   intervalVatiance: 1000,
 *   thing: myThing,
 * });
 * ```
 *
 * For a sample implementation of `myThing`, like this:
 *
 * ```
 * let times = 3;
 * function myThing() {
 *   return new Promise((resolve) => {
 *     --times;
 *     resolve({
 *       hasNext: (times !== 0),
 *     });
 *   });
 * }
 * ```
 *
 * ... `myThing` would run 3 times,
 * with a gap of 4 seconds to 6 seconds between each run.
 *
 * @method run
 * @for  intermittent
 * @param  {Number} interval  Compulsory, positive number of milliseconds to wait
 *                  between doing one `thing` and the next
 * @param  {Number} intervalVariance  Optional, positive number of milliseconds
 *                  to vary the inerval. Actual interval is `interval` plus or minus
 *                  this `intervalVariance`.
 * @param  {Function} thing  Compulsory, function of the thing to do one or more times
 *                    Should return either a value synchronously,
 *                    or a promise that resolves to a value asyncrhonously.
 *                    The returned/ resolved value can have a `hasNext` boolean flag,
 *                    which if `true`, will mean that the `thing` will run again.
 * @return {Promise}  Rejects on invalid options,
 *                    or if any `thing` fails
 */
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
