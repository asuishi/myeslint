/**
 * 给规则添加统一的方法
 */
class RuleContext {
    constructor (ruleId , myeslint) {
        this.ruleId = ruleId
        this.myeslint = myeslint
    }

    report (node , message) {
        return this.myeslint.report(this.ruleId, node, message)
    }
 
}
module.exports = RuleContext