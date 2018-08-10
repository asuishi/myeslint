/**
 * Tests for no-empty rule.
 */

//------------------------------------------------------------------------------
// Constants
//------------------------------------------------------------------------------

const RULE_ID = "no-empty"
const myeslint = require('../lib/myeslint')

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

test(`test ${RULE_ID} with error`, () => {
    const code = "function f() {}"
    const config = { rules: {} };
    config.rules[RULE_ID] = 1;

    myeslint.verify(code, config);
    const messages = myeslint.messages

    expect(messages.length).toBe(1)
    expect(messages[0].ruleId).toBe(RULE_ID)
    expect(messages[0].message).toBe("Empty block statement.")
    expect(messages[0].node.type).toBe("BlockStatement")
})

test(`test ${RULE_ID} without error`, () => {
    const code = "function f() {var a = 5}"
    const config = { rules: {} };
    config.rules[RULE_ID] = 1;

    myeslint.verify(code, config);
    const messages = myeslint.messages

    expect(messages.length).toBe(0)
})
