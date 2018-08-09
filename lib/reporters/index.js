/**
 * 打印的具体格式
 */

//------------------------------------------------------------------------------
// Helper Functions
//------------------------------------------------------------------------------

function getMessageType(message, config) {

    if (config.rules[message.ruleId] < 2) {
        return "Warning";
    } else {
        return "Error";
    }

}


//------------------------------------------------------------------------------
// Public Interface
//------------------------------------------------------------------------------
module.exports = function(myeslint, config) {

    let output = ""
    let total = 0
    const rules = config.rules || {}
    const messages = myeslint.messages
    total += messages.length
    messages.forEach(function(message) {
       
        output += message.filename + ": line " + message.node.loc.start.line +  ", col " +
                message.node.loc.start.column + ", " + getMessageType(message, config) +
                " - " + message.message + "\n";
    });

    output += "\n" + total + " problem" + (total !== 1 ? "s" : "");

    return output;
};
