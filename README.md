# `intermittent`

Runs a thing intermittently

## Installation

```bash
npm install intermittent
```

## Usage

```javascript
const intermittent = require('intermittent');
intermittent.run({
  interval: 5000,
  intervalVariance: 1000,
  thing: myThing,
});
```

- `interval`
  - compulsory, number
  - duration between running a thing and the next thing in milliseconds
- `intervalVariance`
  - optional, number
  - plus/minus interval duration in milliseconds
  - for example, if the `interval` is `5000`,
    and the `intervalVariance` is `1000`,
    the duration between running a thing and the next thing
    will be between 4 seconds and 6 seconds
- `thing`
  - compulsory, function
  - the thing that needs to be done intermittently
  - the function can either *return a value* synchronously,
    or *return a promise* that resolves to a value asynchronously

For example, if your thing needs to be run three times,
you can do this.

```
let times = 3;
function myThing() {
  return new Promise((resolve) => {
    --times;
    resolve({
      hasNext: (times !== 0),
    });
  });
}
```

## Development

If you would like to contribute,
fork the git repo,
and create a branch off the *develop* branch,
and submit your pull request when you are done.

This repo uses the *git flow* branching strategy.

To run tests:

```bash
npm run test
```

## Author

[Brendan Graetz](http://bguiz.com)

## Licence

GPL-3.0
