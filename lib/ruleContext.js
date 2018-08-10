/**
 * 给规则添加统一的方法
 */
class RuleContext {
    constructor (ruleId , myeslint, filename) {
        this.ruleId = ruleId
        this.myeslint = myeslint
        this.filename = filename
    }

    report (node , message) {
        return this.myeslint.report(this.ruleId, node, message, this.filename)
    }
 
}
module.exports = RuleContext