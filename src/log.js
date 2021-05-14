const chalk = require("chalk");

module.exports = function logError(message) {
    console.log(chalk.red(message));
    console.log(chalk.red(`=== STACK TRACE ===`));
    console.trace();
};

module.exports = function logInfo(message) {
    console.info(chalk.yellow(message));
};
