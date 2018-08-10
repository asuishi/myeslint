/**
 * 读取需要检测的文件 和 配置
 */
let fs = require("fs")
let path = require("path")
let myeslint = require('./myeslint')
let reporter = require('./reporters/index')
let options = require('./options').program


//------------------------------------------------------------------------------
// Constants
//------------------------------------------------------------------------------
const ERROR_RESULT = []
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
	myeslint.verify(text, config)
	ERROR_RESULT.push({
		filename: filename,
		messages: myeslint.messages
	})
}

function readConfig(config) 
{
    let configLocation
    if (config) {
        configLocation = path.resolve(process.cwd(), config)
    } else {
        configLocation = path.resolve(__dirname, DEFAULT_CONFIG)
    }
    return require(configLocation);
}

//------------------------------------------------------------------------------
// Public Interface
//------------------------------------------------------------------------------

const cli = {
	execute (argv){
        options.parse(argv) // 处理参数

        if (options.rawArgs.length === 2) { // 没有参数
            console.log(options.help())
        } else {
            let config
            if (options.config) {
                config = readConfig(options.config);
            } else {
                config = readConfig();
            }
            if (options.args.length) {
                processFiles(options.args, config);
                console.log(reporter(ERROR_RESULT, config))
            } else {
                console.log("No files!");
            }
        }
        
    }
}

module.exports = cli