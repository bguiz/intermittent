'use strict';

const intermittent = require('../lib/intermittent.js');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

const expect = chai.expect;
chai.use(chaiAsPromised);

describe('[intermittent]', () => {

  describe('[invalid]', () => {

    it('should check that options are present', () => {
      expect(() => {
        intermittent.run();
      })
      .to.throw('Must specify options');
    });

    it('should check that interval is specified', () => {
      expect(() => {
        intermittent.run({
          interval: 'not a number',
          thing: () => {},
        });
      })
      .to.throw('Must have interval that is number, 1 or more');
    });

    it('should check that interval variance is positive', () => {
      expect(() => {
        intermittent.run({
          interval: 10,
          intervalVariance: -1,
          thing: () => {},
        });
      })
      .to.throw('Interval variance must be postive');
    });

    it('should check that interval variance is less than interval itself', () => {
      expect(() => {
        intermittent.run({
          interval: 10,
          intervalVariance: 20,
          thing: () => {},
        });
      })
      .to.throw('Interval variance may not exceed the interval');
    });

    it('should check that thing is specified', () => {
      expect(() => {
        intermittent.run({
          interval: 1000,
          thing: 'not a function',
        });
      })
      .to.throw('Must have a thing that is a function');
    });

  });

  describe('[valid]', () => {

    it('should run when interval and has one thing', () => {
      expect(() => {
        intermittent.run({
          interval: 1000,
          thing: () => {
            return {
              hasNext: false,
            };
          },
        });
      })
      .to.not.throw();
    });

    it('should run one thing', () => {
      return expect(intermittent.run({
        interval: 1000,
        thing: () => {
          return new Promise((resolve) => {
            resolve({
              hasNext: false,
            });
          });
        },
      }))
      .to.eventually.be.equal(true);
    });

    it('should run multiple things', () => {
      let numLeft = 5;
      return expect(intermittent.run({
        interval: 10,
        thing: () => {
          return new Promise((resolve) => {
            --numLeft;
            resolve({
              hasNext: (numLeft !== 0),
            });
          });
        },
      }))
      .to.eventually.be.equal(true);
    });

    it('should run multiple things with an interval variance', () => {
      let numLeft = 5;
      return expect(intermittent.run({
        interval: 10,
        intervalVariance: 1,
        thing: () => {
          return new Promise((resolve) => {
            --numLeft;
            resolve({
              hasNext: (numLeft !== 0),
            });
          });
        },
      }))
      .to.eventually.be.equal(true);
    });

  });

});
