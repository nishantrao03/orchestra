/**
 * Returns the system prompt for the Member Agent.
 *
 * @returns {string}
 */
function memberAgentPrompt() {
    return `
Choose a random number from 1 to 1. Return only the number.
`;
}

module.exports = memberAgentPrompt;
