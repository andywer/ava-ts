# AVA-TS

[![Build Status](https://travis-ci.org/andywer/ava-ts.svg?branch=master)](https://travis-ci.org/andywer/ava-ts)
[![NPM Version](https://img.shields.io/npm/v/ava-ts.svg)](https://www.npmjs.com/package/ava-ts)

Native TypeScript support for sindresorhus' awesome [**AVA**](https://github.com/avajs/ava) test runner out of the box, without a prior build step.

This is a fork of the official AVA repository with a couple of [minimally invasive changes](https://github.com/andywer/ava-ts/pull/1). Uses `ts-node/register` instead of Babel. Not the cleanest solution, but it works pretty well.


## Installation

```sh
npm install --save-dev ava-ts ava ts-node

# Using yarn:
yarn add --dev ava-ts ava ts-node
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


## Documentation

See [AVA's official docs](https://github.com/avajs/ava) for detailed information.


## Features

It comes with most of the great features you love:

* Zero-configuration setup
* Parallel test execution
* Snapshot testing
* All your favorite reporters


### Limitations

There are a few limitations, however.

* No babel support
* No power assert


## License

MIT. The fork as well as the original. AVA is a project of always awesome [Sindre Sorhus](https://github.com/sindresorhus).
