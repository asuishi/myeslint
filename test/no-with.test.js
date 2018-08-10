/**
 * Tests for no-with rule.
 */

//------------------------------------------------------------------------------
// Constants
//------------------------------------------------------------------------------

const RULE_ID = "no-with"

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------
beforeEach(() => {
    myeslint.reset()
})
test('test "no-with" with error', () => {
    const code = "with(foo) { bar() }"
    const config = { rules: {} };
    config.rules[RULE_ID] = 1;

    myeslint.verify(code, config);
    const messages = myeslint.messages

    expect(messages.length).toBe(1)
    expect(messages[0].ruleId).toBe(RULE_ID)
    expect(messages[0].message).toBe("Unexpected use of 'with' statement.")
    expect(messages[0].node.type).toBe("WithStatement")
})

test('test "no-with" no error', () => {
    const code = "var a= 5"
    const config = { rules: {} };
    config.rules[RULE_ID] = 1;

    myeslint.verify(code, config);
    const messages = myeslint.messages

    expect(messages.length).toBe(0)
})
