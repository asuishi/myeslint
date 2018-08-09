//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function(context) {
    context.on("WithStatement", function(node) {
        context.report(node, "Unexpected use of 'with' statement.")
    });
};
