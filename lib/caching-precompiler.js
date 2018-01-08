'use strict';
const fs = require('fs');
const cachingTransform = require('caching-transform');
const packageHash = require('package-hash');
const stripBomBuf = require('strip-bom-buf');
const autoBind = require('auto-bind');
const md5Hex = require('md5-hex');

class CachingPrecompiler {
	constructor(options) {
		autoBind(this);

		this.getBabelOptions = options.getBabelOptions;
		this.babelCacheKeys = options.babelCacheKeys;
		this.cacheDirPath = options.path;
		this.fileHashes = {};
		this.transform = this._createTransform();
	}

	precompileFile(filePath) {
		if (!this.fileHashes[filePath]) {
			const source = stripBomBuf(fs.readFileSync(filePath));
			this.transform(source, filePath);
		}

		return this.fileHashes[filePath];
	}

	// Conditionally called by caching-transform when precompiling is required
	_init() {
		return this._transform;
	}

	_transform(code) {
		return code.toString();
	}

	_createTransform() {
		const salt = packageHash.sync([
			require.resolve('../package.json')
		], this.babelCacheKeys);

		return cachingTransform({
			factory: this._init,
			cacheDir: this.cacheDirPath,
			hash: this._generateHash,
			salt,
			ext: '.js'
		});
	}

	_generateHash(code, filePath, salt) {
		const hash = md5Hex([code, filePath, salt]);
		this.fileHashes[filePath] = hash;
		return hash;
	}
}

module.exports = CachingPrecompiler;
