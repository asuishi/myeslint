/**
 * Tests for eqeqeq rule.
 */

//------------------------------------------------------------------------------
// Constants
//------------------------------------------------------------------------------

const RULE_ID = "eqeqeq"
const myeslint = require('../lib/myeslint')

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

test(`test ${RULE_ID} with error`, () => {
    const code = "a == b"
    const config = { rules: {} };
    config.rules[RULE_ID] = 1;

    myeslint.verify(code, config);
    const messages = myeslint.messages

    expect(messages.length).toBe(1)
    expect(messages[0].ruleId).toBe(RULE_ID)
    expect(messages[0].message).toBe("Expected '==='  instead  '=='.")
    expect(messages[0].node.type).toBe("BinaryExpression")
})

test(`test ${RULE_ID} without error`, () => {
    const code = "a === b"
    const config = { rules: {} };
    config.rules[RULE_ID] = 1;

    myeslint.verify(code, config);
    const messages = myeslint.messages

    expect(messages.length).toBe(0)
})
