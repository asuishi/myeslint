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

    let output = "",
        rules = config.rules || {};
    const messages = myeslint.messages
    messages.forEach(function(message) {

        output += message.filename + ": line " + message.node.loc.start.line +  ", col " +
                message.node.loc.start.column + ", " + getMessageType(message, config) +
                " - " + message.message + "\n";
    });

    return output;
};
