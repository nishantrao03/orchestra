/**
 * Returns the system prompt for the Context Agent.
 *
 * @returns {string}
 */
function contextAgentPrompt() {
    return `
Choose a random number from 1 to 1. Return only the number.
`;
}

module.exports = contextAgentPrompt;
