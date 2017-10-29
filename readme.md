# AVA-TS

[![Build Status](https://travis-ci.org/andywer/ava-ts.svg?branch=master)](https://travis-ci.org/andywer/ava-ts)
[![NPM Version](https://img.shields.io/npm/v/ava-ts.svg)](https://www.npmjs.com/package/ava-ts)

Fork of sindresorhus' awesome [AVA](https://github.com/avajs/ava) test runner to support TypeScript out of the box, without a prior build step.

This is a fork of the official AVA repository with a couple of minimally invasive changes. Uses `ts-node/register` instead of Babel. Not the nicest solution, but it works pretty well.


## Installation

The package has not been published to npm yet, so install it like that for now:

```sh
npm install --save-dev ava ts-node ava-ts@github:andywer/ava-ts

# Using yarn:
yarn add --dev ava ts-node ava-ts@github:andywer/ava-ts
```


## Usage

Write your tests in TypeScript as you would usually do and import from `ava`, not from `ava-ts`, just as you would always do.

```typescript
// test.ts

import test from 'ava'

test('one plus two equals three', t => {
	t.is(1 + 2, 3)
})
```

Instead of running `ava`, just run the `ava-ts` CLI tool instead. That's it!

It will use all the same options and defaults you know from AVA, but searches for `*.ts` files instead of `*.js`.


## Features

It comes with most of the great features you love:

* Zero-configuration setup
* Parallel test execution
* Snapshot testing
* All your favorite reporters


### Limitations

There are a few limitations, however:

* No babel support
* No power assert


## License

MIT. The fork as well as the original.
