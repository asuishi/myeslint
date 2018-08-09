/**
 * 给规则添加统一的方法
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