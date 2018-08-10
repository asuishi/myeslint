/**
  使用如下格式, { 不换行
  function  f() {
  }
 */

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function(context) {
    //--------------------------------------------------------------------------
    // Helpers
    //--------------------------------------------------------------------------

    function checkBlockStartsAtIdentifier(node) {
        var startLine = node.loc.start.line;

        // FunctionDeclaration
        if (node.body && startLine !== node.body.loc.start.line) {
            context.report(node, "Opening curly brace does not appear on the same line as the block identifier.");
        }

        // IfStatement, DoWhileStatement,WhileStatement, WithStatement, ForStatement, and ForInStatement.
        if (node.consequent && startLine !== node.consequent.loc.start.line) {
            context.report(node, "Opening curly brace does not appear on the same line as the block identifier.");
        }
    }

    //--------------------------------------------------------------------------
    // Public API
    //--------------------------------------------------------------------------

    return {
        "FunctionDeclaration": checkBlockStartsAtIdentifier,
        "IfStatement": checkBlockStartsAtIdentifier,
        "DoWhileStatement": checkBlockStartsAtIdentifier,
        "WhileStatement": checkBlockStartsAtIdentifier,
        "WithStatement": checkBlockStartsAtIdentifier,
        "ForStatement": checkBlockStartsAtIdentifier,
        "ForInStatement": checkBlockStartsAtIdentifier
    };

};
