# AVA-TS

[![Build Status](https://travis-ci.org/andywer/ava-ts.svg?branch=master)](https://travis-ci.org/andywer/ava-ts)
[![NPM Version](https://img.shields.io/npm/v/ava-ts.svg)](https://www.npmjs.com/package/ava-ts)

Bringing zero-config TypeScript support to the [**AVA**](https://github.com/avajs/ava) test runner. Configures AVA to use [ts-node](https://github.com/TypeStrong/ts-node) and matches `.ts` test files by default.

🚀 Zero-configuration setup<br/>
⏩ Parallel test execution<br/>
🖼 Snapshot testing<br/>
📈 All your favorite reporters

Works with AVA v1.0+. Still on AVA v0.25? Check out [ava-ts v0.25](https://www.npmjs.com/package/ava-ts/v/0.25.2).


## Installation

```sh
npm install --save-dev ava-ts@next ava ts-node

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

Default patterns when no arguments:
  test.ts test.tsx test-*.ts test-*.tsx test/**/*.ts test/**/*.tsx **/__tests__/**/*.ts **/__tests__/**/*.tsx **/*.test.ts **/*.test.tsx
```

## Documentation

See [AVA's official docs](https://github.com/avajs/ava) for detailed information.

`test.before()` registers a hook to be run before the first test in your test file. Similarly `test.after()` registers a hook to be run after the last test. Use `test.after.always()` to register a hook that will **always** run once your tests and other hooks complete. `.always()` hooks run regardless of whether there were earlier failures or if all tests were skipped, so they are ideal for cleanup tasks. There are two exceptions to this however. If you use `--fail-fast` AVA will stop testing as soon as a failure occurs, and it won't run any hooks including the `.always()` hooks. Uncaught exceptions will crash your tests, possibly preventing `.always()` hooks from running.
If a test is skipped with the `.skip` modifier, the respective `.beforeEach()` and `.afterEach()` hooks are not run. Likewise, if all tests in a test file are skipped `.before()` and `.after()` hooks for the file are not run. Hooks modified with `.always()` will always run, even if all tests are skipped.


## Configuration

The following AVA configuration is transparently set to consume TypeScript files:

```json
{
  "compileEnhancements": false,
  "extensions": [
    "ts", "tsx"
  ],
  "require": [
    "ts-node/register"
  ]
}
```


## Frequently Asked Questions

<details>
<summary>How to use AVA-TS when the <i>module</i> compiler option is set to ES6 modules?</summary>

Especially when working with bundlers like webpack you will encounter this issue. Fortunately, there is a simple fix to make TypeScript emit node-style modules when running AVA-TS:

```sh
TS_NODE_COMPILER_OPTIONS='{"module":"commonjs"}' ava-ts
```

If you feel this use case needs to be improved, complain in [#5](https://github.com/andywer/ava-ts/issues/5) 😉
</details>


## License

MIT. The fork as well as the original. AVA is a project of always awesome [Sindre Sorhus](https://github.com/sindresorhus).
