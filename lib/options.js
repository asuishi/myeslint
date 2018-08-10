const program = require('commander');
const version = require("../package.json").version

program
    .version(version) //定义版本号
    .usage("[options] file.js [file.js] [dir]")
    .option('-c, --config <config>', 'Load configuration data from this file')
module.exports = {
    program
}
