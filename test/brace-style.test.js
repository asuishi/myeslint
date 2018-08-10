/**
 * Tests for brace-style rule.
 */

//------------------------------------------------------------------------------
// Constants
//------------------------------------------------------------------------------

const RULE_ID = "brace-style"
const myeslint = require('../lib/myeslint')

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------
beforeEach(() => {
    myeslint.reset()
})
test(`test "${RULE_ID}" function  with error`, () => {
    const code = "function f() \n {}"
    const config = { rules: {} };
    config.rules[RULE_ID] = 1;

    myeslint.verify(code, config);
    const messages = myeslint.messages

    expect(messages.length).toBe(1)
    expect(messages[0].ruleId).toBe(RULE_ID)
    expect(messages[0].message).toBe("Opening curly brace does not appear on the same line as the block identifier.")
    expect(messages[0].node.type).toBe("FunctionDeclaration")
})

test(`test "${RULE_ID}" function  without error`, () => {
    const code = "function f() {}"
    const config = { rules: {} };
    config.rules[RULE_ID] = 1;

    myeslint.verify(code, config);
    const messages = myeslint.messages

    expect(messages.length).toBe(0)
})

test(`test "${RULE_ID}" for  with error`, () => {
    const code = "for(var i=0;i<2;i++) \n {}"
    const config = { rules: {} };
    config.rules[RULE_ID] = 1;

    myeslint.verify(code, config);
    const messages = myeslint.messages

    expect(messages.length).toBe(1)
    expect(messages[0].ruleId).toBe(RULE_ID)
    expect(messages[0].message).toBe("Opening curly brace does not appear on the same line as the block identifier.")
    expect(messages[0].node.type).toBe("ForStatement")
})

test(`test "${RULE_ID}" for  without error`, () => {
    const code = "for(var i=0;i<2;i++) {}"
    const config = { rules: {} };
    config.rules[RULE_ID] = 1;

    myeslint.verify(code, config);
    const messages = myeslint.messages

    expect(messages.length).toBe(0)
})

