# AVA-TS

[![Build Status](https://travis-ci.org/andywer/ava-ts.svg?branch=master)](https://travis-ci.org/andywer/ava-ts)
[![NPM Version](https://img.shields.io/npm/v/ava-ts.svg)](https://www.npmjs.com/package/ava-ts)

Native TypeScript support for sindresorhus' awesome [**AVA**](https://github.com/avajs/ava) test runner out of the box, without a prior build step.

🚀 Zero-configuration setup<br/>
⏩ Parallel test execution<br/>
🖼 Snapshot testing<br/>
📈 All your favorite reporters

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

```
$ ava-ts --help

  Fork of the AVA test runner with native typescript support 🚀

  Usage
    ava-ts [<file|directory|glob> ...]

  Options
    --init                  Add AVA to your project
    --fail-fast             Stop after first test failure
    --serial, -s            Run tests serially
    --tap, -t               Generate TAP output
    --verbose, -v           Enable verbose output
    --color                 Force color output
    --no-color              Disable color output
    --match, -m             Only run tests with matching title (Can be repeated)
    --watch, -w             Re-run tests when tests and source files change
    --timeout, -T           Set global timeout
    --concurrency, -c       Max number of test files running at the same time (Default: CPU cores)
    --update-snapshots, -u  Update snapshots

  Examples
    ava-ts
    ava-ts test.ts test2.ts
    ava-ts test-*.ts
    ava-ts test
    ava-ts --init
    ava-ts --init foo.ts

  Default patterns when no arguments:
  test.ts test-*.ts test/**/*.ts **/__tests__/**/*.ts **/*.test.ts
```

## Documentation

See [AVA's official docs](https://github.com/avajs/ava) for detailed information.


## Limitations

There are a few limitations compared to the original `ava` CLI, however.

* No babel support
* No power assert


## License

MIT. The fork as well as the original. AVA is a project of always awesome [Sindre Sorhus](https://github.com/sindresorhus).
