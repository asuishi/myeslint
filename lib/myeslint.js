let esprima = require("esprima")
let estraverse = require('estraverse');
let Events = require("events")
let rules = require("./rules")
let RuleContext = require('./ruleContext')

class Myeslint extends Events {
    constructor () {
        super()
        this.messages = []
        this.currentText = null
        this.currentConfig = null
    }
    
    verify (text, config, filename) {
        const self = this
        this.currentText = text
        this.currentConfig = config
        
        this.removeAllListeners()
        Object.keys(config.rules).forEach(key => {
            const rule = rules.getRule(key)
            if (rule) {
                const ruleResolve = rule(new RuleContext(key, this, filename));
                 // 添加规则
                Object.keys(ruleResolve).forEach((nodeType) => {
                    self.on(nodeType, ruleResolve[nodeType]);
                });

            } else {
                throw new Error("Definition for rule '" + key + "' was not found.");
            }
        });

        var ast = esprima.parse(text, { loc: true, range: true })
        estraverse.traverse(ast, {
            enter(node) {
                self.emit(node.type, node);
            }
        });
    }
    report (ruleId, node, message,filename) {
        this.messages.push({
            ruleId: ruleId,
            node: node,
            message: message,
            filename: filename
        })
    }
    
}
module.exports = new Myeslint()