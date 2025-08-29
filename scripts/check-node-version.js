#!/usr/bin/env node

const semver = require('semver');
const { engines } = require('../package.json');

const version = engines.node;
if (!semver.satisfies(process.version, version)) {
  console.error(`Required node version ${version} not satisfied with current version ${process.version}.`);
  console.error('Please run: nvm use 22');
  process.exit(1);
}

console.log(`✅ Node.js version ${process.version} is compatible with required version ${version}`);
