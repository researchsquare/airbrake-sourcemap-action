const chalk = require("chalk");

exports.logError = function (message) {
    console.log(chalk.red(message));
    console.log(chalk.red(`=== STACK TRACE ===`));
    console.trace();
};

exports.logInfo = function (message) {
    console.info(chalk.yellow(message));
};
