/**
 * 使用 !==  === 判断
 */

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function(context) {
    return {
        "BinaryExpression": function(node) {
            var operator = node.operator;

            if (operator === "==") {
                context.report(node, "Expected '==='  instead  '=='.");
            } else if (operator === "!=") {
                context.report(node, "Expected '!==' and instead saw '!='.");
            }
        }
    };
};
