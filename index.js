#!/usr/bin/env node

require = require('esm')(module); // to allow ES6 imports
const chalk = require('chalk');

try {
  require('./src/cli').cli(process.argv);
} catch (error) {
  console.log(chalk.redBright(`Error: ${error.message}`));
}
