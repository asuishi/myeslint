//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var fs = require('fs')
var path = require('path')

const rules = {}


//------------------------------------------------------------------------------
// Public Interface
//------------------------------------------------------------------------------
function loadRules (dir) {
    const files = fs.readdirSync(path.join(__dirname, dir))
    files.forEach( file => {
        if (path.extname(file) === '.js') {
            const ruleId = file.slice(0, -3)
            rules[ruleId] = require(path.join(__dirname, dir, file))
        }
    })
}

function getRule(ruleId) {
    return rules[ruleId]
}
loadRules('./rules')

module.exports = {
    getRule,
    loadRules
}
