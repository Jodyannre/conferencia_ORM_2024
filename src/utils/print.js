const chalk = require('chalk');
const { print,http } = require('../config/constants.js');

function printMsg(text, type) {
    const color = print.COLOR[type];
    console.log(chalk[color](`[CONSOLE][${type}]${http.arrow[type]}${text}`));
}


module.exports = printMsg;
