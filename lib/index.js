/**
 * 读取需要检测的文件 和 配置
 */
var fs = require("fs"),
    path = require("path"),
    myeslint = require('./myeslint')
    reporter = require('./reporters/index')


//------------------------------------------------------------------------------
// Constants
//------------------------------------------------------------------------------

const DEFAULT_CONFIG = "../config/config.json"
//------------------------------------------------------------------------------
// Helpers
//------------------------------------------------------------------------------
function getAllFiles(files, paths) {
    const filesList = []
    files.forEach(file => {
        const currentPath = path.resolve(paths, file)
        const stats = fs.statSync(currentPath)
        if (stats.isDirectory()) {   // 目录
            const dirFiles = fs.readdirSync(currentPath) 
            Array.prototype.push.apply(filesList, getAllFiles(dirFiles, currentPath))
        } else {
            filesList.push(currentPath)
        }
    })
    return filesList
}
function processFiles(files, config) {
    const filesList = getAllFiles(files, process.cwd())
    filesList.forEach( file => {
        processFile( path.resolve(file), config)
    })
    
}
function processFile(filename, config) {
    const text = fs.readFileSync(filename, 'utf8')
    myeslint.verify(text, config, filename)
}

function readConfig(options) {
    var configLocation = path.resolve(__dirname, DEFAULT_CONFIG);
    return require(configLocation);
}

//------------------------------------------------------------------------------
// Public Interface
//------------------------------------------------------------------------------

const cli = {
	execute (argv){
        const config = readConfig();
        if (argv.length) {
            processFiles(argv, config);
        } else {
            console.log("No files!");
		}

		console.log(reporter(myeslint, config))
    }
}

module.exports = cli