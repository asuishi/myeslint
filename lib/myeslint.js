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
    reset () {
        this.messages = []
        this.currentText = null
        this.currentConfig = null
        this.removeAllListeners()
    }
    verify (text, config, filename)
    {
        const self = this
        this.reset()
        this.currentText = text
        this.currentConfig = config
        
        Object.keys(config.rules).filter((key) => {
            return config.rules[key] > 0
        }).forEach(key => {
            const rule = rules.getRule(key)
            if (rule) {
                const ruleResolve = rule(new RuleContext(key, this));
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
    report (ruleId, node, message) {
        this.messages.push({
            ruleId: ruleId,
            node: node,
            message: message,
        })
    }
    
}
module.exports = new Myeslint()