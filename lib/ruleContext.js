/**
 * 处理具体规则
 */
class RuleContext {
    constructor (ruleId , myeslint, filename) {
        this.ruleId = ruleId
        this.myeslint = myeslint
        this.filename = filename
    }

    on (...args) {
        return this.myeslint.on(...args)
    }

    report (node , message) {
        return this.myeslint.report(this.ruleId, node, message, this.filename)
    }
 
}
module.exports = RuleContext