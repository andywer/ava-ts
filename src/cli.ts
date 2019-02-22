import execa from "execa"
import * as fs from "fs"
import glob from "glob"
import meow from "meow"
import * as path from "path"
import pkgConf from "pkg-conf"
import tmp from "tmp"

const defaultFilePatterns = [
  "test.ts",
  "test-*.ts",
  "test/**/*.ts",
  "**/__tests__/**/*.ts",
  "**/*.test.ts"
]

const cli = meow(`
  Usage
    ava-ts [<file|directory|glob> ...]

  Options
    --watch, -w             Re-run tests when tests and source files change
    --match, -m             Only run tests with matching title (Can be repeated)
    --update-snapshots, -u  Update snapshots
    --fail-fast             Stop after first test failure
    --timeout, -T           Set global timeout
    --serial, -s            Run tests serially
    --concurrency, -c       Max number of test files running at the same time (Default: CPU cores)
    --verbose, -v           Enable verbose output
    --tap, -t               Generate TAP output
    --color                 Force color output
    --no-color              Disable color output
    --reset-cache           Reset AVA's compilation cache and exit

  Examples
    ava-ts
    ava-ts test.ts test2.ts
    ava-ts test-*.ts
    ava-ts test

  Default patterns when no arguments:
    ${defaultFilePatterns.join(" ")}
`)

function fileExists(filePath: string) {
  try {
    const stats = fs.statSync(filePath)
    return stats.isFile()
  } catch (error) {
    return false
  }
}

function globAll(patterns: string[]) {
  return patterns
    .map(pattern => glob.sync(pattern))
    .reduce<string[]>((flattened, matches) => [...flattened, ...matches], [])
}

async function run() {
  const packageConf = pkgConf.sync("ava")
	const packageJsonPath = pkgConf.filepath(packageConf)
  const projectDir = packageJsonPath === null ? process.cwd() : path.dirname(packageJsonPath)
  const projectAvaConfPath = path.join(projectDir, "ava.config.js")
  const tsConfigPath = path.join(projectDir, "tsconfig.json")

  const avaConfig = `
    const avaConfig = ${fileExists(projectAvaConfPath) ? `require(${JSON.stringify(path.resolve(projectAvaConfPath))})` : "null"};
    const packageConfig = ${JSON.stringify(packageConf)};

    const config = Object.assign({
      "compileEnhancements": false,
      "extensions": [
        "ts", "tsx"
      ],
      "require": [
        "ts-node/register"
      ]
    }, avaConfig, packageConfig);

    export default config;

    process.chdir(${JSON.stringify(path.resolve(projectDir))});
    ${
      fileExists(tsConfigPath)
        ? `process.env.TS_NODE_PROJECT = ${JSON.stringify(path.resolve(tsConfigPath))};`
        : ""
    }
  `

  const tempDir = tmp.dirSync({ unsafeCleanup: true }).name
  fs.writeFileSync(path.join(tempDir, "ava.config.js"), avaConfig, "utf8")

  const args = cli.input.length === 0
    ? process.argv.slice(2).concat(globAll(defaultFilePatterns))
    : process.argv.slice(2)

  try {
    await execa("ava", args, {
      cwd: tempDir,
      stdin: process.stdin,
      stdout: process.stdout,
      stderr: process.stderr
    })
  } catch (error) {
    if (error.errno === "ENOENT" && error.path === "ava") {
      console.error("Error: AVA could not be found.")
      process.exit(1)
    } else if (typeof error.errno === "string") {
      throw error
    } else {
      // Do nothing; it's just a usual test failure
    }
  }
}

run().catch(console.error)
