/**
 * 打印的具体格式
 */

//------------------------------------------------------------------------------
// Helper Functions
//------------------------------------------------------------------------------

function getMessageType(message, rules) {

    if (rules[message.ruleId] < 2) {
        return "Warning";
    } else {
        return "Error";
    }

}


//------------------------------------------------------------------------------
// Public Interface
//------------------------------------------------------------------------------
module.exports = function(results, config) {

    let output = ""
    let total = 0
    const rules = config.rules || {}
    results.forEach(function(result) {

        const messages = result.messages;
        total += messages.length;

        messages.forEach(function(message) {
            output += result.filename + ": ";
            output += "line " + (message.node.loc.start.line || 0) +  ", col " +
                (message.node.loc.start.column || 0) + ", " + getMessageType(message, rules);
            output += " - " + message.message + "\n";
        });

    });

    output += "\n" + total + " problem" + (total !== 1 ? "s" : "");

    return output;
};
